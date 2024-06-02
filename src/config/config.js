const dotenv = require("dotenv");
const program = require ("../utils/commander.js");

program.parse(process.argv);

dotenv.config({ path: ".env.desarrollo" });

const configObject = {
    puerto: process.env.PUERTO,
    mongo_url: process.env.MONGO_URL
}

module.exports = configObject;
