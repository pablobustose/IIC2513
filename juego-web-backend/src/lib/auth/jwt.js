const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function getJWTScope(token) {
  const secret = process.env.JWT_SECRET;
  const payload = jwt.verify(token, secret);
  return payload.scope;
}

// El usuario que envìa request es de tipo 'usuario'
async function isUser(ctx, next) {
  await next();
  const token = ctx.request.header.authorization.split(' ')[1];
  const scope = getJWTScope(token);
  ctx.assert(scope.includes('user'), 403, "You're not a user");
}

// El usuario que envìa request es de tipo 'admin'
async function isAdmin(ctx, next) {
  await next();
  const token = ctx.request.header.authorization.split(' ')[1];
  const scope = getJWTScope(token);
  ctx.assert(scope.includes('admin'), 403, "You're not a admin");
}

async function isPartida(ctx, next) {
  await next();
  const token = ctx.request.header.authorization.split(' ')[1];
  const scope = getJWTScope(token);

  // Verifica que el token tenga el formato correcto y extrae el id de la partida
  const partidaRegex = /^partida(\d+)$/; // La expresión regular para el scope 'partida_{id}'
  const match = scope[1].match(partidaRegex);

  ctx.assert(match && match[1], 403, "Invalid 'partida' scope");

  // Añade el id de la partida al contexto
  ctx.body.partidaId = match[1];
}

async function isPartidaId(ctx, next) {
  await next();
  const partidaId = ctx.params.id_partida;
  const token = ctx.request.header.authorization.split(' ')[1];
  const scope = getJWTScope(token);

  // Verifica que el token tenga el formato correcto y extrae el id de la partida
  const partidaRegex = /^partida(\d+)$/; // La expresión regular para el scope 'partida_{id}'
  const match = scope[1].match(partidaRegex);

  ctx.assert(match && match[1], 403, "Invalid 'partida' scope");

  // Añade el id de la partida al contexto
  ctx.body.partidaId = match[1];

  // Verifica que el id de la partida en el contexto sea el mismo que el id de la partida en los parámetros
  ctx.assert(ctx.body.partidaId === partidaId, 403, "You don't have access to this partida");
}

module.exports = {
  isUser, isAdmin, isPartida, isPartidaId,
};
