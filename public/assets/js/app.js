const api = new API()
const ui = new UI()

//
const topBtn = document.querySelector('.top-btn')
const nav = document.querySelector('.navbar')
const span = Array.from(document.querySelectorAll('.site-name a span'))
const list = Array.from(document.querySelectorAll('.category ul li a'))
let searchedValue = ""
//
window.addEventListener('scroll', () => {
    if(document.documentElement.scrollTop > 50){
        ui.addActiveClass(nav,span,list)
    } else {
        ui.removeActiveClass(nav,span,list)
    }

    //add animation to scrollTop Btn
    ui.animateTopBtn(topBtn)

})

//
const movieSlideshow = document.querySelector('.movie-slideshow')
//
if(window){
    window.addEventListener('load', () => {
        //open and close menubar
        ui.openMenuBar()

        //update to current year
        ui.currentYear()

        //remove category
        ui.removeCategory()

        //trending movies
        api.trendingMovies(1)
        .then(trending_movies => {
            ui.trendingMovies(trending_movies.trending_movies);
        })
        .catch(err => {
            if(document.querySelector('.trending-movies')){
                document.querySelector('.trending-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
            if(document.querySelector('.all-trendingMovies-movies')){
                document.querySelector('.all-trendingMovies-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
        })

        //trending person
        api.trendingPerson()
        .then(trending_person => {
            ui.trendingPerson(trending_person.trending_person);
        })
        .catch(err => {
            if(document.querySelector('.person-movies')){
                document.querySelector('.person-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
            if(document.querySelector('.all-person-movies')){
                document.querySelector('.all-person-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
        })

        //trending TV
        api.trendingTv()
        .then(trending_tv => {
            ui.trendingTv(trending_tv.trending_tv);
        })
        .catch(err => {
            if(document.querySelector('.trendingTv-movies')){
                document.querySelector('.trendingTv-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
            if(document.querySelector('.all-trendingTv-movies')){
                document.querySelector('.all-trendingTv-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
        })

        
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
                                <p>${ui.titleLength(popularmovie[i].title)}</p>
                            </a>
                            <div class="year-ratings">
                                <p>${popularmovie[i].release_date.substring(0,4)}</p>
                                <p>${popularmovie[i].vote_average !== null ? popularmovie[i].vote_average : 'NR'}</p>
                            </div>
                        </figcaption>
                    </figure>
                `;
            }
            
            ui.displayPopularMovies(popularmovie)    

            //insert the fetched movies into the <movieSlideShow>
            if(movieSlideshow){
                movieSlideshow.innerHTML = html
            }
            //
        })
        .catch(err => {
            if(movieSlideshow){
                movieSlideshow.innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p> </div>`
            }
            if(document.querySelector('.upcoming-movies')){
                document.querySelector('.upcoming-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
            if(document.querySelector('.all-upcoming-movies')){
                document.querySelector('.all-upcoming-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
        })

        // function to fetch the movies from the api
        api.upcomingMovies()
        .then(upcoming => {
            const upcomingMovies = upcoming.upcoming

            ui.addUpcomingMovies(upcomingMovies)
        })
        .catch(err => {
            if(document.querySelector('.popular-movies')){
                document.querySelector('.popular-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
            if(document.querySelector('.all-popular-movies')){
                document.querySelector('.all-popular-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
        })

        // function to fetch now playing movies from the api
        api.nowPlayingMovies()
        .then(now_playing => {
            const nowPlayingMovies = now_playing.now_playing

            ui.displayNowPlayingMovies(nowPlayingMovies)
        })
        .catch(err => {
            if(document.querySelector('.now-playing-movies')){
                document.querySelector('.now-playing-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
            if(document.querySelector('.all-now-playing-movies')){
                document.querySelector('.all-now-playing-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
        })
        
        //Top Rated Movies
        api.topRatedMovie()
        .then(rated => {
            //
            ui.displayRatedMovies(rated.rated.results)
        })
        .catch(err => {
            if(document.querySelector('.rated-movies')){
                document.querySelector('.rated-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
            if(document.querySelector('.all-rated-movies')){
                document.querySelector('.all-rated-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
        })

                                                //[Tv Series]
        //Airing Today
        api.airingToday()
        .then(airing => {
            ui.displayAiringToday(airing.airing_today)
        })
        .catch(err => {
            if(document.querySelector('.airing-movies')){
                document.querySelector('.airing-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
            if(document.querySelector('.all-airing-movies')){
                document.querySelector('.all-airing-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
        })

        //On The Air
        api.tvRated()
        .then(rated => {
            ui.displayTvRated(rated.rated)
        })
        .catch(err => {
            if(document.querySelector('.tv-rated-movies')){
                document.querySelector('.tv-rated-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
            if(document.querySelector('.all-tv-rated-movies')){
                document.querySelector('.all-tv-rated-movies').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
            }
        })

        const form = document.querySelector('.search-form')
        if(form){
            form.reset()
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

                    //
                    searchedValue = search
        
                    // function to fetch the movies from the api
                    api.searchMovies(search,1)

                    //callback the fetch api
                    .then(movies => {

                        // console.log(movies);
                        //if the movie cannot be found or is not available, display 'not found message'
                        if(movies.searchedMovies.results.length === 0){
                            ui.displayMessage(form, 'details not found, be more specific', loaderFlex)
                        } else {

                            //display load more after searched button is clicked
                            const loadMoreSearchedBtn = document.querySelector('.search-btn-load')
                            if(loadMoreSearchedBtn){
                                loadMoreSearchedBtn.style.display = 'block'
                            }

                            //if the movie is available, display the movie
                            ui.displaySearchMovies(movies.searchedMovies.results)
                        }
                    })
                    .catch(err => {
                        if(document.querySelector('.search-results')){
                            document.querySelector('.search-results').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
                        }
                    })
                }
            })
        }

        //load more trending movies
        const loadMoreTrendingBtn = document.querySelector('.trending-btn-load')
        if(loadMoreTrendingBtn){
            loadMoreTrendingBtn.addEventListener('click', (e) => {
                e.preventDefault()
                ui.loadMoreTrendingMovies()
            })
        }

        //hide load more search button on window load
        const loadMoreSearchedBtn = document.querySelector('.search-btn-load')
        if(loadMoreSearchedBtn){
            loadMoreSearchedBtn.style.display = 'none'
            loadMoreSearchedBtn.addEventListener('click', (e) => {
                e.preventDefault()
                ui.loadMoreSearchedMovies(searchedValue)
            })
        }
        
    })

    //view deails of [movies || actors], view clicked searched result
    ui.view_search_details()
}
