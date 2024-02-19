const jwt = require('jsonwebtoken');
const orm = require('../models');
const flujo = require('../models/flujo');
const mapcontroller = require('./map.controller');

const getfacultadcolor = async (game_id) => {
  try {
    const facultades = ['Cisnes', 'Águilas', 'Flamencos', 'Golondrinas'];
    const utilizadas = await orm.Jugador.findAll({ where: { id_partida: game_id } });
    utilizadas.forEach((element) => {
      facultades.splice(facultades.indexOf(element.nombre_facultad), 1);
    });

    const indice = Math.floor(Math.random() * facultades.length);

    const colores = ['red', 'blue', 'green', 'yellow'];
    const used = await orm.Jugador.findAll({ where: { id_partida: game_id } });
    used.forEach((element) => {
      colores.splice(colores.indexOf(element.color), 1);
    });

    const index = Math.floor(Math.random() * colores.length);

    return { facultad: facultades[indice], color: colores[index] };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const newgame = async (ctx) => {
  // user_id
  // game_name

  try {
    const data = ctx.body;

    const user = await orm.Usuario.findByPk(data.user_id);

    if (!user) {
      return { body: 'Usuario no encontrado', status: 404 };
    }

    const game = await orm.Partida.create({
      n_jugadores: 1,
      fecha: new Date(),
      nombre: data.game_name,
    });

    const parameters = await getfacultadcolor(game.id);

    const player = await orm.Jugador.create({
      id_usuario: data.user_id,
      id_partida: game.id,
      nombre_facultad: parameters.facultad,
      color: parameters.color,
      rol: 1, // administrador
      n_guerrero_principiante: 6,
      n_guerrero_intermedio: 6,
      n_guerrero_avanzado: 6,
      agregado: 0, // recibe guerreros en ronda inicial
    });

    console.log(player);

    const flujo = await orm.Flujo.create({
      id_partida: game.id,
      id_jugador_ganador: null,
      id_jugador_turno: player.id,
      id_fase: 1,
      ronda: 0, // no iniciada
      ataques_ronda: 0,
      id_defensor: null,
      dados_atacante: null,
      dados_defensor: null,
    });

    await game.save();
    await player.save();
    await flujo.save();

    // Creamos el JWT con scope partida{id}
    const expirationSeconds = 1 * 60 * 60 * 24;
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
    const tokenScope = `partida${game.id}`;
    const token = jwt.sign(
      { scope: ['user', tokenScope] },
      JWT_PRIVATE_KEY,
      { subject: user.id.toString() },
      { expiresIn: expirationSeconds },
    );
    ctx.body = {
      game_id: game.id,
      player_id: player.id,
      access_token: token,
      token_type: 'Bearer',
      expires_in: expirationSeconds,
    };
    ctx.status = 200;
    return { body: ctx.body, status: ctx.status };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const joingame = async (ctx) => {
  // user_id
  // game_id

  try {
    const data = ctx.body;

    const user = await orm.Usuario.findByPk(data.user_id);

    if (!user) {
      return { body: 'Usuario no encontrado', status: 404 };
    }

    const game = await orm.Partida.findByPk(data.game_id);

    if (!game) {
      return { body: 'Partida no encontrada', status: 404 };
    }

    if (game.n_jugadores >= 4) {
      return { body: 'Partida llena', status: 400 };
    }

    const joined = await orm.Jugador.findOne({ where: { id_usuario: data.user_id, id_partida: data.game_id } });

    if (joined) {
      return { body: 'Ya estás en la partida', status: 400 };
    }

    const parameters = await getfacultadcolor(game.id);

    const player = await orm.Jugador.create({
      id_usuario: data.user_id,
      id_partida: data.game_id,
      nombre_facultad: parameters.facultad,
      color: parameters.color,
      rol: 0, // jugador
      n_guerrero_principiante: 6,
      n_guerrero_intermedio: 6,
      n_guerrero_avanzado: 6,
      agregado: 0, // recibe guerreros en ronda inicial
    });

    game.n_jugadores += 1;

    await game.save();
    await player.save();

    // Creamos el JWT con scope partida{id}
    const expirationSeconds = 1 * 60 * 60 * 24;
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
    const tokenScope = `partida${game.id}`;
    const token = jwt.sign(
      { scope: ['user', tokenScope] },
      JWT_PRIVATE_KEY,
      { subject: user.id.toString() },
      { expiresIn: expirationSeconds },
    );
    ctx.body = {
      player_id: player.id,
      access_token: token,
      token_type: 'Bearer',
      expires_in: expirationSeconds,
    };
    ctx.status = 201;
    return { body: ctx.body, status: ctx.status };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const startgame = async (ctx) => {
  // player_id
  // game_id

  try {
    const data = ctx.body;

    const player = await orm.Jugador.findByPk(data.player_id);

    if (!player) {
      return { body: 'Jugador no encontrado', status: 404 };
    }

    const game = await orm.Partida.findByPk(data.game_id);

    if (!game) {
      return { body: 'Partida no encontrada', status: 404 };
    }

    if (player.rol !== 1) {
      return { body: 'No eres administrador', status: 400 };
    }

    if (game.n_jugadores < 4) {
      return { body: 'Partida no llena', status: 400 };
    }

    const flujo = await orm.Flujo.findOne({ where: { id_partida: data.game_id } });

    if (flujo.ronda !== 0) {
      return { body: 'Partida ya iniciada', status: 400 };
    }

    flujo.ronda = 1;
    mapcontroller.fillmap(data.game_id);
    await flujo.save();
    return { body: 'Partida iniciada', status: 201 };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const getgames = async (ctx) => {
  try {
    const games = [];

    const flujos = await orm.Flujo.findAll({ where: { ronda: 0 } });
    for (let i = 0; i < flujos.length; i++) {
      const flujo = flujos[i];
      const partida = await orm.Partida.findOne({ where: { id: flujo.id_partida, n_jugadores: { [orm.Sequelize.Op.lt]: 4 } } });
      if (partida) {
        games.push(partida);
      }
    }
    return { body: games, status: 200 };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const getplayers = async (ctx) => {
  try {
    const { gameId } = ctx.params;
    // Realiza la consulta a la base de datos para obtener los jugadores
    const jugadores = await orm.Jugador.findAll({
      where: { id_partida: gameId },
      include: [{ model: orm.Usuario, attributes: ['nombre_usuario'] }],
    });

    const flujo = await orm.Flujo.findOne({ where: { id_partida: gameId } });

    if (flujo.ronda === 0) {
      return { body: { jugadores, iniciada: false }, status: 200 };
    }
    return { body: { jugadores, iniciada: true }, status: 200 };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const getgame = async (ctx) => {
  try {
    const { gameId } = ctx.params;
    const game = await orm.Partida.findByPk(gameId);

    return { body: game, status: 200 };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const leavegame = async (ctx) => {
  // player_id
  // game_id

  try {
    const data = ctx.body;

    const game = await orm.Partida.findByPk(data.game_id);

    if (!game) {
      return { body: 'Partida no encontrada', status: 404 };
    }

    const player = await orm.Jugador.findOne({ where: { id_partida: data.game_id, id: data.player_id } });

    if (!player) {
      return { body: 'Jugador no encontrado', status: 400 };
    }

    const expirationSeconds = 1 * 60 * 60 * 24;
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
    const token = jwt.sign(
      { scope: ['user'] },
      JWT_PRIVATE_KEY,
      { subject: player.id_usuario.toString() },
      { expiresIn: expirationSeconds },
    );
    ctx.body = {
      access_token: token,
      token_type: 'Bearer',
      expires_in: expirationSeconds,
    };

    game.n_jugadores -= 1;

    if (game.n_jugadores === 0) {
      await orm.Flujo.destroy({ where: { id_partida: data.game_id } });
      await player.destroy();
      await orm.Partida.destroy({ where: { id: data.game_id } });
    } else if (player.rol === 1) {
      const newadmin = await orm.Jugador.findOne({ where: { id_partida: data.game_id, rol: 0 } });
      newadmin.rol = 1;
      const flujo = await orm.Flujo.findOne({ where: { id_partida: data.game_id } });
      flujo.id_jugador_turno = newadmin.id;
      await flujo.save();
      await newadmin.save();
      await game.save();
      await player.destroy();
    } else {
      await game.save();
      await player.destroy();
    }
    ctx.status = 201;
    return { body: ctx.body, status: ctx.status };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

module.exports = {
  newgame,
  joingame,
  startgame,
  getgames,
  getplayers,
  getgame,
  leavegame,
};
