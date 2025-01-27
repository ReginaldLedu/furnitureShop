import { serve } from 'https://deno.land/std/http/server.ts';
import { extname } from 'https://deno.land/std/path/mod.ts';

const textHandler = (request: Request): Response => {
  return new Response('Hello from Deno Deploy!', {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
};
const serveFile = async (path: string) => {
  const file = await Deno.open(path);
  return new Response(file.readable, {
    headers: { 'content-type': getContentType(path) },
  });
};

const getContentType = (path: string) => {
  const ext = extname(path);
  switch (ext) {
    case '.html':
      return 'text/html';
    case '.js':
      return 'application/javascript';
    case '.css':
      return 'text/css';
    case '.json':
      return 'application/json';
    default:
      return 'application/octet-stream';
  }
};

const handler = (request: Request): Response => {
  // Получаем URL и параметры запроса
  const url = new URL(request.url);
  const name = url.searchParams.get('furniture');
  const age = url.searchParams.get('age');

  // Проверяем метод запроса
  if (request.method === 'GET') {
    // Определяем ответ в зависимости от параметров
    if (name && age) {
      return new Response(
        JSON.stringify({
          message: 'Hello, ${name}! You are ${age} years old.',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } else if (name) {
      return new Response(
        JSON.stringify({
          message: 'Hello, ${name}!',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      return new Response(JSON.stringify({ message: 'Hello, stranger!' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } else {
    // Если метод не GET, возвращаем 405 Method Not Allowed
    return new Response('Method Not Allowed', { status: 405 });
  }
};

console.log('Listening on http://localhost:8000');
await serve(handler);
