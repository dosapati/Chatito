import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import * as fs from 'fs';

import moment from 'moment'

import path from "path";

import * as builder from './bin';



// Create Express server
const app = express();



// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: "784bnkdfoi&**lkjsdlf89&(*($$%"
}));

app.use((req, res, next) => {
	//res.locals.user = req.user;
	next();
});


/**
 * Primary app routes.
 */
app.get("/", function(req,res){
	//await builder.handleFileGeneration('examples/citySearch_medium.chatito','rasa','examples/');
	res.json({"data":"Hello World from Chatito"})
});

app.get('/ping', function (req, res) {
	/*res.setHeader('Access-Control-Allow-Origin', '*');
	 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
	 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
	 res.setHeader('Access-Control-Allow-Credentials', true);*/
	res.json({
		staus: 'running in ' + process.env.node_env + " at ->" +
			moment().format("dddd, MMMM Do YYYY, h:mm:ss a"), message: ':-) (Y) (6)'
	});
});


export default app;