const Router = require('koa-router');
const Game = require('../controllers/game.controller');

const router = new Router();

router.put('game.reforzamiento', '/reforzamiento/:id_partida', async (ctx) => {
  const result = await Game.reforzamiento(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.put('game.desplazamiento', '/desplazamiento/:id_partida', async (ctx) => {
  const result = await Game.desplazamiento(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.put('game.usar_carta', '/usar_carta/:id_partida', async (ctx) => {
  const result = await Game.usar_carta(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.put('game.handleTurno', '/handleTurno/:id_partida', async (ctx) => {
  const result = await Game.handleTurno(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.put('game.attack', '/attack/:id_partida', async (ctx) => {
  const result = await Game.attack(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

module.exports = router;
