const dotenv = require("dotenv");
const program = require ("../utils/commander.js");

program.parse(process.argv);

dotenv.config({ path: ".env.produccion" });

const configObject = {
    puerto: process.env.PUERTO,
    mongo_url: process.env.MONGO_URL
}

module.exports = configObject;
