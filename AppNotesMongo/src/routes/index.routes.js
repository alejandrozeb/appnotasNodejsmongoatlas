const {Router} = require('express');
const router = Router();
//iportamos los controlaores

const {renderIndex,renderAbout} = require('../controllers/index.controller');

router.get('/', renderIndex);
router.get('/about', renderAbout);


/* router.get('/',(req,res) => {
    res.render('index');
});

router.get('/about',(req,res) => {
    res.render('about');
}); */

module.exports = router;