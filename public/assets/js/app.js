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

const year = document.querySelector('.year')
if(year){
    year.innerHTML = new Date().getFullYear()
}

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

                ui.removeAnchorTag()
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
                    .catch(err => {
                        if(document.querySelector('.search-results')){
                            document.querySelector('.search-results').innerHTML = `<div style="text-align:center;width:100%;"><p style="color:var(--yellow);"> ${err}. Try Reloading </p></div>`
                        }
                    })
                }
            })
        }
    })

    //view deails of [movies || actors], view clicked searched result
    ui.view_search_details()
}

const category = document.querySelector('.category')
const category_ul = document.querySelector('.lists')

const openMenu = document.querySelector('#button')
openMenu.addEventListener('click', () => {
    category.classList.add('block')
    document.body.style.position = 'fixed'
})

const closeMenu = document.querySelector('#close-btn button')
closeMenu.addEventListener('click', () => {
    if(category.classList.contains('block') && document.body.style.position == 'fixed'){
        category.classList.remove('block')
        document.body.style.removeProperty('position')
    }
})

category.addEventListener('click', e => {
    if(!category_ul.contains(e.target)){
        if(category.classList.contains('block') && document.body.style.position == 'fixed'){
            category.classList.remove('block')
            document.body.style.removeProperty('position')
        }
    }
})