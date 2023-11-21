import http from "node:http";
import fs from "node:fs/promises"; // модуль кот. позволяет читать файлы с сервера

//const data = await fs.readFile('package.json', 'utf-8');
//console.log("data: ", data);
//const http = require("node:http");

const PORT = 8080;

http
   .createServer(async (req, res) => {
      if (req.method === "GET" && req.url === '/comedians') {
         try {
            const data = await fs.readFile('comedians.json', 'utf-8');
         res.writeHead(200, {
            "Content-Type": "text/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*", // разрешаем запросы всем сайтам
         });
         res.end(data);
         } catch (error) {
            res.writeHead(500, {
               "Content-Type": "text/plain; charset=utf-8",
         });
            res.end(`Ошибка сервера: ${error}`);
         }
      } else {
         res.writeHead(404, {
            "Content-Type": "text/plain; charset=utf-8",
      });
         res.end("Not found");
      }
   })  // создает сервер
   .listen(PORT)  // запускает проект на прослушку адрес порта
   console.log(`Сервер запущен на http://localhost:${PORT}`);