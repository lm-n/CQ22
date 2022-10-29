let express = require("express");
let logger = require('morgan');
let {google} = require('googleapis');
let Request = require('request');

let studio = {};
let studioCD = {};

//Create an 'express' object
let app = express();

//Some Middleware - log requests to the terminal console
app.use(logger('dev'));

//Set up the views directory
app.set("views", __dirname + '/views');
//Set EJS as templating language WITH html as an extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Add connection to the public folder for css & js files
app.use(express.static(__dirname + '/public'));

/*-----
ROUTES
-----*/

//Main Page Route - NO data
app.get("/", function(req, res){
	res.render('index');
});

app.get("/2020", function(req, res){
	res.render('index2020');
});

app.get("/2021cd", function(req, res){
	res.render('index2021cd');
});


//JSON Serving route
app.get("/api/:studio", async (req, res) => {
	//CORS enable this route - http://enable-cors.org/server.html
	res.header('Access-Control-Allow-Origin', "*");

	//prep DB
	const auth = new google.auth.GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});
	const client = await auth.getClient();
	const googleSheets = google.sheets({version: "v4", auth: client});
	const spreadsheetId = "1Q6Xwc8qN4YWpvtmpiBl-HxWF7EZAyrksAC5SULgimZc";

	//Read DB
	const getRows = await googleSheets.spreadsheets.values.get({
	    auth,
	    spreadsheetId,
	    range: "Sheet1",
	});
	let myData = getRows.data.values;
	const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
	//Get Studio Data
	let studioId = req.params.studio;
	//res.json(requestStudio(studioId,studio));
	let studioArray = [];
	let requestURL = 'https://api.scratch.mit.edu/studios/' + studioId + '/projects';
	Request(requestURL, async (error, response, body) => {
		if (!error && response.statusCode == 200) {
			let theData = JSON.parse(body);
			//console.log(theData);
			//for coded quilts only
			for (let x = theData.length - 1; x >= 0; x--) {
				let projectNumber = theData[x].id
				let project = [projectNumber.toString(),theData[x].title];
				studioArray.push(project);
			}
			let newdata = [];
			for (var z = studioArray.length - 1; z >= 0; z--) {
				let include = true;
				for (var i = myData.length - 1; i >= 0; i--) {
					if (equals(studioArray[z],myData[i])==true){
						include = false;
					}
				}
				if (include == true){
					newdata.push(studioArray[z]);
				}
			}
			// Write new data to sheet
			await googleSheets.spreadsheets.values.append({
			    auth,
			    spreadsheetId,
			    range: "Sheet1!A:B",
			    valueInputOption: "RAW",
			    resource: {
			      	values: newdata,
			    },
			});
			const getDB = await googleSheets.spreadsheets.values.get({
			    auth,
			    spreadsheetId,
			    range: "Sheet1",
			});
			res.json(getDB.data.values);
		}
	});
});

app.get("/apicd/:studio", function(req, res){
	//CORS enable this route - http://enable-cors.org/server.html
	res.header('Access-Control-Allow-Origin', "*");
	let studioId = req.params.studio;
	//res.json(requestStudio(studioId,studioCD));
	let requestURL = 'https://api.scratch.mit.edu/studios/' + studioId + '/projects';
	Request(requestURL, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let theData = JSON.parse(body);
			//for coded quilts only
			for (let x = theData.length - 1; x >= 0; x--) {
				if (!studio[theData[x].id]) {
					studio[theData[x].id] = theData[x].title;
				}
			}
			//console.log('studio includes:')
			//console.log(myStudio);
			//send all the data
			res.json(studio);
		}
	});
});

app.get("/api20/:studio", function(req, res){
	//CORS enable this route - http://enable-cors.org/server.html
	res.header('Access-Control-Allow-Origin', "*");
	let studioId = req.params.studio;
	//res.json(requestStudio(studioId,studio20));

	let requestURL = 'https://api.scratch.mit.edu/studios/' + studioId + '/projects?limit=40';
	Request(requestURL, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let theData = JSON.parse(body);
			//for coded quilts only
			for (let x = theData.length - 1; x >= 0; x--) {
				if (!studio20[theData[x].id]) {
					studio20[theData[x].id] = theData[x].title;
				}
			}
			//console.log('studio includes:')
			//console.log(myStudio20);
			//send all the data
			res.json(studio20);
		}
	});
});

app.get("/image/:projectId", function(req, res){
	//CORS enable this route - http://enable-cors.org/server.html
	res.header('Access-Control-Allow-Origin', "*");
	let projectId = req.params.projectId;
	let requestURL = 'https://uploads.scratch.mit.edu/projects/thumbnails/'+ projectId;
	Request(requestURL, {encoding:'binary'}, function (error, response) {
		if (response !== undefined){
			res.writeHead(200, {'Content-Type': 'image/png', 'Cache-Control': 'no-cache' });
			res.end(response.body, 'binary');
		}
	});
});

//Catch All Route
app.get("*", function(req, res){
	res.send('Sorry, nothing doing here.');
});

// export 'app'
module.exports = app