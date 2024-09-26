//ENV based Variables
const config = require("./config.json");
const APP_ENV = process.env.REACT_APP_ENV;
console.log(APP_ENV, "APP_ENVAPP_ENVAPP_ENVAPP_ENV");
const envConfig = config[APP_ENV];

//exporting Variables
export const baseUrl = envConfig.API_BASE_URL;
