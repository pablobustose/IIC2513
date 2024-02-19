const { where } = require('sequelize');
const jwt = require('jsonwebtoken');
const orm = require('../models');

const cleangame = async (game_id) => {
  try {
    const game = await orm.Partida.findByPk(game_id);
    if (!game) {
      return { body: 'Partida no encontrada', status: 404 };
    }
    const flujo = await orm.Flujo.findOne({
      where: { id_partida: game_id },
    });
    if (!flujo) {
      return { body: 'Flujo no encontrado', status: 404 };
    }
    const players = await orm.Jugador.findAll({
      where: { id_partida: game_id },
    });
    if (!players) {
      return { body: 'Jugadores no encontrados', status: 404 };
    }
    const cartas = [];
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      cartas.push(await orm.Carta.findAll({
        where: { id_jugador: player.id },
      }));
    }

    const territorios = [];

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      territorios.push(await orm.Territorio.findAll({
        where: { id_jugador: player.id },
      }));
    }

    for (let i = 0; i < cartas.length; i++) {
      for (let j = 0; j < cartas[i].length; j++) {
        const carta = cartas[i][j];
        await carta.destroy();
      }
    }

    for (let i = 0; i < territorios.length; i++) {
      for (let j = 0; j < territorios[i].length; j++) {
        const territorio = territorios[i][j];
        await territorio.destroy();
      }
    }

    await flujo.destroy();

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      await player.destroy();
    }

    await game.destroy();

    return { body: 'Partida eliminada', status: 200 };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const getusers = async () => {
  try {
    const users = await orm.Usuario.findAll({ where: { id: { [orm.Sequelize.Op.ne]: 1 } } });
    return { body: users, status: 200 };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const getplayers = async () => {
  try {
    const players = await orm.Jugador.findAll();
    const users = await orm.Usuario.findAll();
    const games = await orm.Partida.findAll();
    const response = [];
    for (let i = 0; i < players.length; i++) {
      const dict = {};
      const player = players[i];
      const user = users.find((user) => user.id === player.id_usuario);
      const game = games.find((game) => game.id === player.id_partida);
      dict.player_id = player.id;
      dict.nombre_usuario = user.nombre_usuario;
      dict.nombre_partida = game.nombre;
      response.push(dict);
    }
    return { body: response, status: 200 };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const getgames = async () => {
  try {
    const games = await orm.Partida.findAll();
    return { body: games, status: 200 };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const deleteuser = async (ctx) => {
  // user_id
  try {
    const data = ctx.body;
    const user = await orm.Usuario.findByPk(data.user_id);
    if (!user) {
      return { body: 'Usuario no encontrado', status: 404 };
    }
    const players = await orm.Jugador.findAll({
      where: { id_usuario: data.user_id },
    });

    if (players.length === 0) {
      await user.destroy();
      return { body: 'Usuario eliminado', status: 200 };
    }
    const games = [];
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      games.push(await orm.Partida.findByPk(player.id_partida));
    }

    let result = { body: 'No se ejecutó nada', status: 400 };

    for (let i = 0; i < games.length; i++) {
      console.log('entra al for');
      const game = games[i];
      result = await cleangame(game.id);
    }
    await user.destroy();
    return result;
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const deleteplayer = async (ctx) => {
  // player_id
  try {
    const data = ctx.body;
    const player = await orm.Jugador.findByPk(data.player_id);
    if (!player) {
      return { body: 'Jugador no encontrado', status: 404 };
    }
    const game = await orm.Partida.findByPk(player.id_partida);
    if (!game) {
      return { body: 'Partida no encontrada', status: 404 };
    }
    const result = await cleangame(game.id);
    return result;
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const deletegame = async (ctx) => {
  // game_id
  try {
    const data = ctx.body;
    const game = await orm.Partida.findByPk(data.game_id);
    if (!game) {
      return { body: 'Partida no encontrada', status: 404 };
    }
    const result = await cleangame(game.id);
    return result;
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

module.exports = {
  getusers,
  getplayers,
  getgames,
  deleteuser,
  deleteplayer,
  deletegame,
};
