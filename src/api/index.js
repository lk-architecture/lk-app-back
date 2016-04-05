import convexpress from "convexpress";

import * as config from "config";

const options = {
    info: {
        title: "lk-app-back",
        version: "1.0.0"
    },
    host: config.HOST
};
export default convexpress(options)
    .serveSwagger()
    .convroute(require("api/deployments/post"));
