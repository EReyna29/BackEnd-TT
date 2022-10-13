const mongoose = require('mongoose'); //npm install mongoose

const {CADENA_CONEXION,CADENA_CONEXION_TEST,NODE_ENV} = process.env;

const connectionString = NODE_ENV==='test'
  ? CADENA_CONEXION_TEST
  : CADENA_CONEXION;

mongoose.connect(connectionString)
  .then(()=>{
    console.log('Database connected '+connectionString);
  }).catch(err=>{
    console.error(err);
  });


process.on('uncaughtException',()=>{
  mongoose.connection.disconect();
});
