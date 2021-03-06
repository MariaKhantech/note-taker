const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { request } = require('http');

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
		//adding id on to notes
		let enteredNote = req.body;
		//uuidv4 installed package that gives a random id to an entered note
		enteredNote.id = uuidv4();
		//adding a new note into the array of notes
		notes.push(enteredNote);
		//writing onto the dbfile and taking parse converting it to back stringy 
		fs.writeFile(dbFile, JSON.stringify(notes), (err) => {
			if (err) throw err;
		});
	});
	res.sendFile(dbFile);
});

//deleting saved notes
app.delete('/api/notes/:id', (req, res) => {
	fs.readFile(dbFile, (err, data) => {
		if (err) throw err;
		let notesArray = JSON.parse(data);
		//filtering out the deleted note to create a new array that does not include the deleted note
		let newFilteredArray = notesArray.filter((note) => {
			return note.id != req.params.id
		
		});
		//take the updated array and write to file 
		fs.writeFile(dbFile, JSON.stringify(newFilteredArray), (err) => {
			if (err) throw err;
		});
	});
	res.sendFile(dbFile);
});

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
