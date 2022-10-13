const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const alertSchema = new Schema({
  codigo:String,
  nombre: String,
  descripcion: String,
  fecha: String,
  carga: Number,
  temperatura: Number,
  alarma:Boolean
});

alertSchema.set('toJSON',{
  transform:(document,returnedObject)=>{
    returnedObject.id=returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
  
const Alert = new model('Alert',alertSchema);

module.exports = Alert;