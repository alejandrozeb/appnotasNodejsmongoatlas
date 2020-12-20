
const passport= require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email,password, done) =>{
    //tenemos un callback
    //aqui la logica de autenticacion

    //Match email`s user
    const user = await User.findOne({email});
    if(!user){
        return done(null,false, {message: 'Not user Found'});
    }else{
        //match password's user
        const match= await user.matchPassword(password);
        if(match){
            return done(null,user);
            //gurada el usuario en la session
        }else{
            return done(null, false, {message: 'Incorrect Password'});
        }
        //podemos añadir mas cosas como verificar que sea un correo
    }
}
));

passport.serializeUser((user,done)=>{
    done(null,user.id);
} );
//guarda en la session

passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
        done(err,user);
    });
});
//cuando navega por las paginas se verifica si esta autorizado