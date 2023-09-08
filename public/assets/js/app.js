const api = new API()
const ui = new UI()

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
})
//
const movieSlideshow = document.querySelector('.movie-slideshow')
//
if(window){
    window.addEventListener('load', () => {
        //
        api.popularMovies()
        .then(genres => {
            const popularmovie = genres.apiMovie.results

            let html = ""
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
            if(movieSlideshow){
                movieSlideshow.innerHTML = html
            }
            //
        })
        //
        api.upcomingMovies()
        .then(upcoming => {
            const upcomingMovies = upcoming.upcoming

            ui.addUpcomingMovies(upcomingMovies)
        })
        // .catch(err => {
        //     alert(err)
        // })

        const form = document.querySelector('.search-form')

        if(form){
            form.addEventListener('submit', e => {
                e.preventDefault()
                
                //search input
                const search = document.querySelector('.search-input').value
                //
                const searchs = document.querySelector('.search-input')

                //if search input is empty
                if(search === ''){
                    //
                    ui.displayMessage(form, 'form is empty')

                    //
                } else {
                    api.searchMovies(search)
                    .then(movies => {
                        console.log(movies);
                        //
                        if(movies.searchedMovies.results.length === 0){
                            ui.displayMessage(form, 'details not found, be more specific')
                        } else {
                            ui.displaySearchMovies(movies.searchedMovies.results)
                        }
                    })
                    
                    // form.reset()
                }
            })
        }
    })
}