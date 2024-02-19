const Router = require('koa-router');
const orm = require('../models');

const router = new Router();

router.get('historial.gethistorial', '/', async (ctx) => {
  try {
    const info = [];
    const partidas = await orm.Partida.findAll();
    const users = await orm.Usuario.findAll();
    const jugadores = await orm.Jugador.findAll();
    for (let i = 0; i < partidas.length; i++) {
      const partida = partidas[i];
      const flujo = await orm.Flujo.findOne({ where: { id_jugador_ganador: { [orm.Sequelize.Op.ne]: null }, id_partida: partida.id } });
      if (flujo) {
        const jugador = jugadores.find((jugador) => jugador.id === flujo.id_jugador_ganador);
        const user = users.find((user) => user.id === jugador.id_usuario);
        info.push({
          partida: partida.nombre, ronda: flujo.ronda, estado: 'Finalizada', ganador: user.nombre_usuario,
        });
      } else {
        const flujo2 = await orm.Flujo.findOne({ where: { id_partida: partida.id } });
        info.push({
          partida: partida.nombre, ronda: flujo2.ronda, estado: 'En curso', ganador: null,
        });
      }
    }
    ctx.body = info;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('historial.gethistorialpartida', '/game/:id_partida', async (ctx) => {
  try {
    const info = [];
    const infoplayers = [];
    const params = ctx.params;
    const partida = await orm.Partida.findByPk(params.id_partida);
    const flujo = await orm.Flujo.findOne({ where: { id_partida: partida.id } });
    const jugadores = await orm.Jugador.findAll({ where: { id_partida: partida.id } });
    for (let i = 0; i < jugadores.length; i++) {
      const jugador = jugadores[i];
      const user = await orm.Usuario.findByPk(jugador.id_usuario);
      infoplayers.push({ usuario: user.nombre_usuario, color: jugador.color });
    }
    if (flujo.id_jugador_ganador) {
      const jugador_ganador = await orm.Jugador.findByPk(flujo.id_jugador_ganador);
      const user_ganador = await orm.Usuario.findByPk(jugador_ganador.id_usuario);
      info.push({
        jugadores: infoplayers, ronda: flujo.ronda, estado: 'Finalizada', ganador: user_ganador.nombre_usuario,
      });
    } else {
      info.push({
        jugadores: infoplayers, ronda: flujo.ronda, estado: 'En curso', ganador: null,
      });
    }
    ctx.body = info;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('historial.gethistorialusuaio', '/user/:id_usuario', async (ctx) => {
  try {
    const info = [];
    const params = ctx.params;
    const user = await orm.Usuario.findByPk(params.id_usuario);
    const jugadores = await orm.Jugador.findAll({ where: { id_usuario: user.id } });
    for (let i = 0; i < jugadores.length; i++) {
      const jugador = jugadores[i];
      const partida = await orm.Partida.findByPk(jugador.id_partida);
      const flujo = await orm.Flujo.findOne({ where: { id_jugador_ganador: { [orm.Sequelize.Op.ne]: null }, id_partida: partida.id } });
      if (flujo) {
        const jugador_ganador = await orm.Jugador.findByPk(flujo.id_jugador_ganador);
        const user_ganador = await orm.Usuario.findByPk(jugador_ganador.id_usuario);
        info.push({
          partida: partida.nombre, ronda: flujo.ronda, estado: 'Finalizada', ganador: user_ganador.nombre_usuario,
        });
      } else {
        const flujo2 = await orm.Flujo.findOne({ where: { id_partida: partida.id } });
        info.push({
          partida: partida.nombre, ronda: flujo2.ronda, estado: 'En curso', ganador: null,
        });
      }
    }
    ctx.body = info;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
