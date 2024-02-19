const orm = require('../models');
const Attack = require('./attack.controller');
const territorio = require('../models/territorio');

const getGuerreros = async (flujo, jugador) => {
  if (jugador.agregado === 0) {
    // Si el jugador está empezando el turno: se le asignan guerreros según la ronda
    if (flujo.ronda < 3) {
      jugador.n_guerrero_principiante += 3;
    } else if (flujo.ronda < 6) {
      jugador.n_guerrero_principiante += 2;
      jugador.n_guerrero_intermedio += 2;
    } else if (flujo.ronda < 9) {
      jugador.n_guerrero_principiante += 2;
      jugador.n_guerrero_intermedio += 2;
      jugador.n_guerrero_avanzado += 1;
    } else if (flujo.ronda < 12) {
      jugador.n_guerrero_principiante += 2;
      jugador.n_guerrero_intermedio += 2;
      jugador.n_guerrero_avanzado += 2;
    } else if (flujo.ronda < 15) {
      jugador.n_guerrero_principiante += 1;
      jugador.n_guerrero_intermedio += 3;
      jugador.n_guerrero_avanzado += 3;
    } else {
      jugador.n_guerrero_principiante += 0;
      jugador.n_guerrero_intermedio += 4;
      jugador.n_guerrero_avanzado += 4;
    }
    jugador.agregado = 1;
    await jugador.save();
  }
};

