const express = require('express');
const cors = require('cors');
const path = require('path');
const Database = require('better-sqlite3');
const db = new Database('./src/db/database.db', { verbose: console.log });

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4001;
server.listen(serverPort, () => {
	console.log(`Server listening at http://localhost:${serverPort}`);
});
server.get('/movie/:movieId', (req, res) => {
	console.log('URL params', req.params);
	const foundMovie = movies.find((movie) => movie.id === req.params.moviesId);
	console.log('Found movie:', foundMovie);
});

server.get('/movies', (req, res) => {
	// preparo la query
	const query = db.prepare('SELECT * FROM movies');
	// ejecuto la query para obtener todos los registros en un array
	const movies = query.all();

	/* 	const response = {
		success: true,
		movies: [
			{
				id: '1',
				title: 'Gambita de dama',
				gender: 'Drama',
				image: 'https://via.placeholder.com/150',
			},
			{
				id: '2',
				title: 'Friends',
				gender: 'Comedia',
				image: 'https://via.placeholder.com/150',
			},
		],
	}; */
	res.json({
		success: true,
		movies: movies,
	});
});
const staticServerPathWeb = './src/public-react/'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));
