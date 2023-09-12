class UI{
    addActiveClass(nav,span,list){
        nav.classList.add('active')
        //
        span.forEach(active => {
            active.classList.add('active')
        })
        //
        list.forEach(active => {
            active.classList.add('active')
        })
    }
    //
    removeActiveClass(nav,span,list){
        nav.classList.remove('active')
        //
        span.forEach(active => {
            active.classList.remove('active')
        })
        //
        list.forEach(active => {
            active.classList.remove('active')
        })
    }

    //
    titleLength(title, name){
        let title_length;
        //throw a function if the title length of the movie is more than 30
        if(title.length > 30){
            title_length = `${title.substring(0,25)}...`
        } 
        //throw a function if the title length of the movie is more than 20
        else if(title.length > 20){
            title_length = `${title.substring(0,20)}...`
        } 
        //if title is not defined, replace it with name
        else if(!title){
            title_length = `${name.substring(0,20)}...`
        } 
        //throw a function if the title length of the movie is less than 30
        else {
            title_length = title
        } return title_length
    }

    //
    rating(movies){
        let noRate;
        //if vote_average = 0, return 0
        if(movies.vote_average){
            noRate = movies.vote_average
        }
        //
        else if(movies.vote_average === 0){
            noRate = 'NR'
        }
        //if vote_average is not defined, return media_type
        else if(!movies.vote_average) {
            noRate = movies.media_type
        } return noRate
    }
    //
    releaseDate(date){
        let noDate;
        //if known_for_department is defined, return known_for_department
        if(date.known_for_department){
            noDate = date.known_for_department
        } 
        //if release_date is empty or undefined, return 'no date'
        else if(date.release_date === "" || date.release_date === undefined){
            noDate = 'no date'
        } 
        //if date is defined, return date
        else {
            noDate = date.release_date
        } return noDate
    }
    //
    imgPoster(image){
        let img;
        //if [poster_path, backdrop_path] is not defined, return profile_path
        if(!image.poster_path && !image.backdrop_path){
            img = image.profile_path
        } 
        //if poster_path is defined, return poster_path
        else if(image.poster_path !== null){
            img = image.poster_path
        }
        //
        else if(image.poster_path === null || image.backdrop_path === null){
            img = 'No Image Found'
        }
        //if backdrop_path is defined, return backdrop_path
        else {
            img = image.backdrop_path
        } return img
    }
    
    //
    ImgName(film){
        let name;
        if(film.title) {
            name = film.title
        } else if(film.original_title) {
            name = film.original_title
        } else if(!film.title && !film.original_title){
            name = film.name
        }return name
    }
    //
    addUpcomingMovies(upcomingMovies){
        const results = upcomingMovies.results

        //upcoming-movies
        const upcomingMoviesHeader = document.querySelector('.upcoming-movies')

        //upcoming-movies-all
        const allUpcomingMoviesHeader = document.querySelector('.all-upcoming-movies')

        //
        let movies = ""

        //array of 5 upcoming movies
        for(let i = 0; i < (results.length - 15); i++){
            movies += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${results[i].poster_path !== null ? results[i].poster_path : results[i].backdrop_path}" alt="${results[i].title !== null ? results[i].title : results[i].original_title}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide"> ${results[i].title} </p>
                            <p> ${(results[i].title)} </p>
                        </a>
                        <div class="year-ratings">
                            <p class="date"> ${results[i].release_date} </p>
                            <p> ${results[i].vote_average !== null ? results[i].vote_average : 'NR'} </p>
                        </div>
                        <div class="hide">
                            <p class="overview"> ${results[i].overview} </p>
                            <p class="id"> ${results[i].id} </p>
                            <p class="language"> ${results[i].original_language} </p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }
        //add upcomingMovie into upcomingMoviesHeader
        if(upcomingMoviesHeader){
            upcomingMoviesHeader.innerHTML = movies
        }

        //
        let allUpcomingMovies = ""
        //array of all upcoming movies
        for(let i = 0; i < results.length; i++){
            allUpcomingMovies += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${results[i].poster_path !== null ? results[i].poster_path : results[i].backdrop_path}" alt="${results[i].title !== null ? results[i].title : results[i].original_title}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide"> ${results[i].title} </p>
                            <p> ${(results[i].title)} </p>
                        </a>
                        <div class="year-ratings">
                            <p class="date"> ${results[i].release_date} </p>
                            <p> ${results[i].vote_average !== null ? results[i].vote_average : 'NR'} </p>
                        </div>
                        <div class="hide">
                            <p class="overview"> ${results[i].overview} </p>
                            <p class="id"> ${results[i].id} </p>
                            <p class="language"> ${results[i].original_language} </p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }
        if(allUpcomingMoviesHeader){
            allUpcomingMoviesHeader.innerHTML = allUpcomingMovies
        }
    }
    //
    displayMessage(form, message, loaderFlex){
        const error = document.createElement('div')
        error.classList.add('error')
        error.innerHTML = `<p> ${message}</p>`
        //
        const searchModal = document.querySelector('.search-modal')

        form.insertBefore(error, searchModal)

        //remove error after 2 seconds
        setTimeout(() => {
            error.remove()
            //
            loaderFlex.remove()
            //
            form.reset()
        },2000)
    }
    //

    displaySearchMovies(movies){
        //
        const searchResult = document.querySelector('.search-results')

        //
        let searchMovies = ""
        for(let i = 0; i < movies.length; i++){
            searchMovies += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(movies[i])}" class="poster" alt="${this.ImgName(movies[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title"> ${movies[i].title} </p>
                            <p> ${(!movies[i].title ? movies[i].name : movies[i].title)} </p>
                        </a>
                        <div class="year-ratings">
                            <p class="date"> ${this.releaseDate(movies[i])} </p>
                            <p class="rating"> ${this.rating(movies[i])} </p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview"> ${movies[i].overview} </p>
                            <p class="id"> ${movies[i].id} </p>
                            <p class="language"> ${movies[i].original_language} </p>
                        </div>
                        <div class="hide hidden-movies">
                            ${this.personMovie(movies[i])}
                        </div>
                    </figcaption>
                </figure>
            `
        }
        // <div class="hide hidden-movies">
        //

        if(searchResult){
            // searchResult.innerHTML = loader
            searchResult.innerHTML = searchMovies

            //
            const movies_result = document.querySelectorAll('.img-slide a')
            if(movies_result){
                movies_result.forEach(result => {
                    //
                    result.setAttribute('href', './search/view.html')
                    //
                    result.addEventListener('click', e => {
                        e.preventDefault()

                        const parent = e.target.parentElement.parentElement.parentElement

                        this.getParentElement(parent)
                        
                    })
                })
            }
        }
    }
    //
    personMovie(movies){
        //
        let film = movies.known_for
        if(film){
            let html = ""
            //
            for(let i = 0; i < film.length; i++){
                html += `
                    <figure class="img-slide slides">
                        <div class="img-hover">
                            <a href="#">
                                <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(film[i])}" class="poster" alt="${this.ImgName(film[i])}"/>
                            </a>
                        </div>
                        <figcaption>
                            <a href="#">
                                <p class="hide title"> ${film[i].title} </p>
                                <p> ${(!film[i].title ? film[i].name : film[i].title)} </p>
                            </a>
                            <div class="year-ratings">
                                <p class="date"> ${this.releaseDate(film[i])} </p>
                                <p class="rating"> ${this.rating(film[i])} </p>
                            </div>
                            <div class="hide hidden-details">
                                <p class="overview"> ${film[i].overview} </p>
                                <p class="id"> ${film[i].id} </p>
                                <p class="language"> ${film[i].original_language} </p>
                            </div>
                        </figcaption>
                    </figure>
                `;
            }
            return html
        }
    }
    //
    displayPopularMovies(popularmovie){
        //display 5 of popluar movies 
        let html = ""
        for(let i = 0; i < (popularmovie.length - 15); i++){
            html += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${popularmovie[i].poster_path !== null ? popularmovie[i].poster_path : popularmovie[i].backdrop_path}" alt="${popularmovie[i].title !== null ? popularmovie[i].title : popularmovie[i].original_title}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide"> ${popularmovie[i].title} </p>
                            <p> ${(popularmovie[i].title)} </p>
                        </a>
                        <div class="year-ratings">
                            <p class="date"> ${popularmovie[i].release_date} </p>
                            <p> ${popularmovie[i].vote_average !== null ? popularmovie[i].vote_average : 'NR'} </p>
                        </div>
                        <div class="hide">
                            <p class="overview"> ${popularmovie[i].overview} </p>
                            <p class="id"> ${popularmovie[i].id} </p>
                            <p class="language"> ${popularmovie[i].original_language} </p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }
        //
        const popularHeader = document.querySelector('.popular-movies')
        if(popularHeader){
            popularHeader.innerHTML = html
        }
        //

        //display all popluar mvoies 
        let allPopluarMovies = ""
        for(let i = 0; i < popularmovie.length; i++){
            allPopluarMovies += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${popularmovie[i].poster_path !== null ? popularmovie[i].poster_path : popularmovie[i].backdrop_path}" alt="${popularmovie[i].title !== null ? popularmovie[i].title : popularmovie[i].original_title}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide"> ${popularmovie[i].title} </p>
                            <p> ${(popularmovie[i].title)} </p>
                        </a>
                        <div class="year-ratings">
                            <p class="date"> ${popularmovie[i].release_date} </p>
                            <p> ${popularmovie[i].vote_average !== null ? popularmovie[i].vote_average : 'NR'} </p>
                        </div>
                        <div class="hide">
                            <p class="overview"> ${popularmovie[i].overview} </p>
                            <p class="id"> ${popularmovie[i].id} </p>
                            <p class="language"> ${popularmovie[i].original_language} </p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }
        const popluar = document.querySelector('.all-popular-movies')
        if(popluar){
            popluar.innerHTML = allPopluarMovies
        }
    }

    //
    displayRatedMovies(rated){
        //
        const ratedMovieHeader = document.querySelector('.rated-movies')
        let html = ""

        //display 5 movies of top rated movies
        for(let i = 0; i < (rated.length - 15); i++){
            html += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${rated[i].poster_path !== null ? rated[i].poster_path : rated[i].backdrop_path}" alt="${rated[i].title !== null ? rated[i].title : rated[i].original_title}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide"> ${rated[i].title} </p>
                            <p> ${(rated[i].title)} </p>
                        </a>
                        <div class="year-ratings">
                            <p class="date"> ${rated[i].release_date} </p>
                            <p> ${rated[i].vote_average !== null ? rated[i].vote_average : 'NR'} </p>
                        </div>
                        <div class="hide">
                            <p class="overview"> ${rated[i].overview} </p>
                            <p class="id"> ${rated[i].id} </p>
                            <p class="language"> ${rated[i].original_language} </p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }
        //
        if(ratedMovieHeader){
            ratedMovieHeader.innerHTML = html
        }

        //display all the movies
        const allRatedMovieHeader = document.querySelector('.all-rated-movies')
        let ratedMovie = ""

        for(let i = 0; i < rated.length; i++){
            ratedMovie += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${rated[i].poster_path !== null ? rated[i].poster_path : rated[i].backdrop_path}" alt="${rated[i].title !== null ? rated[i].title : rated[i].original_title}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide"> ${rated[i].title} </p>
                            <p> ${(rated[i].title)} </p>
                        </a>
                        <div class="year-ratings">
                            <p class="date"> ${rated[i].release_date} </p>
                            <p> ${rated[i].vote_average !== null ? rated[i].vote_average : 'NR'} </p>
                        </div>
                        <div class="hide">
                            <p class="overview"> ${rated[i].overview} </p>
                            <p class="id"> ${rated[i].id} </p>
                            <p class="language"> ${rated[i].original_language} </p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }
        //
        if(allRatedMovieHeader){
            allRatedMovieHeader.innerHTML = ratedMovie
        }
    }
    //
    movieOne(parent){
        // let all
        if(parent.querySelectorAll('.hidden-movies figure')){
            const allMovies = parent.querySelectorAll('.hidden-movies figure')

            const movieArr = Array.from(allMovies)

            if(movieArr.length !== 0){
                movieArr.forEach(all => {
                    const getMovies = {
                        movie_one: {
                            poster: all.querySelector('.hidden-movies .img-slide:nth-child(1) img').src,
                            title: all.querySelector('.hidden-movies .img-slide:nth-child(1) .title').textContent,
                            release_date: all.querySelector('.hidden-movies .img-slide:nth-child(1) .date').textContent,
                            rating: all.querySelector('.hidden-movies .img-slide:nth-child(1) .rating').textContent,
                            overview: all.querySelector('.hidden-movies .img-slide:nth-child(1) .hidden-details .overview').textContent,
                            id: all.querySelector('.hidden-movies .img-slide:nth-child(1) .hidden-details .id').textContent,
                            language: all.querySelector('.hidden-movies .img-slide:nth-child(1) .hidden-details .language').textContent
                        },
                        movie_two: {
                            poster: all.querySelector('.hidden-movies .img-slide:nth-child(2) img').src,
                            title: all.querySelector('.hidden-movies .img-slide:nth-child(2) .title').textContent,
                            release_date: all.querySelector('.hidden-movies .img-slide:nth-child(2) .date').textContent,
                            rating: all.querySelector('.hidden-movies .img-slide:nth-child(2) .rating').textContent,
                            overview: all.querySelector('.hidden-movies .img-slide:nth-child(2) .hidden-details .overview').textContent,
                            id: all.querySelector('.hidden-movies .img-slide:nth-child(2) .hidden-details .id').textContent,
                            language: all.querySelector('.hidden-movies .img-slide:nth-child(2) .hidden-details .language').textContent
                        },
                        movie_three: {
                            poster: all.querySelector('.hidden-movies .img-slide:nth-child(3) img').src,
                            title: all.querySelector('.hidden-movies .img-slide:nth-child(3) .title').textContent,
                            release_date: all.querySelector('.hidden-movies .img-slide:nth-child(3) .date').textContent,
                            rating: all.querySelector('.hidden-movies .img-slide:nth-child(3) .rating').textContent,
                            overview: all.querySelector('.hidden-movies .img-slide:nth-child(3) .hidden-details .overview').textContent,
                            id: all.querySelector('.hidden-movies .img-slide:nth-child(3) .hidden-details .id').textContent,
                            language: all.querySelector('.hidden-movies .img-slide:nth-child(3) .hidden-details .language').textContent
                        }
                    }
                    console.log(getMovies);
                })
            }
        }
    }
    //
    getParentElement(parent){

        const getMovieDetails = {
            poster: parent.querySelector('.poster').src,
            title: parent.querySelector('.title').textContent,
            release_date: parent.querySelector('.date').textContent,
            rating: parent.querySelector('.rating').textContent,
            overview: parent.querySelector('.hidden-details .overview').textContent,
            id: parent.querySelector('.hidden-details .id').textContent,
            language: parent.querySelector('.hidden-details .language').textContent,
            moviesActed: this.movieOne(parent)
        }

        // console.log(getMovieDetails);
    }
}


// oviesActed: {
//     movie_one: {
//         poster: parent.querySelector('.hidden-movies .img-slide:nth-child(1) .poster').src,
//         title: parent.querySelector('.hidden-movies .img-slide:nth-child(1) .title').textContent,
//         release_date: parent.querySelector('.hidden-movies .img-slide:nth-child(1) .date').textContent,
//         rating: parent.querySelector('.hidden-movies .img-slide:nth-child(1) .rating').textContent,
//         overview: parent.querySelector('.hidden-movies .img-slide:nth-child(1) .hidden-details .overview').textContent,
//         id: parent.querySelector('.hidden-movies .img-slide:nth-child(1) .hidden-details .id').textContent,
//         language: parent.querySelector('.hidden-movies .img-slide:nth-child(1) .hidden-details .language').textContent
//     },
//     movie_two: {
//         poster: parent.querySelector('.hidden-movies .img-slide:nth-child(2) .poster').src,
//         title: parent.querySelector('.hidden-movies .img-slide:nth-child(2) .title').textContent,
//         release_date: parent.querySelector('.hidden-movies .img-slide:nth-child(2) .date').textContent,
//         rating: parent.querySelector('.hidden-movies .img-slide:nth-child(2) .rating').textContent,
//         overview: parent.querySelector('.hidden-movies .img-slide:nth-child(2) .hidden-details .overview').textContent,
//         id: parent.querySelector('.hidden-movies .img-slide:nth-child(2) .hidden-details .id').textContent,
//         language: parent.querySelector('.hidden-movies .img-slide:nth-child(2) .hidden-details .language').textContent
//     },
//     movie_three: {
//         poster: parent.querySelector('.hidden-movies .img-slide:nth-child(3) .poster').src,
//         title: parent.querySelector('.hidden-movies .img-slide:nth-child(3) .title').textContent,
//         release_date: parent.querySelector('.hidden-movies .img-slide:nth-child(3) .date').textContent,
//         rating: parent.querySelector('.hidden-movies .img-slide:nth-child(3) .rating').textContent,
//         overview: parent.querySelector('.hidden-movies .img-slide:nth-child(3) .hidden-details .overview').textContent,
//         id: parent.querySelector('.hidden-movies .img-slide:nth-child(3) .hidden-details .id').textContent,
//         language: parent.querySelector('.hidden-movies .img-slide:nth-child(3) .hidden-details .language').textContent
//     }
// }