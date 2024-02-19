const Koa = require('koa');
const KoaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const router = require('./routes');
const orm = require('./models');
// const cors = require("@koa/cors");

// Crear instancia de Koa
const app = new Koa();

app.context.orm = orm;

// Cors para poder acceder desde el front
app.use(cors());

// Middlewares proporcionados por Koa
app.use(KoaLogger());
app.use(koaBody());

// koa-router
app.use(router.routes());

// Middleware personalizado
app.use((ctx, next) => {
  ctx.body = 'Hola Mundo!';
});

// // Hacer que el servidor escuche en el puerto 3000
// app.listen(3000, () => {
//     console.log("Iniciando app. Escuchando en el puerto 3000");
// })

module.exports = app;
