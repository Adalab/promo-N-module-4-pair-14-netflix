const express = require("express");
const cors = require("cors");
const path = require("path");
const Database = require("better-sqlite3");
const db = new Database("./src/db/database.db", { verbose: console.log });

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4001;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
server.get("/movie/:movieId", (req, res) => {
  console.log("URL params", req.params);
  const foundMovie = movies.find((movie) => movie.id === req.params.moviesId);
  console.log("Found movie:", foundMovie);
}); //Esto es para encontrar una pelicula

server.get("/movies", (req, res) => {
  // preparo la query
  const query = db.prepare("SELECT * FROM movies");
  // ejecuto la query para obtener todos los registros en un array
  const movies = query.all(); //Esto es para que nos de todas las peliculas

  res.json({
    success: true,
    movies: movies,
  });
});
//Para añadir un usuario con el POST (crear) en el back
server.post("/signup", (req, res) => {
  const query = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
  const result = query.run(req.body.email, req.body.password);
  console.log(result);
  res.json(result);
});
//Para pedir las peliculas de una usuaria en el back
server.get("/user/movies", (req, res) => {
  const movieIdsQuery = db.prepare(
    "SELECT movieId FROM rel_movies_users WHERE userId = ?"
  );
  const movieIds = movieIdsQuery.all(req.header("user-id")); //Esto para traer las peliculas favoritas

  console.log(movieIds);
  res.json({
    success: true,
    movies: [],
  });
});

const staticServerPathWeb = "./src/public-react/"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb)); //Servidor estatico
