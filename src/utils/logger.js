//configuración para el registro de lo que pasa en mi app
const winston = require ("winston");

const configObject = require("../config/config.js");
const {node_env } = configObject;
//  Personalizar nuestros niveles (con colores para distinguir)

const niveles = {
    //lo que voy a hacer es definir que nivel quiero modificar y que color usar:
    nivel: {
        fatal:0,
        error:1,
        warning:2,//es "warn" pero puedo personalizarlo y cambiar los nombres a mi gusto
        info:3,
        http:4,
        debug:5,
    },
    colores:{
        fatal:"white",
        error:"red",
        warning:"yellow",
        info:"green",
        http:"magenta",
        debug:"blue"
    }
}

//Logger desarrollo
const loggerDesarrollo = winston.createLogger({
    levels: niveles.nivel, 
        transports: [
            new winston.transports.Console({
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({colors: niveles.colores}),
                    winston.format.simple()
                )
            })
        ]
    }
)


//Logger producción

const loggerProduccion = winston.createLogger({
    levels: niveles.nivel,
        transports: [
            new winston.transports.File({
                filename: "./errors.log",
                level:"error",
                format: winston.format.simple()
            })
        ]
    }
)


//Determinar que logger usar de acuerdo a la variable de entorno (.env)
const loggerEnv = node_env === "produccion" ? loggerProduccion:loggerDesarrollo;



//Creamos un middleware: 
const addLogger = (req, res, next) => {
    req.logger = loggerEnv; 
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
    
}

module.exports = addLogger;






//////////////////////////////////////////////////////////////////////////
// const logger = winston.createLogger({
//     levels: niveles.nivel, //busca el array niveles y los encapsula para usar en esta funcion 
//     transports: [
//         new winston.transports.Console({
//             level: "debug",
//             //trae el formato de colores
//         }),
//         //como se registra con colores en archivos? :
//         new winston.transports.File({
//             filename: "./errors.log",
//             level:"warning",
            
//         })
//     ]
// })
