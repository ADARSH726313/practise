const express = require("express");
const bodyparser = require("body-parser");
const path = require('path');
 const app = express();
const mongoose = require("mongoose");
 
const user = "mongodb+srv://adu:adsadt123@cluster1.i7xzqtp.mongodb.net/"
mongoose.connect(user)
.then(()=>console.log("database is fine and running"))
.catch((err)=> " u have an error in database")

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))
app.use((req,res,next)=>{
    console.log("middle wire");
    next()
})

// set view engine
app.set("view engine", "ejs")

// load routers
app.use('/', require('./server/routes/router'))

// Error Handling Middleware
app.use((req, res) => {
    res.status(404).render("thanks", { mess: "Page not found" });
});


app.listen(4000, () => { console.log(`Server is running `) });