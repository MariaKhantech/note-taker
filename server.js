const express = require('express');
const fs = require('fs');
const path = require('path');
//Sets up the express app and port
const app = express();
const PORT = process.env.PORT || 8080;

const dbFile = './db/db.json';

//Sets up express app to handle parsing data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Declare static folder to be served. It contains the js, images, css, etc. stack overflow
app.use(express.static('public'));

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

//GET API notes which is inside db.json
app.get('/api/notes', (req, res) => {
	fs.readFile(dbFile, (err, data) => {
		if (err) throw err;
		console.log(data);
		let notes = JSON.parse(data);
		res.json(notes);
	});
});
//Retrieving note data to save to the body and add it to the db.json file, then return to client
app.post('/api/notes', (req, res) => {
	fs.writeFile(dbFile, (err, data) => {
		if (err) throw err;
		console.log('The file has been saved!');
		let notes = JSON.parse(data);
		res.json(notes);
	});
});
//listening for server
app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
