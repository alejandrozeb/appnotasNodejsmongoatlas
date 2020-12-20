/* codigo express */
const express = require('express');
//importando el motor de plantilla
const exphbs = require('express-handlebars');
const path = require('path');
const router = require('./routes/index.routes');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
//initializations
const app = express();
require('./config/passport');
//settings  configuras las dependencias de express
app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));//importando el motor de plantilla
app.set('view engine', '.hbs');//definimos  a handlebars como nuestro motor de plantilla
//middlewares funcionies previas------------------------------
app.use(express.urlencoded({extended: false})); //todos llso datos de formularios llegan en formato json
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave:true,
    saveUninitialized: true
}));
//debe ir despues de session se basa en ese modulo
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//global variables----------------------
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;//pasasmos la variable de usuario a una global si no esta tenemos null
    next();
});

//routes-------------
app.use(require('./routes/index.routes'));    // desde ahora usaremos un archivo diferente para definir las rutas
app.use(require('./routes/notes.routes'));//reconoce las rutas de notes 
app.use(require('./routes/users.routes'));
/* app.get('/', (req,res)=>{
    res.render('index');
    //res.send('hello world');
}); */
//static files-----------------
app.use(express.static(path.join(__dirname, 'public')));    //con static indicamos que son archivos publicos


module.exports = app;