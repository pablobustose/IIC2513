const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const orm = require('../models');

dotenv.config();

const signup = async (ctx) => {
  let user;
  const authInfo = ctx.request.body;
  console.log(authInfo);
  const usermail = await ctx.orm.Usuario.findOne({ where: { mail: authInfo.mail } });
  if (usermail) { // Evita que el usuario ya exista
    ctx.body = `The user by the email '${authInfo.mail}' already exists`;
    ctx.status = 400;
    return { body: ctx.body, status: ctx.status };
  }
  const username = await ctx.orm.Usuario.findOne({ where: { nombre_usuario: authInfo.nombre_usuario } });
  if (username) { // Evita que el usuario ya exista
    ctx.body = `The user by the name '${authInfo.nombre_usuario}' already exists`;
    ctx.status = 400;
    return { body: ctx.body, status: ctx.status };
  }
  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(authInfo.contrasena, saltRounds);

    if (authInfo.contrasena.length < 4 || authInfo.contrasena.length > 15) {
      ctx.body = 'La contraseña debe tener entre 4 y 15 caracteres';
      ctx.status = 400;
      return { body: ctx.body, status: ctx.status };
    }
    if (authInfo.nombre_usuario.length < 4 || authInfo.nombre_usuario.length > 15) {
      ctx.body = 'El nombre de usuario debe tener entre 4 y 15 caracteres';
      ctx.status = 400;
      return { body: ctx.body, status: ctx.status };
    }

    user = await ctx.orm.Usuario.create({
      nombre_usuario: authInfo.nombre_usuario,
      contrasena: hashPassword,
      mail: authInfo.mail,
    });
  } catch (error) {
    // console.log(error);
    ctx.body = error.message;
    ctx.status = 400;
    return { body: ctx.body, status: ctx.status };
  }
  ctx.body = {
    nombre_usuario: user.nombre_usuario,
    mail: user.mail,
  };
  ctx.status = 201;
  return { body: ctx.body, status: ctx.status };
};

const login = async (ctx) => {
  let user;
  let token;
  const authInfo = ctx.request.body;
  try {
    user = await ctx.orm.Usuario.findOne({ where: { mail: authInfo.mail } });
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    return { body: ctx.body, status: ctx.status };
  }
  if (!user) {
    ctx.body = `The user by the email '${authInfo.mail}' was not found`;
    ctx.status = 400;
    return { body: ctx.body, status: ctx.status };
  }
  console.log(user.contrasena);
  console.log(authInfo.contrasena);

  const validation = await bcrypt.compare(authInfo.contrasena, user.contrasena);
  if (!validation) {
    ctx.body = 'Incorrect password';
    ctx.status = 400;
    return { body: ctx.body, status: ctx.status };
  }
  // Creamos el JWT. Si quisieras agregar distintos scopes, como por ejemplo
  // "admin", podrían hacer un llamado a la base de datos y cambiar el payload
  // en base a eso.
  const expirationSeconds = 1 * 60 * 60 * 24;
  const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
  if (user.mail === 'admin@gmail.com') {
    token = jwt.sign(
      { scope: ['admin'] },
      JWT_PRIVATE_KEY,
      { subject: user.id.toString() },
      { expiresIn: expirationSeconds },
    );
  } else {
    token = jwt.sign(
      { scope: ['user'] },
      JWT_PRIVATE_KEY,
      { subject: user.id.toString() },
      { expiresIn: expirationSeconds },
    );
  }
  ctx.body = {
    user_id: user.id,
    access_token: token,
    token_type: 'Bearer',
    expires_in: expirationSeconds,
  };
  ctx.status = 200;
  return { body: ctx.body, status: ctx.status };
};

const getTokenUser = async (ctx) => {
  try {
    const expirationSeconds = 1 * 60 * 60 * 24;
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
    const token = jwt.sign(
      { scope: ['user'] },
      JWT_PRIVATE_KEY,
      { expiresIn: expirationSeconds },
    );
    ctx.body = {
      access_token: token,
      token_type: 'Bearer',
      expires_in: expirationSeconds,
    };
    ctx.status = 200;
    return { body: ctx.body, status: ctx.status };
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    return { body: ctx.body, status: ctx.status };
  }
};

module.exports = {
  signup,
  login,
  getTokenUser,
};
