const watchlistContainer = document.getElementById("watchlist-container")

let moviesArray = JSON.parse(localStorage.getItem('watchlist'))


function renderWatchlist(){
    let html = ''
    if(moviesArray.length !=0){    
        watchlistContainer.innerHTML = generateWatchlistHtml(moviesArray)
    }
    else{
        watchlistContainer.innerHTML = `
                                <p style="font-size: 1.125rem;">Your Watchlist looks a bit empty</p>
                            <div class="watchlist-btn-container">
                                <a href="index.html">+</a>
                                
                                <p style="font-size: 0.875rem; color: white;">Let's add some movies</p>
                            </div>
                                        `
    }
    
    
}

function generateWatchlistHtml(moviesArray){
    let html = ''
    for(let i = 0; i < moviesArray.length; i++){
            
        html += `
                <div class="movie">
                    <img src=${moviesArray[i].poster}>
                    <div class="movie-info">
                        <h2>${moviesArray[i].title} <span>⭐ ${moviesArray[i].ratings}</span></h2>
                        <div>
                            <p>${moviesArray[i].runtime}</p>
                            <p>${moviesArray[i].genre}</p>
                            <div class="watchlist-btn-container">
                                <button class="remove-btn" data-title="${moviesArray[i].title}" data-poster="${moviesArray[i].poster}" data-ratings="${moviesArray[i].ratings}" data-runtime="${moviesArray[i].runtime}" data-genre="${moviesArray[i].genre}" data-plot="${moviesArray[i].plot}">-</button>
                                
                                <p>Remove</p>
                            </div>
                        </div>
                    <p class="plot">${moviesArray[i].plot}</p>
                                
                </div>
            </div>
                        `
        }
        return html
}

watchlistContainer.addEventListener('click', function(e){
    if(e.target && e.target.classList.contains("remove-btn")){
        const title = e.target.getAttribute('data-title')
        const poster = e.target.getAttribute('data-poster')
        const ratings = e.target.getAttribute('data-ratings')
        const runtime = e.target.getAttribute('data-runtime')
        const genre = e.target.getAttribute('data-genre')
        const plot = e.target.getAttribute('data-plot')
        
        
        let movie = {
            title,
            poster,
            ratings,
            runtime,
            genre,
            plot
        }
                
        moviesArray = moviesArray.filter(movie => 
                    movie.title !== title ||
                    movie.poster !== poster ||
                    movie.ratings !== ratings ||
                    movie.runtime !== runtime ||
                    movie.genre !== genre ||
                    movie.plot !== plot
                );
                
        // Update the localStorage with the new watchlist array
        localStorage.setItem('watchlist', JSON.stringify(moviesArray)); 
        
        renderWatchlist()
    }    
})

renderWatchlist()