const dotenv = require("dotenv");
dotenv.config();

const { env } = process;

exports.CONNECTION_STRING = env.CONNECTION_STRING;
