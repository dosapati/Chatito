"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
/**
 * Error Handler. Provides full stack - remove for production
 */
///app.use(errorHandler());
/**
 * Start Express server.
 */
var server = app_1.default.listen(app_1.default.get("port"), function () {
    console.log("  App is running at http://localhost:%d in %s mode - pls check", app_1.default.get("port"), app_1.default.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
exports.default = server;
