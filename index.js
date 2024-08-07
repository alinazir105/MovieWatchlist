const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const moviesContainer = document.getElementById("movies-container")


searchBtn.addEventListener('click', function(){
    fetch(`https://www.omdbapi.com/?apikey=bc082aea&s=${searchInput.value}`)
        .then(response => response.json())
        .then(data => {
            if(data.Search){
                extractFilmData(data.Search)
            }
            else{
                moviesContainer.innerHTML = "<p>Unable to find what you’re looking for. Please try another search.</p>"
            }
        })
})

async function extractFilmData(search){
    let html = ""
    //looping through the search array to generate a string for the inner html of movies container
    for(let i = 0; i < search.length; i++){
        
        //using the await keyword so that the fetch works as intended
       let response = await fetch(`https://www.omdbapi.com/?apikey=bc082aea&t=${search[i].Title}`)
       let data = await response.json()
                html += `
                        <div class="movie">
                            <img src=${data.Poster}>
                            <div class="movie-info">
                                <h2>${data.Title} <span>⭐ ${data.Ratings[0].Value}</span></h2>
                                <div>
                                    <p>${data.Runtime}</p>
                                    <p>${data.Genre}</p>
                                    <div class="watchlist-btn-container">
                                        <button class="watchlist-btn" data-title="${data.Title}" data-poster="${data.Poster}" data-ratings="${data.Ratings[0].Value}" data-runtime="${data.Runtime}" data-genre="${data.Genre}" data-plot="${data.Plot}" data-id = ${data.imdbID}>+</button>
                                        <p>Watchlist</p>
                                    </div>
                                </div>
                                    <p class="plot">${data.Plot}</p>
                                
                            </div>
                        </div>
                        `
    }
    moviesContainer.innerHTML = html
}

moviesContainer.addEventListener('click', function(e){
    //check if the target element exists and if it has the watchlist-btn class
    if(e.target && e.target.classList.contains('watchlist-btn')){
        
        //extracting data from the data attributes
        const title = e.target.getAttribute('data-title')
        const poster = e.target.getAttribute('data-poster')
        const ratings = e.target.getAttribute('data-ratings')
        const runtime = e.target.getAttribute('data-runtime')
        const genre = e.target.getAttribute('data-genre')
        const plot = e.target.getAttribute('data-plot')
        const id = e.target.getAttribute('data-id')
        
        let newMovie = {
            title,
            poster,
            ratings,
            runtime,
            genre,
            plot,
            id
        }
        
        // Retrieve the current watchlist from local storage
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

        // Add the new movie to the watchlist
        let movieExists = watchlist.some(movie => movie.id === id)
        
        if(!movieExists){
            watchlist.push(newMovie);

            // Save the updated watchlist back to local storage
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            
            alert(`${title} has been added to your watchlist`)
        }
        else{
            alert(`${title} has already been added to your watchlist`)
        }
    }    
})


