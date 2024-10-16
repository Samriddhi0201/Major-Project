const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path")

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname , "views"))
const sessionOptions = {
    secret :"mysupersecretstring",
    resave : false,
    saveUninitialized : true,
}
app.use(session(sessionOptions));
app.use(flash());


app.get("/register", (req, res)=>{
    let {name = "anonymous"} = req.query;
   req.session.name = name;
   console.log(req.session.name)
  
   if(name === "anonymous"){
    req.flash("error","User not registered successfully");
   }
   else{
    req.flash("success","User registered successfully");
   }
     res.redirect("/hello");
})

app.use((req, res, next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})
app.get("/hello" , (req, res)=>{
   
    res.render("page.ejs", {name : req.session.name});
})

// app.get("/reqcount", (req, res)=>{

//     if( req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
  
//     res.send(`You sent a request ${ req.session.count} Times`)
// })

// app.get("/test", (req, res)=>{
//     res.send("test Successful !"); 
// })

app.listen(3000, ()=>{
    console.log("server is liestening to 3000")
})