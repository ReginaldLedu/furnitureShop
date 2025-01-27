import { Application, send } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();

// Папка, из которой будут отдаваться статические файлы
const STATIC_FILES_DIR = './build/static';

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
