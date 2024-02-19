const Router = require('koa-router');
const Flujo = require('../controllers/flujo.controller');

const router = new Router();

router.get('flujo.mapa', '/map/:id_partida', async (ctx) => {
  const result = await Flujo.cargarMapa(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.get('flujo.infoPartida', '/:id_partida/:playerId', async (ctx) => {
  const result = await Flujo.cargarInfoPartida(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

module.exports = router;
