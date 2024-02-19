const Router = require('koa-router');
const orm = require('../models');
// const Game = require('../controllers/game.controller');

const router = new Router();

router.get('postgame.info', '/:id_partida', async (ctx) => {
  try {
    const partida = await orm.Partida.findOne({ where: { id: ctx.params.id_partida } });
    if (!partida) {
      ctx.body = { message: 'Partida no encontrada' };
      ctx.status = 404;
      return;
    }
    const flujo = await orm.Flujo.findOne({ where: { id_partida: ctx.params.id_partida } });
    if (!flujo) {
      ctx.body = { message: 'Flujo no encontrado' };
      ctx.status = 404;
      return;
    }
    const jugador = await orm.Jugador.findOne({ where: { id: flujo.id_jugador_ganador } });
    if (!jugador) {
      ctx.body = { message: 'Partida sin ganador aún' };
      ctx.status = 404;
      return;
    }
    const user = await orm.Usuario.findOne({ where: { id: jugador.id_usuario } });
    if (!user) {
      ctx.body = { message: 'Usuario no encontrado' };
      ctx.status = 404;
      return;
    }
    ctx.body = { nombre_partida: partida.nombre, rondas: flujo.ronda, ganador: user.nombre_usuario };
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
