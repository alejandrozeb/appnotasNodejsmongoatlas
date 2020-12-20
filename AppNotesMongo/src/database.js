/* codigo de moongosee */
const mongoose = require('mongoose');

/* const NOTES_APP_MONGODB_HOST= process.env.NOTES_APP_MONGODB_HOST;
const NOTES_APP_MONGODB_DATABASE= process.env.NOTES_APP_MONGODB_DATABASE; */
//con destructuring
const {NOTES_APP_MONGODB_HOST,NOTES_APP_MONGODB_DATABASE} = process.env;

/* const MONGODB_URI=`mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`; */
//conetndo con mongo db atlas
const MONGODB_URI=`mongodb+srv://alejandro:alejandro3@cluster0.7xxfx.mongodb.net/notes-app?retryWrites=true&w=majority`;
mongoose.connect(MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(db => console.log('database is connected'))
    .catch(err => console.log(err))