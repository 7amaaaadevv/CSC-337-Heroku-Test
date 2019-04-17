

const express = require("express");
const app = express();

/*----------- body parser -----------*/
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers",
	"Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const bodyParser= require('body-parser');
const jsonParser= bodyParser.json();

/*-----------------MySql------------------*/
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "mysql.allisonobourn.com", 	// hostname
	database: "csc337imdb", 			// databasename
	user: "csc337homer",				// username
	password: "d0ughnut",				// password
	debug: "true"
});
// connect to database
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

/*-----------------GET------------------*/
app.get('/', function (req, res) {
	const queryParams = req.query;
	
	con.query(queryParams.query,
		function (err, result, fields) {
			if (err) throw err;
			res.send(JSON.stringify(result))
		});
})

app.listen(process.env.PORT);