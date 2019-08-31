import express,{Request, Response, NextFunction, Application} from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import * as fs from 'fs';

import moment from 'moment';
import mongodb from 'mongodb';

import path from "path";

import * as builder from './bin';

const fileUpload = require('express-fileupload');
const filesystem = require('fs');


// Create Express server
const app = express();

let skil_dsl_tmp_dir = __dirname + '/skil_dsl_tmp/';

if (!filesystem.existsSync(skil_dsl_tmp_dir)){
	filesystem.mkdirSync(skil_dsl_tmp_dir);
}

// Express configuration
app.set("port", process.env.PORT || 5222);
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
app.use(fileUpload({safeFileNames: true, preserveExtension: 10, limits: {fileSize: 20 * 1024 * 1024}}));
app.use((req, res, next) => {
	//
	// res.locals.user = req.user;
	next();
});


/**
 * Primary app routes.
 */

app.post("/generate-intents-using-skil-dsl", async function(req:any,res:Response){
	//console.log(req.files.skil_dsl_input_file);
	let uniqueId = new mongodb.ObjectId().toString();
	let skil_dsl_input_file = req.files.skil_dsl_input_file;

	let interaction_file_location = skil_dsl_tmp_dir+uniqueId;
	if (!filesystem.existsSync(interaction_file_location)){
		filesystem.mkdirSync(interaction_file_location);
	}
	let dsl_file_location = interaction_file_location+'/' + uniqueId + '.chatito';
	skil_dsl_input_file.mv(dsl_file_location , async function(err:any) {
		let outputPath = 'datasets/find_restaurants1/';
		const any_error = await builder.handleFileGeneration(dsl_file_location,'rasa',outputPath);
		if(any_error){
			res.json({"status":"error",error:any_error})
		}else{
			let rasa_dataset_training = fs.readFileSync(outputPath+'rasa_dataset_training.json');
			let rasa_dataset_testing = fs.readFileSync(outputPath+'rasa_dataset_testing.json');
			res.json({"transactionId":uniqueId,"training":JSON.parse(rasa_dataset_training.toString()),testing:JSON.parse(rasa_dataset_testing.toString()),"status":"success"})
		}
	});
	//const result = await builder.handleFileGeneration1('examples/citySearch_medium.chatito');


});

app.get("/", async function(req,res){
	res.json({"status":"success"})

});

app.get('/ping', function (req, res) {
	/*res.setHeader('Access-Control-Allow-Origin', '*');
	 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
	 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
	 res.setHeader('Access-Control-Allow-Credentials', true);*/
	res.json({
		staus: 'Skil-dsl server is running in ' + process.env.node_env + " at ->" +
			moment().format("dddd, MMMM Do YYYY, h:mm:ss a"), message: ':-) (Y) (6)'
	});
});


export default app;