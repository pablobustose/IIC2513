const Router = require('koa-router');
const PreGame = require('../controllers/pregame.controller');

const router = new Router();

router.post('pregame.newgame', '/newgame', async (ctx) => {
  const result = await PreGame.newgame(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.post('pregame.joingame', '/joingame', async (ctx) => {
  const result = await PreGame.joingame(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.put('pregame.startgame', '/startgame', async (ctx) => {
  const result = await PreGame.startgame(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.get('pregame.getgames', '/getgames', async (ctx) => {
  const result = await PreGame.getgames(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.get('pregame.getplayers', '/getplayers/:gameId', async (ctx) => {
  const result = await PreGame.getplayers(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.get('pregame.getgame', '/getgame/:gameId', async (ctx) => {
  const result = await PreGame.getgame(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.put('pregame.leavegame', '/leavegame', async (ctx) => {
  const result = await PreGame.leavegame(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

module.exports = router;
