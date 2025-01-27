import { serve } from "https://deno.land/std/http/server.ts";

const PORT = 8000;

const handler = (req: Request): Response => {
    const data = {
        message: "Hello, world!",
        timestamp: new Date(),
    };
    return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
    });
};

console.log(`Сервер запущен на http://localhost:${PORT}`);
await serve(handler, { port: PORT });