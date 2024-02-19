const Router = require('koa-router');
const authUtils = require('../lib/auth/jwt');

const router = new Router();

// Solo se ejecuta la función si authUtils.isUser es True
router.get('/protecteduser', authUtils.isUser, async (ctx) => {
  ctx.body = {
    message: 'Bienvenido a la ruta protegida con el scope user!', user: ctx.state.user,
  };
});

router.get('/protectedadmin', authUtils.isAdmin, async (ctx) => {
  ctx.body = {
    message: 'Bienvenido a la ruta protegida con el scope admin!', user: ctx.state.user,
  };
});

router.get('/protectedpartida', authUtils.isPartida, async (ctx) => {
  ctx.body = {
    message: "Bienvenido a la ruta protegida con el scope 'partida'!",
    partidaId: ctx.state.partidaId,
  };
});

router.get('/protectedpartidaid/:id_partida', authUtils.isPartidaId, async (ctx) => {
  ctx.body = {
    message: "Bienvenido a la ruta protegida con el scope 'partida'!",
    partidaId: ctx.state.partidaId,
  };
});

module.exports = router;
