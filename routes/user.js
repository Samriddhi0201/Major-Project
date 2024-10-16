const express = require("express");
const router = express.Router();
const User = require("../models/user.js")
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport")

//Signup

router.get("/signup", (req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async(req ,res)=>{
    try{
        let {username , email , password} = req.body;
        const newUser = new User({email, username});
        const registeredUser =  await User.register(newUser , password);
        console.log(registeredUser);
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/listings");
    }
    catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

//Login User

router.get("/login", (req,res)=>{
    res.render("users/login.ejs");
});


router.post("/login", passport.authenticate("local" , {failureRedirect : "/login", failureFlash : true}) ,async(req ,res)=>{
    //console.log("welcome");
   req.flash("success" , "Welcome to Wanderlust! You are Succesfully Logged in");
   res.redirect("/listings")
});


//Logout User
 
router.get("/logout" , (req, res) =>{
    req.logout((err)=> {
        if(err){
            return next(err);
        }
        req.flash("success" , "User Logged Out!");
        res.redirect("/listings");
    })
})

module.exports =router;
