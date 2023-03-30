import fastify from 'fastify';

const server = fastify();

server.get('/ping', async () => 'pong\n');

server.listen({ port: 8080 }, (error) => {
  if (error) {
    return error;
  }
  return null;
});
