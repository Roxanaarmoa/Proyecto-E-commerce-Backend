const { Command } = require ("commander");
const program = new Command();

program 
    .option("-p <port>", "puerto en donde se inicia el servidor", 8080) //primer argumento configurado
    .option("--mode <mode>", "modo de trabajo", "produccion")//segundo argumento
program.parse();

module.exports = program;