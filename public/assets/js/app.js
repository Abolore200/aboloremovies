const api = new API()
const ui = new UI()

//
const topBtn = document.querySelector('.top-btn')

//
const nav = document.querySelector('.navbar')
const span = Array.from(document.querySelectorAll('.site-name a span'))
const list = Array.from(document.querySelectorAll('.category ul li a'))
//
window.addEventListener('scroll', () => {
    if(document.documentElement.scrollTop > 50){
        ui.addActiveClass(nav,span,list)
    } else {
        ui.removeActiveClass(nav,span,list)
    }

    //
    if(document.documentElement.scrollTop > 200){
        topBtn.classList.add('block')
    } else {
        topBtn.classList.remove('block')
    }

})

//
const movieSlideshow = document.querySelector('.movie-slideshow')
//
if(window){
    window.addEventListener('load', () => {
        
        // function to fetch the movies from the api
        api.popularMovies()
        .then(genres => {

            //
            let loader = `
                <div class="loader-flex">
                    <div class="loader"></div>
                    <p> Loading </p>
                </div>
            `;
            
            if(movieSlideshow){
                movieSlideshow.innerHTML = loader
            }

            const popularmovie = genres.apiMovie.results

            let html = ""

            //loop the available movies
            for(let i = 0; i < (popularmovie.length - 16); i++){
                html += `
                    <figure class="img-slide slides">
                        <div class="img-hover">
                            <a href="#">
                                <img src="https://image.tmdb.org/t/p/w500/${popularmovie[i].poster_path !== null ? popularmovie[i].poster_path : popularmovie[i].backdrop_path}" alt="${popularmovie[i].title !== null ? popularmovie[i].title : popularmovie[i].original_title}"/>
                            </a>
                        </div>
                        <figcaption>
                            <a href="#">
                                <p> ${ui.titleLength(popularmovie[i].title)} </p>
                            </a>
                            <div class="year-ratings">
                                <p> ${popularmovie[i].release_date.substring(0,4)} </p>
                                <p> ${popularmovie[i].vote_average !== null ? popularmovie[i].vote_average : 'NR'} </p>
                            </div>
                        </figcaption>
                    </figure>
                `;
            }

            //
            // const popularHeader = document.querySelector('.popular-movies')
            // if(popularHeader){
                ui.displayPopularMovies(popularmovie)    
            // }
            // ui.displayPopularMovies(popularmovie)

            //insert the fetched movies into the <movieSlideShow>
            if(movieSlideshow){
                movieSlideshow.innerHTML = html
            }
            //
        })
        .catch(err => {
            if(movieSlideshow){
                movieSlideshow.innerHTML = err
            }
        })

        // function to fetch the movies from the api
        api.upcomingMovies()
        .then(upcoming => {
            const upcomingMovies = upcoming.upcoming

            ui.addUpcomingMovies(upcomingMovies)
        })
        
        //Top Rated Movies
        api.topRatedMovie()
        .then(rated => {
            //
            ui.displayRatedMovies(rated.rated.results)
        })

        const form = document.querySelector('.search-form')
        if(form){
            //if the submit is clicked, throw a funtion()
            form.addEventListener('submit', e => {
                e.preventDefault()
                
                //search input
                const search = document.querySelector('.search-input').value
                
                //if search input is empty
                if(search === ''){

                    //display a message showing 'form is empty'
                    ui.displayMessage(form, 'form is empty')

                    //
                } else {
                    //add loader to the page before it shows the result
                    const searchResult = document.querySelector('.search-results')

                    const loader = `
                        <div class="loader-flex">
                            <div class="loader"></div>
                            <p> Loading </p>
                        </div>
                    `;

                    if(searchResult){
                        searchResult.innerHTML = loader
                    }

                    //
                    const loaderFlex = document.querySelector('.loader-flex')
        
                    // function to fetch the movies from the api
                    api.searchMovies(search)

                    //callback the fetch api
                    .then(movies => {

                        console.log(movies);
                        //if the movie cannot be found or is not available, display 'not found message'
                        if(movies.searchedMovies.results.length === 0){
                            ui.displayMessage(form, 'details not found, be more specific', loaderFlex)
                        } else {
                            //if the movie is available, display the movie
                            ui.displaySearchMovies(movies.searchedMovies.results)
                        }
                    })
                }
            })
        }
    })
}
