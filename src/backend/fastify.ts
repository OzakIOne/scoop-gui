import fastify from 'fastify';
import { join } from 'path';
import fastifyStatic from 'fastify-static';
import fastifyCors from 'fastify-cors';
import {
  getNotInstalledBuckets,
  getInstalledApps,
  getInstalledBuckets,
  getAllAppsName,
  getNotInstalledApps,
} from '../frontend/services/scrapping/scrap';

const server = fastify({
  logger: true,
});

const PORT = process.env.PORT || 3005;

server.register(fastifyStatic, {
  root: join(__dirname, '../../dist'),
  decorateReply: false,
});

server.register(fastifyCors, {});

server.get('/api/getNotInstalledBuckets', async (request, reply) => {
  const buckets = await getNotInstalledBuckets();
  reply.send(buckets);
});
server.get('/api/getInstalledBuckets', async (request, reply) => {
  const buckets = await getInstalledBuckets();
  reply.send(buckets);
});
server.get('/api/getInstalledApps', async (request, reply) => {
  const apps = await getInstalledApps();
  reply.send(apps);
});
server.get('/api/getAllAppsName', async (request, reply) => {
  const apps = await getAllAppsName();
  reply.send(apps);
});
server.get('/api/getAllAppsNumber', async (request, reply) => {
  const apps = await getAllAppsName();
  reply.send(apps.flat().length);
});
server.get('/api/getNotInstalledApps', async (request, reply) => {
  const apps = await getNotInstalledApps();
  reply.send(apps);
});

const start = () => {
  server.listen(PORT, (err, addr) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    server.log.info(`server listening on ${addr}`);
  });
};

start();
