/* principal */
require('dotenv').config();     //primero se cargan las variables de entorno

const app = require('./server');
require('./database');
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));  
})