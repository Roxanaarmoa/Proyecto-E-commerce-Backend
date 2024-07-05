const express = require("express");
const app = express();

const exphbs = require("express-handlebars");
const session = require("express-session");
const configObject = require ("./config/config.js");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const cors = require("cors");
const path = require('path');

const { puerto } = configObject;
require("./database.js");


const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");
const addLogger = require("./utils/logger.js");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(addLogger);
app.use(cors());

//Passport 
app.use(passport.initialize());
initializePassport();
app.use(cookieParser());

//AuthMiddleware
const authMiddleware = require("./middleware/authmiddleware.js");
app.use(authMiddleware);


//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Ruta para testear winston:
app.get("/loggertest", (req,res) => {
    req.logger.http("mensaje HTTP");
    req.logger.info("mensaje INFO");
    req.logger.warning("mensaje WARNING");
    req.logger.error("mensaje ERROR");
    
    res.send("logs generados")
})

//Rutas: 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/", viewsRouter);



//PUERTO
const httpServer = app.listen(puerto, () => {
    console.log(`Escuchando en el puerto http://localhost:${puerto}`);
});

///Websockets: 
const SocketManager = require("./sockets/socketmanager.js");
new SocketManager(httpServer);
