import { Application, send } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();

// Папка, из которой будут отдаваться статические файлы
const STATIC_FILES_DIR = './public';

// Middleware для обслуживания статических файлов
app.use(async (context, next) => {
  const { pathname } = context.request.url;

  // Проверяем, если запрашивается файл
  if (pathname.startsWith('/static/')) {
    // Удаляем префикс "/static/" из пути
    const filePath = pathname.replace('/static/', '');

    try {
      // Отдаем файл
      await send(context, filePath, {
        root: STATIC_FILES_DIR,
        index: false,
      });
    } catch (error) {
      console.error(`Файл не найден: ${filePath}, error`);
      await next();
    }
  } else {
    await next();
  }
});

// Middleware для обработки всех остальных запросов
app.use(async context => {
  // Отдаем индексный HTML файл для всех остальных маршрутов
  await send(context, 'index.html', {
    root: STATIC_FILES_DIR,
  });
});

// Запуск сервера
const PORT = 3000;
console.log(`Сервер запущен на http://localhost:${PORT}`);
await app.listen({ port: PORT });

Deno.serve((_request: Request) => {
  return new Response('Hello, world!');
});

// import { serve } from "https://deno.land/std/http/server.ts";
// import { join, resolve } from "https://deno.land/std/path/mod.ts";

// const PORT = 8000;
// const buildPath = resolve("build");

// const handler = async (req: Request) => {
//   const url = new URL(req.url);
//   const filePath = join(buildPath, url.pathname === "/" ? "index.html" : url.pathname);

//   try {
//     const file = await Deno.open(filePath);
//     const contentType = filePath.endsWith(".html") ? "text/html" : "application/octet-stream";

//     return new Response(file.readable, {
//       headers: { "Content-Type": contentType },
//     });
//   } catch (error) {
//     return new Response("404 Not Found", { status: 404 });
//   }
// };

// console.log(`Server running on http://localhost:${PORT}`);
// await serve(handler, { port: PORT });
