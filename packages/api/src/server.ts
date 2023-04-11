import { execa } from 'execa';
import type { FastifyRequest } from 'fastify';
import fastify from 'fastify';
import scrap from './scrap';

const server = fastify();

interface AppNameRequest extends FastifyRequest {
  query: {
    appName: string;
  };
}

// ! /bucket/list
// ! /bucket/list/installed
// ! /bucket/list/notinstalled
// ! /bucket/add/:bucketName
// ! /bucket/remove/:bucketName

// ! /app/list
// ! /app/list/installable
// ! /app/list/installed
// ! /app/add/:appName
// ! /app/remove/:appName
// ! /app/info/:appName

// ? with execa
// * /scoop/update/all
// ! /scoop/update/app/:appName
// * /scoop/update/clean/all
// ! /scoop/update/clean/app/:appName
// ? without execa
// ! /scoop/info/:appName

server.get('/scoop/install', async (request: AppNameRequest, reply) => {
  const { appName } = request.query;
  const { stdout } = await execa('scoop', ['install', appName]);
  await reply.send(stdout);
});

server.get('/scoop/update/all', async (_, reply) => {
  const { stdout } = await execa('scoop', ['update', 'all']);
  await reply.send(stdout);
});

server.get('/scoop/clean/all', async (_, reply) => {
  const { stdout } = await execa('scoop', ['clean', 'all']);
  await reply.send(stdout);
});

server.get('/scoop/info/', async (request: AppNameRequest, reply) => {
  const { appName } = request.query;

  await reply.send(appName);
});

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
