const mongoose = require("mongoose");

mongoose.connect(":)")
    .then(() => console.log("Conexión exitosa"))
    .catch(() => console.log("Error del servidor"))
    