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


//Init App
function init() {
    switch (global.currentPage) { //check which page run
        case '/': 
        case '/index.html': //we can add multiply options
            // console.log('Home');
            displayPopularMovies(); 
            break;
        case '/shows.html':
            displayPopularShows();
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/tv-details.html':
            console.log('TV Details');
            break;
        case '/search.html':
            console.log('Search');
            break;
    }

    higlightActive(); //run function for Highlight active link
}

document.addEventListener('DOMContentLoaded', init);

