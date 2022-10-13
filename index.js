
require('dotenv').config(); // npm install dotenv; para variables de entorno
require('./mongo');

const express = require('express');//sustituye a http
const app = express(); // npm install express
const cors = require('cors'); //npm install cors -E
const Alerta = require('./models/alertas');
const Notificacion = require('./models/notificaciones');
const NotFound = require('./middleware/NotFound');
const handleErrors = require('./middleware/handleErrors');



//Para usar body-parser y hacer un post
app.use(express.json());
app.use(cors());


app.get('/',(request,response)=>{
  response.send('<h1>Hello World</h1>');
});

app.get('/api/alertas',async (request,response)=>{
  const alertas = await Alerta.find({});
  response.json(alertas);

});

app.get('/api/notificaciones',async (request,response)=>{
  const notificaciones = await Notificacion.find({});
  response.json(notificaciones);
});

app.post('/api/alertas',async(request,response,next)=>{
  const alertaRequest = request.body;
  if(!alertaRequest || !alertaRequest.codigo || !alertaRequest.descripcion){
    response.status(400).json({
      'error':'Properties are missing'
    });
  }
  else{
    const alerta = new Alerta({
      codigo: alertaRequest.codigo,
      nombre: alertaRequest.nombre,
      fecha: alertaRequest.fecha,
      descripcion: alertaRequest.descripcion,
      temperatura: alertaRequest.temperatura,
      carga: alertaRequest.carga,
      alarma: alertaRequest.alarma
    });
    try {
      const savedAlert = await alerta.save();
      response.json(savedAlert);
    } catch (error) {
      next(error);
    }
  }
  
});

app.post('/api/notificaciones',async(request,response,next)=>{
  const notificacionRequest = request.body;
  if(!notificacionRequest || !notificacionRequest.codigo
    || !notificacionRequest.fecha || !notificacionRequest.descripcion){
    response.status(400).json({
      'error':'Properties are missing'
    });
  }else{

    const notificacion = new Notificacion({
      codigo: notificacionRequest.codigo,
      fecha: notificacionRequest.fecha,
      descripcion: notificacionRequest.descripcion,
      temperatura: notificacionRequest.temperatura,
      carga: notificacionRequest.carga,
      palanca: notificacionRequest.palanca
    });
    try {
      const savedNotification = await notificacion.save();
      response.json(savedNotification);
    } catch (error) {
      next(error);
    }
  }
  
});

app.use(NotFound);
app.use(handleErrors);

const PORT = process.env.PORT;
console.log(PORT);
const server = app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});


//module.exports = {app,server};
