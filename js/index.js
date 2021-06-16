import {
    getPelicula
} from './servicios.js'

const base_url_imagenes = 'https://image.tmdb.org/t/p/w500';

let loading = document.getElementById('loading');
let formBusqueda = document.getElementById('formBusqueda');
let inputBusqueda = document.getElementById('inputBusqueda');
let cardsContainer = document.getElementById('cards__container');
let resumenResultado = document.getElementById('resumenResultado')

let starLoading = () => {
    loading.style.display = 'flex'
}
let stopLoading = () => {
    loading.style.display = 'none'
}

const llenarCards = (peliculas) => {

    let cardsString = "";
    peliculas.forEach((pelicula) => {

        cardsString += `<div class="col-md-3 mt-3 d-inline-flex">
				<div class="card shadow bg-secondary">
					<img src="${base_url_imagenes}${pelicula.poster_path}" alt="" class="card-img-top" />
					<div class="card-body">
						<h4 class="card-title text-light">${pelicula.original_title}</h4>
						<p class="card-text text-light">${pelicula.overview.substr(0, 90)} ...</p>
						<p class="card-text">
							<small class="text-light">Fecha de Estreno: ${pelicula.release_date}</small>
						</p>
					</div>					
				</div>
			</div>`
    });

    cardsContainer.innerHTML = cardsString;

};

formBusqueda.onsubmit = (e) => {
    e.preventDefault();

    starLoading()
    setTimeout(() => { console.log("Tiempo demora"); }, 2000);
	
    getPelicula(inputBusqueda.value).then((rpta) => {
        if (rpta.errors) {
            resumenResultado.innerHTML = `<small class="text-warning lead">Resultados para: vacio - total 0</small>`
            Swal.fire({
                title: 'Ups!',
                text: 'Ingrese su pelicula',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            stopLoading()
        } else if (+rpta.total_results === 0) {
            resumenResultado.innerHTML = `<small class="text-warning lead">Resultados para: ${inputBusqueda.value} - total ${rpta.results.length}</small>`
            Swal.fire({
                title: 'Ups!',
                text: 'No se encontro la pelicula',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            stopLoading()

        } else {
            llenarCards(rpta.results);
            resumenResultado.innerHTML = `<small class="text-success lead">Resultados para: ${inputBusqueda.value} - total ${rpta.results.length}</small>`
            stopLoading()
        }
    })

};
