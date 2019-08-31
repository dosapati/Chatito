"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var compression_1 = require("compression"); // compresses requests
var express_session_1 = require("express-session");
var body_parser_1 = require("body-parser");
var moment_1 = require("moment");
var path_1 = require("path");
// Create Express server
var app = express_1.default();
// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_session_1.default({
    resave: true,
    saveUninitialized: true,
    secret: "784bnkdfoi&**lkjsdlf89&(*($$%"
}));
app.use(function (req, res, next) {
    //res.locals.user = req.user;
    next();
});
/**
 * Primary app routes.
 */
app.get("/", function (req, res) {
    //await builder.handleFileGeneration('examples/citySearch_medium.chatito','rasa','examples/');
    res.json({ "data": "Hello World from Chatito" });
});
app.get('/ping', function (req, res) {
    /*res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
     res.setHeader('Access-Control-Allow-Credentials', true);*/
    res.json({
        staus: 'running in ' + process.env.node_env + " at ->" +
            moment_1.default().format("dddd, MMMM Do YYYY, h:mm:ss a"), message: ':-) (Y) (6)'
    });
});
exports.default = app;
