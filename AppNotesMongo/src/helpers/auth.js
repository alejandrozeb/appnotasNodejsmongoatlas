const helpers= {};

helpers.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){//es una funcion de passport
        return next();
    }
    req.flash('error_msg', 'Not authorized');
    res.redirect('/users/signin');
}

module.exports = helpers;