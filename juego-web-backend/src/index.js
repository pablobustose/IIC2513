const dotenv = require('dotenv');
const fs = require('fs');
const app = require('./app');
const db = require('./models');

const data = require('./action.json');
const game = require('./controllers/game.controller');

const response = {};

dotenv.config();

const PORT = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    app.listen(PORT, (err) => {
      if (err) {
        return console.error('Failed', err);
      }
      console.log(`Listening on port ${PORT}`);
      return app;
    });
  })
  .catch((err) => console.error('Unable to connect to the database:', err));
// .then(async () => {
//   if (data.action === 1) { // Reforzamiento
//     response = await game.reforzamiento(data);
//     console.log(response);
//   }
//   if (data.action === 2) { // Desplazamiento
//     response = await game.desplazamiento(data);
//     console.log(response);
//   }
//   if (data.action === 3) { // Usar Carta
//     response = await game.usar_carta(data);
//     console.log(response);
//   }
//   if (data.action === 4) { // Turno
//     response = await game.handleTurno(data);
//     console.log(response);
//   }
//   fs.writeFile('response.json', JSON.stringify(response), (error) => {
//     // throwing the error
//     // in case of a writing problem
//     if (error) {
//       // logging the error
//       console.error(error);

//       throw error;
//     }
//   });
// });
