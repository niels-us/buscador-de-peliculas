// https://api.themoviedb.org/3/search/movie?
// api_key=52c832be6cdada05b91339752d94e230
// &language=es-ES
// &query=forest
// &include_adult=false

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = '52c832be6cdada05b91339752d94e230';

export const getPelicula = async (pelicula) => {
    const endpoint = `${BASE_URL}?&api_key=${API_KEY}&language=es-ES&query=${pelicula}&include_adult=false`
    // console.log(endpoint);
    // console.log(endpoint);
    const response = await fetch(endpoint);
    const rpta = await response.json();
    // console.log(rpta);
    return rpta;
};