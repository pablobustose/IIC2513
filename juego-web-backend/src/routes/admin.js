const Router = require('koa-router');
const Admin = require('../controllers/admin.controller');

const router = new Router();

router.get('admin.users', '/users', async (ctx) => {
  const result = await Admin.getusers();
  ctx.body = result.body;
  ctx.status = result.status;
});

router.get('admin.players', '/players', async (ctx) => {
  const result = await Admin.getplayers();
  ctx.body = result.body;
  ctx.status = result.status;
});

router.get('admin.games', '/games', async (ctx) => {
  const result = await Admin.getgames();
  ctx.body = result.body;
  ctx.status = result.status;
});

router.put('admin.deletegame', '/deletegame', async (ctx) => {
  const result = await Admin.deletegame(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.put('admin.deleteplayer', '/deleteplayer', async (ctx) => {
  const result = await Admin.deleteplayer(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.put('admin.deleteuser', '/deleteuser', async (ctx) => {
  const result = await Admin.deleteuser(ctx.request);
  ctx.body = result.body;
  ctx.status = result.status;
});

module.exports = router;
