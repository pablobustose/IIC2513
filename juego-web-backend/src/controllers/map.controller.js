const orm = require('../models');

const fillmap = async (id_partida) => {
  const players = await orm.Jugador.findAll({ where: { id_partida } });
  const ing = await orm.Territorio.create({
    id_jugador: players[0].id, nombre: 'Ingeniería', n_guerrero_principiante: 2, n_guerrero_intermedio: 2, n_guerrero_avanzado: 2, centro_x: 1, centro_y: 1, neighbours: ['Economía', 'Odontología'], createdAt: new Date(), updatedAt: new Date(),
  });
  await ing.save();
  const eco = await orm.Territorio.create({
    id_jugador: players[1].id, nombre: 'Economía', n_guerrero_principiante: 2, n_guerrero_intermedio: 2, n_guerrero_avanzado: 2, centro_x: 1, centro_y: 7, neighbours: ['Ingeniería', 'Letras', 'Psicología'], createdAt: new Date(), updatedAt: new Date(),
  });
  await eco.save();
  const odo = await orm.Territorio.create({
    id_jugador: players[3].id, nombre: 'Odontología', n_guerrero_principiante: 2, n_guerrero_intermedio: 2, n_guerrero_avanzado: 2, centro_x: 7, centro_y: 2, neighbours: ['Ingeniería', 'Letras', 'Física'], createdAt: new Date(), updatedAt: new Date(),
  });
  await odo.save();
  const hum = await orm.Territorio.create({
    id_jugador: players[0].id, nombre: 'Humanidades', n_guerrero_principiante: 2, n_guerrero_intermedio: 2, n_guerrero_avanzado: 2, centro_x: 8, centro_y: 12, neighbours: ['Letras', 'Psicología', 'Agronomía', 'College'], createdAt: new Date(), updatedAt: new Date(),
  });
  await hum.save();
  const letr = await orm.Territorio.create({
    id_jugador: players[2].id, nombre: 'Letras', n_guerrero_principiante: 2, n_guerrero_intermedio: 2, n_guerrero_avanzado: 2, centro_x: 7, centro_y: 7, neighbours: ['Economía', 'Odontología', 'Humanidades', 'College'], createdAt: new Date(), updatedAt: new Date(),
  });
  await letr.save();
  const fis = await orm.Territorio.create({
    id_jugador: players[1].id, nombre: 'Física', n_guerrero_principiante: 2, n_guerrero_intermedio: 2, n_guerrero_avanzado: 2, centro_x: 13, centro_y: 2, neighbours: ['Odontología', 'College'], createdAt: new Date(), updatedAt: new Date(),
  });
  await fis.save();
  const mat = await orm.Territorio.create({
    id_jugador: players[1].id, nombre: 'Matemáticas', n_guerrero_principiante: 2, n_guerrero_intermedio: 2, n_guerrero_avanzado: 2, centro_x: 14, centro_y: 19, neighbours: ['Agronomía', 'College'], createdAt: new Date(), updatedAt: new Date(),
  });
  await mat.save();
  const psi = await orm.Territorio.create({
    id_jugador: players[3].id, nombre: 'Psicología', n_guerrero_principiante: 2, n_guerrero_intermedio: 2, n_guerrero_avanzado: 2, centro_x: 2, centro_y: 12, neighbours: ['Economía', 'Humanidades', 'Deportes'], createdAt: new Date(), updatedAt: new Date(),
  });
  await psi.save();
  const dep = await orm.Territorio.create({
    id_jugador: players[2].id, nombre: 'Deportes', n_guerrero_principiante: 2, n_guerrero_intermedio: 2, n_guerrero_avanzado: 2, centro_x: 2, centro_y: 19, neighbours: ['Psicología', 'Agronomía'], createdAt: new Date(), updatedAt: new Date(),
  });
  await dep.save();
  const agr = await orm.Territorio.create({
    id_jugador: players[3].id, nombre: 'Agronomía', n_guerrero_principiante: 2, n_guerrero_intermedio: 2, n_guerrero_avanzado: 2, centro_x: 8, centro_y: 19, neighbours: ['Humanidades', 'Matemáticas', 'Deportes'], createdAt: new Date(), updatedAt: new Date(),
  });
  await agr.save();
  const col = await orm.Territorio.create({
    id_jugador: players[0].id, nombre: 'College', n_guerrero_principiante: 2, n_guerrero_intermedio: 2, n_guerrero_avanzado: 2, centro_x: 14, centro_y: 10, neighbours: ['Humanidades', 'Letras', 'Física', 'Matemáticas'], createdAt: new Date(), updatedAt: new Date(),
  });
  await col.save();
};

module.exports = {
  fillmap,
};
