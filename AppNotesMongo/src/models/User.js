const {Schema,model} = require('mongoose');
//llmamos al modulo para encriptar contraseñas
const bcrypt = require ('bcryptjs');

const UserSchema = new Schema({
    name: {type: String,required: true},
    email: {type: String,required: true, unique: true},
    password: {type: String,required: true},
},{timestamps:true});
//podemos tratar la informacion desde aqui, podemos definir metodos

UserSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10);    //por defecto lo ejecuta 10 veces
    return await bcrypt.hash(password,salt);
};

//para el login

UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

module.exports = model('User', UserSchema);