const fastify = require("fastify")();
const path = require("path");
const fastifyStatic = require("fastify-static");
const scrap = require("../frontend/services/scrapping/scrap");

// TODO: Copy /build/ webpack bundle to /public/

fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../frontend/public"),
});

// fastify.register(fastifyStatic, {
//   root: path.join(__dirname, '../frontend/public'),
//   prefix: '/public/', // optional: default '/'
//   decorateReply: false
// })

fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../frontend/public/public_material_ui"),
    prefix: "/material/", // optional: default '/'
    decorateReply: false,
});

fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../frontend/public/public_scss_ui"),
    prefix: "/scss/", // optional: default '/'
    decorateReply: false,
});

fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../frontend/vanilla"),
    prefix: "/vanilla/", // optional: default '/'
    decorateReply: false,
});

// Pour le lol - Choupachupss 05/24/2020
// fastify.get('/public/material', async (request, reply) => {
//   reply.sendFile('./index.html', path.join(__dirname,'../frontend/public/public_material_ui'))
// })

// fastify.get('/public/scss', async (request, reply) => {
//   reply.sendFile('./index.html', path.join(__dirname,'../frontend/public/public_scss_ui'))
// })

// fastify.get('/vanilla/vanilla', async (request, reply) => {
//   reply.sendFile('./index.html', path.join(__dirname,'../frontend/vanilla/'))
// })

fastify.get("/api/scrap/promise", (request, reply) => {
    scrap.GetNotInstalledBuckets().then((e) => {
        console.log(e);
        reply.send(e);
    });
});

fastify.get(
    "/api/scrap/GetNotInstalledBuckets/async",
    async (request, reply) => {
        const e = await scrap.GetNotInstalledBuckets();
        reply.send(e);
    }
);

fastify.get("/api/scrap/ParseFiles/async", async (request, reply) => {
    const e = await scrap.ParseFiles();
    reply.send(e);
});

fastify.get("/api/scrap/Test/async", async (request, reply) => {
    const e = await scrap.test(scrap.BucketNames.extras);
    reply.send(e);
});

const start = async () => {
    try {
        await fastify.listen(3005);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
