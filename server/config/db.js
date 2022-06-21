const mongoose = require("mongoose") ;
mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("Successfully connection in to DB..."))
    .catch((err)=> console.log(err))