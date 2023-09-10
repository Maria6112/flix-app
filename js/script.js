const global = {
    currentPage: window.location.pathname //set to currentPage the path of the page

}
// console.log(global.currentPage); //to view the path of the current Page

// Display 20 most Popular Movies
async function displayPopularMovies() {
    const {results} = await fetchAPIData('movie/popular'); //to get array instead of Object, put the {}
    // console.log(results);
    //we cutted div from html 'Popular Movies' and now need to create new with js. what we cutted:
        // <div class="card">
        //   <a href="movie-details.html?id=1">
        //     <img
        //       src="images/no-image.jpg"
        //       class="card-img-top"
        //       alt="Movie Title"
        //     />
        //   </a>
        //   <div class="card-body">
        //     <h5 class="card-title">Movie Title</h5>
        //     <p class="card-text">
        //       <small class="text-muted">Release: XX/XX/XXXX</small>
        //     </p>
        //   </div>
    //what we are rebuilding:
    
    results.forEach((movie) => {
        const div = document.createElement('div'); //add div element
        div.classList.add('card'); //add class name
        div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
          
            ${//we need to check if there is a image in the movie ?if -add the image url. :else add no-image
            movie.poster_path
                ? `<img 
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
          `;
        
        document.querySelector('#popular-movies').
            appendChild(div);
    });
}

// display 20 most Poplar TV Shows
// we ccopied the function from popular movie we created and optimized for tv shows

async function displayPopularShows() {
    const {results} = await fetchAPIData('tv/popular'); //to get array instead of Object, put the {}
    
    results.forEach((show) => {
        const div = document.createElement('div'); //add div element
        div.classList.add('card'); //add class name
        div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
          
            ${//we need to check if there is a image in the movie ?if -add the image url. :else add no-image
            show.poster_path
                ? `<img 
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
          `;
        
        document.querySelector('#popular-shows').
            appendChild(div);
    });
}

// Display Movie Details
async function displayMovieDetails() {
    const movieId = window.location.search.split('=')[1];
    //window.location.search show to us the ?id=615656.
    // we need to add .split to get only number of the id
    // enter the index number to show only number
    // console.log(movieId); 

    const movie = await fetchAPIData(`movie/${movieId}`);

    //overlay for background image
    displayBackgroundImage('movie', movie.backdrop_path);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="details-top">
          <div>
            ${
            movie.poster_path
                ? `<img 
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre)=>`<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map((company)=>`<span>${company.name}</span>`).join(', ')}</div>
        </div>
    `;
    document.querySelector('#movie-details').appendChild(div);

}

// Display TV-Show Details
async function displayShowDetails() {
    const showId = window.location.search.split('=')[1];
    //window.location.search show to us the ?id=615656.
    // we need to add .split to get only number of the id
    // enter the index number to show only number
    // console.log(showId); 

    const show = await fetchAPIData(`tv/${showId}`);
    // console.log(show);
    //overlay for background image
    displayBackgroundImage('tv', show.backdrop_path);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="details-top">
          <div>
            ${
            show.poster_path
                ? `<img 
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
            }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Last Air Date: ${show.last_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre)=>`<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
            <li><span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map((company)=>`<span>${company.name}</span>`).join(', ')}</div>
        </div>
    `;
    document.querySelector('#show-details').appendChild(div);
            
}

// Display Backdrop On Detail Pages
function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';
    
    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}

// Display slider movies
async function displaySlider() {
    const { results } = await fetchAPIData('movie/now_playing'); //we get the results

    //we looped thrue forEach
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        //we cutted div from html 'swiper' and now need to create new with js.
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
                <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
          `;
        //added to the DOM
        document.querySelector('.swiper-wrapper').
            appendChild(div);
        
        initSwiper(); 
    });
}


// create the Swiper Object
//from the website: https://swiperjs.com/swiper-api#swiper-full-html-layout
function initSwiper() {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        breakpoints: {
            500: {
                slidesPerView: 2
            },
            700: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            },
        }
    });
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
    // Register in the TMDB site and get the key/link
    // notice that if you put the KEY here in the code, everyone can see it. 
    // should put it in server and get request it from there
    const API_KEY = '2d83a0f0e5d8205de71d628a2393a49b';// took this from the tmdb
    const API_URL = 'https://api.themoviedb.org/3/' // took this from the tmdb

    showSpinner();

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();

    hideSpinner(); // hide the spinner after fetching data
    return data;
    
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

//Highlight active link
function higlightActive() {
    const links = document.querySelectorAll('.nav-link');
        links.forEach((link) => { //init will run on every page
            if (link.getAttribute('href') === global.currentPage) { //let check if the link equal to the current page
                link.classList.add('active'); //add to the link 'active' class that exist in css styles
            }
        });
}

function addCommasToNumber (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//Init App
function init() {
    switch (global.currentPage) { //check which page run
        case '/': 
        case '/index.html': //we can add multiply options
            // console.log('Home');
            displaySlider();
            displayPopularMovies(); 
            break;
        case '/shows.html':
            displayPopularShows();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayShowDetails();
            break;
        case '/search.html':
            console.log('Search');
            break;
    }

    higlightActive(); //run function for Highlight active link
}

document.addEventListener('DOMContentLoaded', init);

