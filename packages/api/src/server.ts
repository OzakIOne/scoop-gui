import type { IncomingMessage, Server } from 'node:http';

import cors from '@fastify/cors';
import { execa } from 'execa';
import type { FastifyReply, FastifyRequest } from 'fastify';
import fastify from 'fastify';

import scrap from './scrap.js';

const server = fastify();
await server.register(cors, {
  origin: 'http://localhost:1420',
});
const BUCKETS_PATH = `${process.env['USERPROFILE']}\\scoop\\buckets`;

server.get('/bucket/list/installed', async (_, reply) => {
  const list = await scrap.getInstalledBuckets();
  await reply.code(200).send(list);
});
server.get('/bucket/list/notinstalled', async (_, reply) => {
  const list = await scrap.getNotInstalledBuckets();
  await reply.code(200).send(list);
});
server.get(
  '/bucket/add',
  async (
    request: FastifyRequest<{ Querystring: { appName: string } }, Server, IncomingMessage>,
    reply: FastifyReply
  ) => {
    const { appName: bucketName } = request.query;
    const { stdout } = await execa('scoop', ['bucket', 'add', bucketName]);
    if (stdout.includes('was added successfully')) {
      await reply.code(200).send('Bucket added successfully');
    } else if (stdout.includes('Unknown bucket')) {
      await reply.code(404).send('Bucket not found');
    }
  }
);
server.get(
  '/bucket/remove',
  async (
    request: FastifyRequest<{ Querystring: { appName: string } }, Server, IncomingMessage>,
    reply: FastifyReply
  ) => {
    const { appName: bucketName } = request.query;
    const { stdout } = await execa('scoop', ['bucket', 'rm', bucketName]);
    await reply.code(200).send(stdout);
  }
);

server.get('/app/list', async (_, reply) => {
  const list = await scrap.getAllInstalledAppsNames();
  await reply.code(200).send(list);
});
server.get('/feur', async (_, reply) => {
  const list = await scrap.getInstalledAppNamesArray();
  await reply.code(200).send(list);
});
server.get('/app/list/installed', async (_, reply) => {
  const list = await scrap.getInstalledAppsNames();
  await reply.code(200).send(list);
});
server.get('/app/list/notinstalled', async (_, reply) => {
  const list = await scrap.getNotInstalledAppsNames();
  await reply.code(200).send(list);
});

server.get(
  '/scoop/install',
  async (
    request: FastifyRequest<{ Querystring: { appName: string } }, Server, IncomingMessage>,
    reply: FastifyReply
  ) => {
    const { appName } = request.query;
    const { stdout } = await execa('scoop', ['install', appName]);
    if (stdout.includes("Couldn't find manifest")) await reply.code(404).send(stdout);
    else if (stdout.includes('was installed successfully')) await reply.code(200).send(stdout);
  }
);
server.get(
  '/scoop/uninstall',
  async (
    request: FastifyRequest<{ Querystring: { appName: string } }, Server, IncomingMessage>,
    reply: FastifyReply
  ) => {
    const { appName } = request.query;
    const { stdout } = await execa('scoop', ['uninstall', appName]);
    if (stdout.includes("isn't installed")) await reply.code(404).send(stdout);
    else if (stdout.includes('was uninstalled')) await reply.code(200).send(stdout);
  }
);
server.get('/scoop/update/all', async (_, reply) => {
  const { stdout } = await execa('scoop', ['update', '*']);
  if (stdout.includes('ERROR The following instances')) await reply.code(500).send(stdout);
  await reply.code(200).send(stdout);
});
server.get(
  '/scoop/update',
  async (
    request: FastifyRequest<{ Querystring: { appName: string } }, Server, IncomingMessage>,
    reply: FastifyReply
  ) => {
    const { appName } = request.query;
    const { stdout } = await execa('scoop', ['update', appName]);
    if (stdout.includes("isn't installed")) await reply.code(404).send(stdout);
    else if (stdout.includes('Latest versions for all apps are installed'))
      await reply.code(200).send(stdout);
    await reply.code(200).send(stdout);
  }
);
server.get(
  '/scoop/cleanup',
  async (
    request: FastifyRequest<{ Querystring: { appName: string } }, Server, IncomingMessage>,
    reply: FastifyReply
  ) => {
    const { appName } = request.query;
    const { stdout } = await execa('scoop', ['cleanup', appName]);
    if (stdout.includes('already clean')) await reply.code(404).send(stdout);
    else if (stdout.includes('ERROR')) await reply.code(500).send(stdout);
    await reply.code(200).send(stdout);
  }
);
server.get('/scoop/cleanup/all', async (_, reply) => {
  const { stdout } = await execa('scoop', ['cleanup', '*']);
  await reply.code(200).send(stdout);
});
server.get(
  '/scoop/info',
  async (
    request: FastifyRequest<
      { Querystring: { appName: string; id: string } },
      Server,
      IncomingMessage
    >,
    reply: FastifyReply
  ) => {
    const { appName, id } = request.query;
    const { stdout } = await execa('es', ['-p', BUCKETS_PATH, '-s', `*${appName}*.json`]);
    const appArray = stdout.split('\r\n');
    const maximumId = appArray.length - 1;
    if (Number.parseInt(id) > maximumId) await reply.code(400).send(`Maximum id is ${maximumId}`);
    const jsonContent = await scrap.parseJsonFromFile(appArray[id]);
    await reply.code(200).send(jsonContent);
  }
);

server.get('/api/scrap/appsArray', async (_, reply) => {
  const text = await scrap.appsArray(scrap.bucketNames.extras);
  await reply.send(text);
});

const start = async (): Promise<void> => {
  try {
    await server.listen({ port: 8080 });
  } catch (error: unknown) {
    server.log.error(error);
    throw error;
  }
};

await start();
