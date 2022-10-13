const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const notificationSchema = new Schema({
    codigo:String,
    descripcion: String,
    fecha: String,
    carga: Number,
    palanca: String,
    temperatura: Number
});

notificationSchema.set('toJSON',{
  transform:(document,returnedObject)=>{
    returnedObject.id=returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
  
const Notification = new model('Notification',notificationSchema);

module.exports = Notification;