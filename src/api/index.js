import convexpress from "convexpress";

import * as config from "config";

const options = {
    info: {
        title: "lk-app-back",
        version: "1.0.2"
    },
    host: config.HOST
};

export default convexpress(options)
    .serveSwagger()
    .convroute(require("api/buckets/post"))
    .convroute(require("api/deployments/post"));
