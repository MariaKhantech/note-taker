const express = require('express');
const fs = require('fs');
const path = require('path');
const { resolveSoa } = require('dns');
//Sets up the express app and port
const app = express();
const PORT = process.env.PORT || 3000;
// sets absolute path of json file
const dbFile = path.join(__dirname, 'db', 'db.json');

//Sets up express app to handle parsing data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Declare static folder to be served. It contains the js, images, css, etc. stack overflow
app.use(express.static('public'));

//===============API ROUTE============//

//GET API notes which is inside db.json (READ)
app.get('/api/notes', (req, res) => {
	fs.readFile(dbFile, (err, data) => {
		if (err) throw err;
		let notes = JSON.parse(data);
		res.json(notes);
	});
});

//Retrieving note data to save to the body and add it to the db.json file, then return to client
app.post('/api/notes', (req, res) => {
	fs.readFile(dbFile, (err, data) => {
		if (err) throw err;
		let notes = JSON.parse(data);
		notes.push(req.body);
		console.log(notes);

		fs.writeFile(dbFile, JSON.stringify(notes), (err) => {
			if (err) throw err;
		});
	});
	res.sendFile(dbFile);
});

// app.delete('/api/notes', (req, res) => {
// 	fs.readFile(dbFile, (err, data) => {
// 		if (err) throw err;
// 		console.log('file has been deleted');
// 	});
// });

//================HTML ROUTES======================//
//creating HTML route for notes.html
app.get('/notes', (req, res) => {
	const file = path.join(__dirname, 'public', 'notes.html');
	res.sendFile(file);
});

//create index route for index.html
app.get('*', (req, res) => {
	const file = path.join(__dirname, 'public', 'index.html');
	res.sendFile(file);
});

//listening for server
app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
