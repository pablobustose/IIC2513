const orm = require('../models');

const getvalue = async (tipo_guerrero) => {
  if (tipo_guerrero === 0) {
    return Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  }
  if (tipo_guerrero === 1) {
    return Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  }
  if (tipo_guerrero === 2) {
    return Math.floor(Math.random() * (6 - 2 + 1)) + 2;
  }
  return 0;
};

const getdefense = async (territorio_id) => {
  const territorio = await orm.Territorio.findByPk(territorio_id);
  let n_guerreros = territorio.n_guerrero_principiante + territorio.n_guerrero_intermedio + territorio.n_guerrero_avanzado;
  let { n_guerrero_avanzado } = territorio;
  let { n_guerrero_intermedio } = territorio;
  let { n_guerrero_principiante } = territorio;
  if (n_guerreros > 3) {
    n_guerreros = 3;
  }
  const defense = [0, 0, 0];
  while (n_guerreros > 0) {
    if (n_guerrero_avanzado > 0) {
      n_guerrero_avanzado -= 1;
      n_guerreros -= 1;
      defense[2] += 1;
    } else if (n_guerrero_intermedio > 0) {
      n_guerrero_intermedio -= 1;
      n_guerreros -= 1;
      defense[1] += 1;
    } else if (n_guerrero_principiante > 0) {
      n_guerrero_principiante -= 1;
      n_guerreros -= 1;
      defense[0] += 1;
    }
  }
  return defense;
};

const combat = async (atacante, defensor, id_partida) => {
  const flujo = await orm.Flujo.findOne({ where: { id_partida } });
  // listas de tipo [0,0,0]
  let max_defense = 0;
  let max_attack = 0;
  const dados_atacante = [];
  const dados_defensor = [];
  let resultado = '';
  for (let i = 0; i < 3; i++) {
    while (atacante[i] > 0) {
      const attack = await getvalue(i);
      if (i === 0) {
        dados_atacante.push([attack, 0]);
      } else if (i === 1) {
        dados_atacante.push([attack, 1]);
      } else {
        dados_atacante.push([attack, 2]);
      }
      atacante[i] -= 1;
      if (attack > max_attack) {
        max_attack = attack;
      }
    }
    while (defensor[i] > 0) {
      const defense = await getvalue(i);
      if (i === 0) {
        dados_defensor.push([defense, 0]);
      } else if (i === 1) {
        dados_defensor.push([defense, 1]);
      } else {
        dados_defensor.push([defense, 2]);
      }
      defensor[i] -= 1;
      if (defense > max_defense) {
        max_defense = defense;
      }
    }
  }
  while (dados_atacante.length < 3) {
    dados_atacante.push([-1, 3]);
  }
  while (dados_defensor.length < 3) {
    dados_defensor.push([-1, 3]);
  }
  if (max_attack > max_defense) {
    resultado = 'atacante';
  } else {
    resultado = 'defensor';
  }
  flujo.dados_atacante = dados_atacante;
  flujo.dados_defensor = dados_defensor;
  await flujo.save();
  return resultado;
};

module.exports = {
  getdefense,
  combat,
};
