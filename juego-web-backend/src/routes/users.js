const Router = require('koa-router');

const router = new Router();

router.get('usuarios.list', '/', async (ctx) => {
  try {
    const users = await ctx.orm.Usuario.findAll();
    ctx.body = users;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('usuarios.show', '/:id', async (ctx) => {
  try {
    const user = await ctx.orm.Usuario.findOne({ where: { id: ctx.params.id } });
    ctx.body = user;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
