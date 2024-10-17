module.exports.isLoggedIn = (req,res , next)=>{
    //console.log(req.user);
   // console.log(req.path ,".." , req.originalUrl);
   req.session.redirectUrl = req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash("error", "You must be logged in to create listings!");
        return res.redirect("/login")
    }
    next();
};


module.exports.saveRedirectUrl =(req , res , next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;

    }
    next();
}