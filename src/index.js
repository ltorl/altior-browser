import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { hostname } from "node:os";
import fs from "node:fs";
import path from "node:path";
import { server as wisp, logging } from "@mercuryworkshop/wisp-js/server";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";

import { scramjetPath } from "@mercuryworkshop/scramjet/path";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";

// Prefixes the front-end proxy engines route through. Keep in sync with
// SJ_PREFIX / UV_PREFIX in public/index.html.
const PROXY_PREFIXES = [
    "/altior-navigator/scramjet/p/",
    "/altior-navigator/uv/service/",
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.resolve(process.env.ALTIOR_PUBLIC_DIR || path.join(__dirname, "../public"));

if (!fs.existsSync(path.join(publicPath, "index.html"))) {
    console.error(`[Fatal] index.html not found at ${publicPath}`);
    process.exit(1);
}

console.log(`[Render Path Solver] Detected index.html root directory at: ${publicPath}`);

logging.set_level(logging.NONE);
Object.assign(wisp.options, {
    allow_udp_streams: false,
    hostname_blacklist: [/example\.com/],
    dns_servers: ["1.1.1.3", "1.0.0.3"],
});

const fastify = Fastify({
    serverFactory: (handler) => {
        return createServer()
            .on("request", (req, res) => {
                res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
                res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
                res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
                handler(req, res);
            })
            .on("upgrade", (req, socket, head) => {
                if (req.url === "/wisp/") {
                    wisp.routeRequest(req, socket, head);
                } else {
                    socket.end();
                }
            });
    },
});

fastify.addHook("onRequest", (req, reply, done) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    reply.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        return reply.status(200).send();
    }
    done();
});

fastify.register(fastifyStatic, {
    root: publicPath,
    decorateReply: true,
});

fastify.register(fastifyStatic, {
    root: scramjetPath,
    prefix: "/scram/",
    decorateReply: false,
});

fastify.register(fastifyStatic, {
    root: libcurlPath,
    prefix: "/libcurl/",
    decorateReply: false,
});

fastify.register(fastifyStatic, {
    root: baremuxPath,
    prefix: "/baremux/",
    decorateReply: false,
});

fastify.register(fastifyStatic, {
    root: uvPath,
    prefix: "/uv/",
    decorateReply: false,
});

fastify.get("/", (req, reply) => {
    try {
        const htmlPath = path.join(publicPath, "index.html");
        if (fs.existsSync(htmlPath)) {
            const html = fs.readFileSync(htmlPath, "utf8");
            return reply.type("text/html").send(html);
        }
        return reply.code(404).type("text/html").send("<h1>404 Not Found</h1><p>index.html could not be found.</p>");
    } catch (err) {
        return reply.code(500).type("text/plain").send("Error loading index.html: " + err.message);
    }
});

fastify.get("/get-dynamic-sw.js", (req, reply) => {
    const swCode = req.query.code;
    if (!swCode) {
        return reply.code(400).type("text/plain").send("Missing code parameter");
    }
    return reply.type("application/javascript").send(swCode);
});

fastify.setNotFoundHandler((req, reply) => {
    if (PROXY_PREFIXES.some((p) => req.url.startsWith(p))) {
        return reply
            .code(503)
            .header("Retry-After", "1")
            .type("text/html")
            .send(
                "<!DOCTYPE html><html><head><meta charset=\"utf-8\">" +
                "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" +
                "<title>Loading…</title>" +
                "<style>html,body{height:100%;margin:0}body{display:flex;align-items:center;justify-content:center;" +
                "font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:#282828;color:#9aa0a6}" +
                "</style></head><body><p>Preparing proxy…</p>" +
                "<script>setTimeout(function(){location.reload()},1000)</script>" +
                "</body></html>"
            );
    }
    return reply
        .code(404)
        .type("text/html")
        .send("<h1>404 Not Found</h1><p>The requested resource could not be found on this server.</p>");
});

fastify.server.on("listening", () => {
    const address = fastify.server.address();

    console.log("Listening on:");
    console.log(`\thttp://localhost:${address.port}`);
    console.log(`\thttp://${hostname()}:${address.port}`);
    console.log(
        `\thttp://${
            address.family === "IPv6" ? `[${address.address}]` : address.address
        }:${address.port}`
    );
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
    console.log("SIGTERM signal received: closing HTTP server");
    fastify.close();
    process.exit(0);
}

let port = parseInt(process.env.PORT || "");
if (isNaN(port)) port = 8080;

fastify.listen({
    port: port,
    host: "0.0.0.0",
});
