const User = require("../models/user.js")

module.exports.renderSignupForm = async(req ,res)=>{
    try{
        let {username , email , password} = req.body;
        const newUser = new User({email, username});
        const registeredUser =  await User.register(newUser , password);
        console.log(registeredUser);
        req.login(registeredUser , (err) =>{
            if(err){
                next(err);
            }
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        });
    }
    catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};


module.exports.renderLoginForm = async(req ,res)=>{
    //console.log("welcome");
   req.flash("success" , "Welcome to Wanderlust! You are Succesfully Logged in");
   let redirectUrl = res.locals.redirectUrl || "/listings"; 
   res.redirect(redirectUrl);
};

module.exports.logout =  (req, res) =>{
    req.logout((err)=> {
        if(err){
            return next(err);
        }
        req.flash("success" , "User Logged Out!");
        res.redirect("/listings");
    })
};
