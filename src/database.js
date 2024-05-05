const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://roxanarmoa:coderhouse@cluster0.p0ja74o.mongodb.net/E-commerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexión exitosa"))
    .catch(() => console.log("Vamos a morir, tenemos un error"))
    