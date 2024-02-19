const Router = require('koa-router');
const Auth = require('../controllers/authentication.controller');

const router = new Router();

router.post('authentication.signup', '/signup', async (ctx) => {
  const result = await Auth.signup(ctx);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.post('authentication.login', '/login', async (ctx) => {
  const result = await Auth.login(ctx);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.post('authentication.gettoken', '/gettoken', async (ctx) => {
  const result = await Auth.getTokenUser(ctx);
  ctx.body = result.body;
  ctx.status = result.status;
});

module.exports = router;
