const dotenv = require("dotenv");
dotenv.config();

const { env } = process;

exports.CONNECTION_STRING = env.CONNECTION_STRING;
exports.CONNECTION_STRING_PLAYGROUND = env.CONNECTION_STRING_PLAYGROUND;
