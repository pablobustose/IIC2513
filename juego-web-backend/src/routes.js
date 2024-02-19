const Router = require('koa-router');
// Importar otros modulos
const dotenv = require('dotenv');
const jwtMiddleware = require('koa-jwt');
const users = require('./routes/users');
const flujo = require('./routes/flujo');
const authRoutes = require('./routes/authentication');
const scopeProtectedRoutes = require('./routes/scopeExample');
const game = require('./routes/game');
const pregame = require('./routes/pregame');
const admin = require('./routes/admin');
const postgame = require('./routes/postgame');
const historial = require('./routes/historial');

dotenv.config();

const router = new Router();

router.use(authRoutes.routes());

router.use('/users', users.routes());
router.use('/game', game.routes());
router.use('/pregame', pregame.routes());
router.use('/flujo', flujo.routes());
router.use('/admin', admin.routes());
router.use('/postgame', postgame.routes());
router.use('/historial', historial.routes());

// Desde esta línea, todas las rutas requieriran un JWT. Esto no aplica para
// las líneas anteriores
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }));

router.use('/scope-example', scopeProtectedRoutes.routes());

module.exports = router;
