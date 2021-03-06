// login

const getMoviesFromApi = () => {
  console.log("Se están pidiendo las películas de la app");
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch("http://localhost:4001/movies", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      return data;
    }); // Fetch para pedir todas las peliculas
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
