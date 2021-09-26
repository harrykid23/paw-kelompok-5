const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = require('./router/router.js');

// parse requests of content-type: application/json
app.use(bodyParser.json({limit: '50mb'}));

// parse requests of content-type: application/x-www-form-urlencoded (true) or 
// content-type: application/form-data (false)
app.use(bodyParser.urlencoded({extended: false, limit: '50mb', parameterLimit: 1000000}));
//IGNORE - tes commit from vscode 1
// Connect to Mongodb
mongoose.connect("mongodb://localhost:27017/kuliah_webdev")
    .then(()=>{
        router(app, mongoose);
        console.log("Terhubung dengan Mongodb");
    })
    .catch(err=>{
        console.log(err.message || "Terjadi kesalahan saat menyambungkan Mongodb");
    })

app.listen(3000, ()=>{
    console.log("Server berjalan di http://localhost:3000/");
});