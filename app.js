const  express = require("express");
const app = express();
const mongoose =  require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const {isLoggedIn} =require("./middleware.js")


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js")
const { register } = require("module");


const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
async function main(){
  await mongoose.connect(MONGO_URL)
  
}

main().then(() =>{
    console.log("Connected to DB");
})
.catch((err) =>{
    console.log(err);
})


app.get("/", (req, res) =>{
   res.send("HI, I am Root")
})

// app.get("/testListing", async (req, res) =>{
//     let sampleListing = new Listing({
//         title : "My New Villa",
//         description : "By the Beach",
//         price : 1200,
//         location : "Calangute, Goa",
//         country : "India" 
//     }); 
//     await  sampleListing.save();
//     console.log("Sample was Saved");
//     res.send("Successful Testing");
// })

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname , "/public")));


const sessionOptions = {
    secret :"mysupersecretstring",
    resave : false,
    saveUninitialized : true,
    cookie :{
        expires : Date.now() + 1000 * 60 * 60 *24 * 7,
        maxAge : 1000 * 60 * 60 * 24 * 7,
        httpOnly : true 
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res , next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    //console.log( res.locals.success);
    next();
})

// app.get("/demouser", async (req,res) =>{
//     let fakeUser = new User({
//         email : "Student@gmail.com",
//         username : "Delta Student",
//     });
//     let registeredUser= await User.register(fakeUser, "Hello World!")
//     res.send(registeredUser)
// })
//listings
app.use("/listings",listingRouter);

//Reviews
app.use("/listings/:id/reviews", reviewRouter);

//User
app.use("/",userRouter);



//Cookies

// app.get("/getcookies" , (req, res) =>{
//     res.cookie("greet","Namaste");
//     res.cookie("madein" , "India");
//     res.send("sent you cookies!")
// })
// app.get("/greet", (req , res)=>{
//     let {name ="anonymous"} = req.cookies;
//     res.send(`Hi , {name}`);
// })

app.all("*", (req, res , next)=>{
    next(new ExpressError(404, "Page Not Found!"))
})

app.use((err, req, res , next)=>{
    let { statusCode= 500, message="Something went wrong"} = err;
    res.status(statusCode).render("error.ejs" , { err })
   //res.status(statusCode).send(message);
})
app.listen(8080 , ()=>{
    console.log("Server is Listening to Port 8080.");
});


