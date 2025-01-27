// Deno.serve((_request: Request) => {
//   return new Response('Hello, world!');
// });
import { serve } from "https://deno.land/std/http/server.ts";
import { join, resolve } from "https://deno.land/std/path/mod.ts";

const PORT = 8000;
const buildPath = resolve("build");

const handler = async (req: Request) => {
  const url = new URL(req.url);
  const filePath = join(buildPath, url.pathname === "/" ? "index.html" : url.pathname);

  try {
    const file = await Deno.open(filePath);
    const contentType = filePath.endsWith(".html") ? "text/html" : "application/octet-stream";
    
    return new Response(file.readable, {
      headers: { "Content-Type": contentType },
    });
  } catch (error) {
    return new Response("404 Not Found", { status: 404 });
  }
};

console.log(`Server running on http://localhost:${PORT}`);
await serve(handler, { port: PORT });