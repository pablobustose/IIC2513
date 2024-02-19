const { where } = require('sequelize');
const orm = require('../models');

const cambiarIdioma = (color) => {
  switch (color) {
    case 'red': return 'Rojo';
    case 'blue': return 'Azul';
    case 'green': return 'Verde';
    case 'yellow': return 'Amarillo';
    default: return null;
  }
};

const cargarMapa = async (ctx) => {
  try {
    const { params } = ctx;
    const facultades = {};
    const players = await orm.Jugador.findAll({ where: { id_partida: params.id_partida } });

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const usuario = await orm.Usuario.findByPk(player.id_usuario);
      const territorios = await orm.Territorio.findAll({ where: { id_jugador: player.id } });

      for (let j = 0; j < territorios.length; j++) {
        const facultad = territorios[j];
        const sectores = await orm.Sector.findAll({ where: { nom_territorio: facultad.nombre } });
        const sectoresArray = [];
        for (let j = 0; j < sectores.length; j++) {
          const sector = sectores[j];
          sectoresArray.push([sector.cord_x, sector.cord_y]);
        }
        facultades[facultad.nombre] = {
          id: facultad.id,
          nombre: facultad.nombre,
          color: player.color,
          dueno: usuario.nombre_usuario,
          guerrero_principiante: facultad.n_guerrero_principiante,
          guerrero_intermedio: facultad.n_guerrero_intermedio,
          guerrero_avanzado: facultad.n_guerrero_avanzado,
          mid: [facultad.centro_x, facultad.centro_y],
          celdas: sectoresArray,
        };
      }
    }
    ctx.body = facultades;
    ctx.status = 200;
    return { body: ctx.body, status: ctx.status };
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    console.log(error);
    return { body: ctx.body, status: ctx.status };
  }
};

const cargarInfoPartida = async (ctx) => {
  try {
    const { params } = ctx;
    const partida = await orm.Partida.findByPk(params.id_partida);

    if (!partida) {
      // Manejar el caso en que no se encuentre la partida
      return {
        status: 404,
        body: { message: 'Partida no encontrada' },
      };
    }

    // Obtener la información de Flujo relacionada con la partida
    const flujo = await orm.Flujo.findOne({
      where: { id_partida: params.id_partida },
    });

    if (!flujo) {
      // Manejar el caso en que no se encuentre la información de Flujo
      return {
        status: 404,
        body: { message: 'Información de Flujo no encontrada para la partida' },
      };
    }

    // Obtener el nombre de la fase relacionada con la información de Flujo
    const fase = await orm.Fase.findByPk(flujo.id_fase);
    const nombreFase = fase ? fase.nombre : null;
    const jugador_en_turno = await orm.Jugador.findByPk(flujo.id_jugador_turno);
    const color = jugador_en_turno ? cambiarIdioma(jugador_en_turno.color) : null;

    const jugador = await orm.Jugador.findByPk(params.playerId);
    const cartas = await orm.Carta.findAll({ where: { id_jugador: params.playerId } });
    const tiposcartas = [];
    for (let i = 0; i < cartas.length; i++) {
      const carta = cartas[i];
      tiposcartas.push(carta.tipo);
    }

    const jugadorColor = jugador ? cambiarIdioma(jugador.color) : null;
    return {
      status: 200,
      body: {
        id_jugador_turno: flujo.id_jugador_turno,
        id_fase: flujo.id_fase,
        ronda: flujo.ronda,
        nombre_fase: nombreFase,
        turno: color,
        color: jugadorColor,
        guerreros_principiantes: jugador.n_guerrero_principiante,
        guerreros_intermedios: jugador.n_guerrero_intermedio,
        guerreros_avanzados: jugador.n_guerrero_avanzado,
        cartas: tiposcartas,
        ataques_ronda: flujo.ataques_ronda,
        id_defensor: flujo.id_defensor,
        dados_atacante: flujo.dados_atacante,
        dados_defensor: flujo.dados_defensor,
        id_jugador_ganador: flujo.id_jugador_ganador,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: { message: 'Error interno del servidor' },
    };
  }
};

module.exports = {
  cargarMapa,
  cargarInfoPartida,
};
