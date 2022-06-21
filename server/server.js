const express = require("express") ;
const cors = require("cors") ;

require('dotenv').config({path : "./config/.env"}) ;
require("./config/db") ;

const authRoutes = require("./routes/auth/auth.routes")
const app = express() ;

app.use(cors()) ;
app.use(express.json());

//http://localhost:5000/api/v1/auth/*
app.use("/api/v1/auth", authRoutes);


app.listen(process.env.PORT, ()=>
console.log(`server is running on port ${process.env.PORT}...`)
)