const reforzamiento = async (ctx) => {
  // Recibe:
  // id_jugador que realiza la acción
  // id_territorio donde quiere reforzar
  // n_guerreros_principiantes
  // n_guerreros_intermedios
  // n_guerreros_avanzados

  try {
    const data = ctx.body;
    const { params } = ctx;

    if (Object.keys(data).length !== 5) {
      return { body: 'El número de parámetros es incorrecto', status: 400 };
    }

    const partida = await orm.Partida.findByPk(params.id_partida);

    if (!partida) {
      return { body: 'No se encontró la partida solicitada', status: 404 };
    }

    const jugador = await orm.Jugador.findOne({
      where: { id: data.id_jugador, id_partida: params.id_partida },
    });

    if (!jugador) {
      return { body: 'El jugador ingresado no pertenece a la partida', status: 400 };
    }

    const flujo = await orm.Flujo.findOne({ where: { id_partida: partida.id } });

    if (flujo.id_jugador_ganador != null) {
      return { body: 'La partida ya ha finalizado', status: 400 };
    }

    if (flujo.id_jugador_turno !== data.id_jugador) {
      return { body: 'No es el turno del jugador', status: 400 };
    }

    if (flujo.id_fase !== 1) {
      return { body: 'No es la fase de reforzamiento', status: 400 };
    }

    const territorio = await orm.Territorio.findOne({
      where: { id: data.id_territorio, id_jugador: data.id_jugador },
    });

    if (!territorio) {
      return { body: 'El territorio no pertenece al jugador', status: 400 };
    }

    if (jugador.n_guerrero_principiante < data.n_guerreros_principiantes || jugador.n_guerrero_intermedio < data.n_guerreros_intermedios || jugador.n_guerrero_avanzado < data.n_guerreros_avanzados) {
      return { body: 'No tiene suficientes guerreros para reforzar', status: 400 };
    }
    territorio.n_guerrero_principiante += data.n_guerreros_principiantes;
    territorio.n_guerrero_intermedio += data.n_guerreros_intermedios;
    territorio.n_guerrero_avanzado += data.n_guerreros_avanzados;
    jugador.n_guerrero_principiante -= data.n_guerreros_principiantes;
    jugador.n_guerrero_intermedio -= data.n_guerreros_intermedios;
    jugador.n_guerrero_avanzado -= data.n_guerreros_avanzados;

    await territorio.save();
    await jugador.save();
    return { body: { territorio, jugador }, status: 201 };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const desplazamiento = async (ctx) => {
  // Recibe:
  // player_id
  // territorio_origen_id
  // territorio_destino_id
  // n_guerreros_principiantes
  // n_guerreros_intermedios
  // n_guerreros_avanzados

  try {
    const data = ctx.body;
    const { params } = ctx;

    if (Object.keys(data).length !== 6) {
      return { body: 'El número de parámetros es incorrecto', status: 400 };
    }
    const partida = await orm.Partida.findByPk(params.id_partida);
    if (!partida) {
      return { body: 'No se encontró la partida solicitada', status: 404 };
    }
    const flujo = await orm.Flujo.findOne({ where: { id_partida: partida.id } });

    if (flujo.id_jugador_ganador !== null) {
      return { body: 'La partida ya ha finalizado', status: 400 };
    }
    if (flujo.id_jugador_turno !== data.player_id) {
      return { body: 'No es el turno del jugador', status: 400 };
    }
    if (flujo.id_fase !== 3) {
      return { body: 'No es la fase de desplazamiento', status: 400 };
    }
    const jugador = await orm.Jugador.findByPk(data.player_id);

    if (jugador.id_partida !== partida.id) {
      return { body: 'El jugador no pertenece a la partida', status: 400 };
    }
    const territorio_origen = await orm.Territorio.findByPk(data.territorio_origen_id);

    if (territorio_origen === null) {
      return { body: 'El territorio de origen no existe', status: 400 };
    }
    if (territorio_origen.id_jugador !== jugador.id) {
      return { body: 'El territorio de origen no pertenece al jugador', status: 400 };
    }

    const territorio_destino = await orm.Territorio.findByPk(data.territorio_destino_id);

    if (territorio_destino === null) {
      return { body: 'El territorio de destino no existe', status: 400 };
    }
    if (territorio_destino.id_jugador !== jugador.id) {
      return { body: 'El territorio de destino no pertenece al jugador', status: 400 };
    }
    const vecinos_origen = territorio_origen.neighbours;

    if (!vecinos_origen.includes(territorio_destino.nombre)) {
      return { body: 'El territorio de destino no es vecino del territorio de origen', status: 400 };
    }

    if (territorio_origen.n_guerrero_principiante < data.n_guerreros_principiantes || territorio_origen.n_guerrero_intermedio < data.n_guerreros_intermedios || territorio_origen.n_guerrero_avanzado < data.n_guerreros_avanzados) {
      return { body: 'No hay suficientes guerreros en el territorio de origen', status: 400 };
    }
    if (territorio_origen.n_guerrero_principiante - data.n_guerreros_principiantes === 0 && territorio_origen.n_guerrero_intermedio - data.n_guerreros_intermedios === 0 && territorio_origen.n_guerrero_avanzado - data.n_guerreros_avanzados === 0) {
      return { body: 'No se puede dejar el territorio de origen sin guerreros', status: 400 };
    }

    territorio_origen.n_guerrero_principiante -= data.n_guerreros_principiantes;
    territorio_origen.n_guerrero_intermedio -= data.n_guerreros_intermedios;
    territorio_origen.n_guerrero_avanzado -= data.n_guerreros_avanzados;
    territorio_destino.n_guerrero_principiante += data.n_guerreros_principiantes;
    territorio_destino.n_guerrero_intermedio += data.n_guerreros_intermedios;
    territorio_destino.n_guerrero_avanzado += data.n_guerreros_avanzados;

    await territorio_origen.save();
    await territorio_destino.save();

    return { body: { territorio, jugador }, status: 200 };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const attack = async (ctx) => {
  // Recibe:
  // player_id
  // territorio_atacante_id
  // territorio_defensor_id
  // n_guerreros_principiantes
  // n_guerreros_intermedios
  // n_guerreros_avanzados

  try {
    const data = ctx.body;
    const { params } = ctx;

    if (Object.keys(data).length !== 6) {
      return { body: 'El número de parámetros es incorrecto', status: 400 };
    }
    const partida = await orm.Partida.findByPk(params.id_partida);

    if (!partida) {
      return { body: 'No se encontró la partida solicitada', status: 404 };
    }
    const flujo = await orm.Flujo.findOne({ where: { id_partida: partida.id } });

    if (flujo.id_jugador_ganador !== null) {
      return { body: 'La partida ya ha finalizado', status: 400 };
    }
    if (flujo.id_jugador_turno !== data.player_id) {
      return { body: 'No es el turno del jugador', status: 400 };
    }
    if (flujo.id_fase !== 2) {
      return { body: 'No es la fase de ataque', status: 400 };
    }

    const jugador = await orm.Jugador.findByPk(data.player_id);

    if (jugador.id_partida !== partida.id) {
      return { body: 'El jugador no pertenece a la partida', status: 400 };
    }
    const territorio_atacante = await orm.Territorio.findByPk(data.territorio_atacante_id);

    if (territorio_atacante === null) {
      return { body: 'El territorio de origen no existe', status: 400 };
    }
    if (territorio_atacante.id_jugador !== jugador.id) {
      return { body: 'El territorio atacante no pertenece al jugador', status: 400 };
    }

    const territorio_defensor = await orm.Territorio.findByPk(data.territorio_defensor_id);

    if (territorio_defensor === null) {
      return { body: 'El territorio de destino no existe', status: 400 };
    }
    if (territorio_defensor.id_jugador === jugador.id) {
      return { body: 'No puedes atacar a tus propios territorios', status: 400 };
    }

    const jugador_defensor = await orm.Jugador.findByPk(territorio_defensor.id_jugador);

    if (data.n_guerreros_principiantes === 0 && data.n_guerreros_intermedios === 0 && data.n_guerreros_avanzados === 0) {
      return { body: 'No se puede atacar sin guerreros', status: 400 };
    }

    if (data.n_guerreros_principiantes + data.n_guerreros_intermedios + data.n_guerreros_avanzados > 3) {
      return { body: 'No se pueden atacar con más de 3 guerreros', status: 400 };
    }

    if (territorio_atacante.n_guerrero_principiante < data.n_guerreros_principiantes || territorio_atacante.n_guerrero_intermedio < data.n_guerreros_intermedios || territorio_atacante.n_guerrero_avanzado < data.n_guerreros_avanzados) {
      return { body: 'No hay suficientes guerreros en el territorio de origen', status: 400 };
    }

    if (territorio_atacante.n_guerrero_principiante - data.n_guerreros_principiantes === 0 && territorio_atacante.n_guerrero_intermedio - data.n_guerreros_intermedios === 0 && territorio_atacante.n_guerrero_avanzado - data.n_guerreros_avanzados === 0) {
      return { body: 'No se puede dejar el territorio de origen sin guerreros', status: 400 };
    }

    const vecinos = territorio_atacante.neighbours;

    if (!vecinos.includes(territorio_defensor.nombre)) {
      return { body: 'El territorio defensor no es vecino del territorio atacante', status: 400 };
    }

    const defense = await Attack.getdefense(territorio_defensor.id);

    const copydefense = defense.slice();

    if (defense.length === 0) {
      return { body: 'El territorio defensor no tiene guerreros', status: 400 };
    }
    const attack = [data.n_guerreros_principiantes, data.n_guerreros_intermedios, data.n_guerreros_avanzados];

    const result = await Attack.combat(attack, copydefense, partida.id);

    flujo.id_defensor = territorio_defensor.id_jugador;
    flujo.ataques_ronda += 1;
    await flujo.save();

    if (result === 'atacante') {
      console.log('ATAQUE GANADOR');
      territorio_defensor.n_guerrero_principiante -= defense[0];
      territorio_defensor.n_guerrero_intermedio -= defense[1];
      territorio_defensor.n_guerrero_avanzado -= defense[2];
      if (territorio_defensor.n_guerrero_principiante <= 0 && territorio_defensor.n_guerrero_intermedio <= 0 && territorio_defensor.n_guerrero_avanzado <= 0) {
        const defensor = territorio_defensor.id_jugador;
        territorio_defensor.id_jugador = jugador.id;
        territorio_defensor.n_guerrero_principiante = data.n_guerreros_principiantes;
        territorio_defensor.n_guerrero_intermedio = data.n_guerreros_intermedios;
        territorio_defensor.n_guerrero_avanzado = data.n_guerreros_avanzados;
        territorio_atacante.n_guerrero_principiante -= data.n_guerreros_principiantes;
        territorio_atacante.n_guerrero_intermedio -= data.n_guerreros_intermedios;
        territorio_atacante.n_guerrero_avanzado -= data.n_guerreros_avanzados;
        await territorio_defensor.save();
        await territorio_atacante.save();
        //
        //
        //
        //
        //
        // ver si es necesario hacer más de estos save() el alguna otra parte
        //
        //
        //
        //
        // revisar si el jugador defensor se quedó sin territorios
        const territorios_defensor = await orm.Territorio.findAll({ where: { id_jugador: defensor } });
        if (territorios_defensor.length === 0) {
          partida.n_jugadores -= 1;
          console.log('JUGADOR ELIMINADO');
          const cartas_defensor = await orm.Carta.findAll({ where: { id_jugador: defensor } });
          for (let i = 0; i < cartas_defensor.length; i++) {
            const carta = cartas_defensor[i];
            carta.id_jugador = jugador.id;
            await carta.save();
          }
          jugador.n_guerrero_principiante += jugador_defensor.n_guerrero_principiante;
          jugador.n_guerrero_intermedio += jugador_defensor.n_guerrero_intermedio;
          jugador.n_guerrero_avanzado += jugador_defensor.n_guerrero_avanzado;
          jugador_defensor.n_guerrero_principiante = 0;
          jugador_defensor.n_guerrero_intermedio = 0;
          jugador_defensor.n_guerrero_avanzado = 0;
          await jugador.save();
          await jugador_defensor.save();
          if (partida.n_jugadores === 1) {
            flujo.id_jugador_ganador = jugador.id;
            await flujo.save();
          }
          await partida.save();
        }
      }
    } else {
      territorio_atacante.n_guerrero_principiante -= data.n_guerreros_principiantes;
      territorio_atacante.n_guerrero_intermedio -= data.n_guerreros_intermedios;
      territorio_atacante.n_guerrero_avanzado -= data.n_guerreros_avanzados;
    }
    await territorio_defensor.save();
    await territorio_atacante.save();
    return { body: result, status: 200 };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const usar_carta = async (ctx) => {
  // Recibe:
  // player_id
  // carta_tipo

  try {
    const data = ctx.body;
    const { params } = ctx;

    if (Object.keys(data).length !== 2) {
      return { body: 'El número de parámetros es incorrecto', status: 400 };
    }
    const partida = await orm.Partida.findByPk(params.id_partida);

    if (!partida) {
      return { body: 'No se encontró la partida solicitada', status: 404 };
    }
    const flujo = await orm.Flujo.findOne({ where: { id_partida: partida.id } });

    if (flujo.id_jugador_ganador !== null) {
      return { body: 'La partida ya ha finalizado', status: 400 };
    }
    if (flujo.id_jugador_turno !== data.player_id) {
      return { body: 'No es el turno del jugador', status: 400 };
    }
    if (flujo.id_fase !== 1) {
      return { body: 'No es la fase de reforzamiento', status: 400 };
    }
    const jugador = await orm.Jugador.findByPk(data.player_id);

    if (jugador.id_partida !== partida.id) {
      return { body: 'El jugador no pertenece a la partida', status: 400 };
    }
    const carta = await orm.Carta.findOne({ where: { id_jugador: data.player_id, tipo: data.carta_tipo } });

    if (carta === null) {
      return { body: 'El jugador no posee ese tipo de carta', status: 400 };
    }

    if (carta.tipo === 'Carta principiante') {
      jugador.n_guerrero_principiante += 3;
    } else if (carta.tipo === 'Carta intermedio') {
      jugador.n_guerrero_intermedio += 2;
    } else if (carta.tipo === 'Carta avanzado') {
      jugador.n_guerrero_avanzado += 1;
    } else {
      return { body: 'Tipo de carta no válido', status: 400 };
    }
    await jugador.save();
    await carta.destroy();

    return { body: jugador, status: 200 };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

const asignar_carta = async (player_id) => {
  try {
    const random = Math.random();
    let tipoCarta;

    if (random < 0.4) {
      tipoCarta = 'Carta principiante';
    } else if (random < 0.7) {
      tipoCarta = 'Carta intermedio';
    } else if (random < 0.85) {
      tipoCarta = 'Carta avanzado';
    } else {
      tipoCarta = null;
      return 'No se asignó ninguna carta';
    }

    const info_carta = { id_jugador: player_id, tipo: tipoCarta };
    const carta = await orm.Carta.create(info_carta);
    await carta.save();
    console.log('Carta asignada:', tipoCarta);
    return tipoCarta;
  } catch (error) {
    console.error('Error en la consulta:', error);
    return 'Error en el servidor';
  }
};

const handleTurno = async (ctx) => {
  // Recibe:
  // player_id

  try {
    const data = ctx.body;
    const { params } = ctx;

    if (Object.keys(data).length !== 1) {
      return { body: 'El número de parámetros es incorrecto', status: 400 };
    }
    const partida = await orm.Partida.findByPk(params.id_partida);

    if (!partida) {
      return { body: 'No se encontró la partida solicitada', status: 404 };
    }
    const flujo = await orm.Flujo.findOne({ where: { id_partida: partida.id } });

    if (flujo.id_jugador_ganador !== null) {
      return { body: 'La partida ya ha finalizado', status: 400 };
    }
    if (flujo.id_jugador_turno !== data.player_id) {
      return { body: 'No es el turno del jugador', status: 400 };
    }
    const jugador = await orm.Jugador.findByPk(data.player_id);

    if (jugador.id_partida !== partida.id) {
      return { body: 'El jugador no pertenece a la partida', status: 400 };
    }
    const jugadores_iterables = await orm.Jugador.findAll({ where: { id_partida: partida.id }, order: [['id', 'ASC']] });
    const jugadores = [];
    for (let i = 0; i < jugadores_iterables.length; i++) {
      const jugador = jugadores_iterables[i];
      const territorios_jugador = await orm.Territorio.findAll({ where: { id_jugador: jugador.id } });
      if (territorios_jugador.length > 0) {
        jugadores.push(jugador);
      }
    }

    const n_jugadores = jugadores.length;
    let index = 0;
    for (let i = 0; i < n_jugadores; i++) {
      if (jugadores[i].id === jugador.id) {
        index = i;
        break;
      }
    }
    let tipo_carta = null;
    if (flujo.id_fase === 1) {
      flujo.id_fase = 2;
      jugador.agregado = 0;
      await jugador.save();
    } else if (flujo.id_fase === 2) {
      flujo.id_fase = 3;
    } else if (flujo.id_fase === 3) {
      flujo.id_fase = 1;
      flujo.ataques_ronda = 0;
      if (index === n_jugadores - 1) {
        for (let i = 0; i < n_jugadores; i++) {
          await getGuerreros(flujo, jugadores[i]);
        }
        flujo.ronda += 1;
        flujo.id_jugador_turno = jugadores[0].id;
      } else {
        flujo.id_jugador_turno = jugadores[index + 1].id;
      }
      tipo_carta = await asignar_carta(flujo.id_jugador_turno);
    }
    await flujo.save();
    return {
      body: {
        ronda: flujo.ronda, turno_jugador: flujo.id_jugador_turno, fase: flujo.id_fase, tipo_nueva_carta: tipo_carta,
      },
      status: 200,
    };
  } catch (error) {
    console.error('Error en la consulta:', error);
    return { body: 'Error en el servidor', status: 500 };
  }
};

module.exports = {
  reforzamiento,
  desplazamiento,
  usar_carta,
  handleTurno,
  attack,
};
