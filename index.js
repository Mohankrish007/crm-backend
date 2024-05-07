const express = require("express");
const mongoose = require('mongoose');
const app = express();


const port = 5000


app.use(express.json());




// Database Connection
mongoose.connect("mongodb+srv://mohangarnepudi2001:AdP2OtVtXfT8TmpX@cluster0.kpdosax.mongodb.net/crm?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server running in ${port}`);
      });
})
.catch(()=>{
    console.log("Error connecting to MongoDB");
})