require('dotenv').config();
const app = require('./app');
const db = require('./helpers/mongoose');

const PORT = process.env.PORT || 3000;

db.connect().then(() => {
  console.log('\x1b[1;30;42m Connected to DB \x1b[0m');
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}).catch((err) => {
  console.error(`\x1b[1;37;41m DB Error: ${err.message} \x1b[0m`);
});


//mongodb+srv://arzoogoyal87:parsepassword@mycluster.4rdpd.mongodb.net/spontom?retryWrites=true&w=majority