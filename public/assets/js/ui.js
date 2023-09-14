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
        else if(date.release_date === "" || date.first_air_date === ""){
            noDate = 'no date'
        } 
        //if date is defined, return date 
        else if(!date.release_date){
            noDate = date.first_air_date
        }
        else {
            noDate = date.release_date
        }
        return noDate
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

    overview(overview){
        let over_view;
        if(overview.overview){
            over_view = overview.overview
        } else if(!overview.overview){
            over_view = 'No Overview'
        } return over_view
    }

    //

    language(language){
        let main_lanuage;
        if(language.original_language){
            main_lanuage = language.original_language
        } else if(!language.original_language){
            main_lanuage = ''
        } return main_lanuage
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
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(results[i])}" class="poster" alt="${this.ImgName(results[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${results[i].title}</p>
                            <p class="original-title">${(!results[i].title ? results[i].name : results[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(results[i])}</p>
                            <p class="rating">${this.rating(results[i])}</p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(results[i])}</p>
                            <p class="id">${results[i].id}</p>
                            <p class="language">${this.language(results[i])}</p>
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
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(results[i])}" class="poster" alt="${this.ImgName(results[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${results[i].title}</p>
                            <p class="original-title">${(!results[i].title ? results[i].name : results[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(results[i])}</p>
                            <p class="rating">${this.rating(results[i])}</p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(results[i])}</p>
                            <p class="id">${results[i].id}</p>
                            <p class="language">${this.language(results[i])}</p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }
        if(allUpcomingMoviesHeader){
            allUpcomingMoviesHeader.innerHTML = allUpcomingMovies

            const movies_result = document.querySelectorAll('.img-slide a')
            if(movies_result){
                movies_result.forEach(result => {
                    result.setAttribute('href', '../view.html')
                    result.addEventListener('click', e => {
                        e.preventDefault()
                        const parent = e.target.parentElement.parentElement.parentElement
                        this.getParentElement(parent)
                        
                        if(JSON.parse(sessionStorage.getItem('movie'))){
                            this.storage()
                        }
                    })
                })
            }
        }
    }
    //
    displayMessage(form, message, loaderFlex){
        //
        const error_header = document.querySelector('.error-header')
        let error = `
            <div class="error">
                <p>${message}</p>
            </div>
        `;
        error_header.innerHTML = error

        //remove error after 2 seconds
        setTimeout(() => {
            if(error_header){
                error_header.innerHTML = ""
            }
            if(loaderFlex){
                loaderFlex.remove()
            }
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
                            <p class="hide title">${movies[i].title}</p>
                            <p class="original-title">${(!movies[i].title ? movies[i].name : movies[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(movies[i])}</p>
                            <p class="rating">${this.rating(movies[i])}</p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(movies[i])}</p>
                            <p class="id">${movies[i].id}</p>
                            <p class="language">${this.language(movies[i])}</p>
                        </div>
                        <div class="hide hidden-movies">
                            ${this.personMovie(movies[i])}
                        </div>
                    </figcaption>
                </figure>
            `
        }
        //

        if(searchResult){
            // searchResult.innerHTML = loader
            searchResult.innerHTML = searchMovies

            //
            const movies_result = document.querySelectorAll('.img-slide a')
            if(movies_result){
                movies_result.forEach(result => {
                    result.setAttribute('href', './search/view.html')
                    result.addEventListener('click', e => {
                        // e.preventDefault()
                        const parent = e.target.parentElement.parentElement.parentElement
                        this.getParentElement(parent)
                
                        if(JSON.parse(sessionStorage.getItem('movie'))){
                            this.storage()
                        }
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
                                <p class="hide title">${film[i].title}</p>
                                <p class="original-title">${(!film[i].title ? film[i].name : film[i].title)}</p>
                            </a>
                            <div class="year-ratings">
                                <p class="date">${this.releaseDate(film[i])}</p>
                                <p class="rating">${this.rating(film[i])}</p>
                            </div>
                            <div class="hide hidden-details">
                                <p class="overview">${this.overview(film[i])}</p>
                                <p class="id">${film[i].id}</p>
                                <p class="language">${film[i].original_language ? film[i].original_language : ''}</p>
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
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(popularmovie[i])}" class="poster" alt="${this.ImgName(popularmovie[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${popularmovie[i].title}</p>
                            <p class="original-title">${(!popularmovie[i].title ? popularmovie[i].name : popularmovie[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(popularmovie[i])}</p>
                            <p class="rating">${this.rating(popularmovie[i])}</p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(popularmovie[i])}</p>
                            <p class="id">${popularmovie[i].id}</p>
                            <p class="language">${this.language(popularmovie[i])}</p>
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
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(popularmovie[i])}" class="poster" alt="${this.ImgName(popularmovie[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${popularmovie[i].title}</p>
                            <p class="original-title">${(!popularmovie[i].title ? popularmovie[i].name : popularmovie[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(popularmovie[i])}</p>
                            <p class="rating">${this.rating(popularmovie[i])}</p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(popularmovie[i])}</p>
                            <p class="id">${popularmovie[i].id}</p>
                            <p class="language">${this.language(popularmovie[i])}</p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }
        const popluar = document.querySelector('.all-popular-movies')
        if(popluar){
            popluar.innerHTML = allPopluarMovies

            const movies_result = document.querySelectorAll('.img-slide a')
            if(movies_result){
                movies_result.forEach(result => {
                    result.setAttribute('href', '../view.html')
                    result.addEventListener('click', e => {
                        // e.preventDefault()
                        const parent = e.target.parentElement.parentElement.parentElement
                        this.getParentElement(parent)
                
                        if(JSON.parse(sessionStorage.getItem('movie'))){
                            this.storage()
                        }
                    })
                })
            }
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
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(rated[i])}" class="poster" alt="${this.ImgName(rated[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${rated[i].title}</p>
                            <p class="original-title">${(!rated[i].title ? rated[i].name : rated[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(rated[i])}</p>
                            <p class="rating">${this.rating(rated[i])}</p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(rated[i])}</p>
                            <p class="id">${rated[i].id}</p>
                            <p class="language">${this.language(rated[i])}</p>
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
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(rated[i])}" class="poster" alt="${this.ImgName(rated[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${rated[i].title}</p>
                            <p class="original-title">${(!rated[i].title ? rated[i].name : rated[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(rated[i])}</p>
                            <p class="rating">${this.rating(rated[i])} </p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(rated[i])}</p>
                            <p class="id">${rated[i].id}</p>
                            <p class="language">${this.language(rated[i])}</p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }
        //
        if(allRatedMovieHeader){
            allRatedMovieHeader.innerHTML = ratedMovie

            const movies_result = document.querySelectorAll('.img-slide a')
            if(movies_result){
                movies_result.forEach(result => {
                    result.setAttribute('href', '../view.html')
                    result.addEventListener('click', e => {
                        // e.preventDefault()
                        const parent = e.target.parentElement.parentElement.parentElement
                        this.getParentElement(parent)
                
                        if(JSON.parse(sessionStorage.getItem('movie'))){
                            this.storage()
                        }
                    })
                })
            }
        }
    }
    //
    movies_acted(parent){
        let arr = []
        if(parent.querySelector('.hidden-movies figure')){

            //movie one
            let movie_one;
            if(parent.querySelector('.hidden-movies figure:nth-child(1)')){
                const allMovies = parent.querySelector('.hidden-movies figure:nth-child(1)')
                movie_one = {
                    poster: allMovies.querySelector('.hidden-movies .img-slide:nth-child(1) .poster').src,
                    title: allMovies.querySelector('.hidden-movies .img-slide:nth-child(1) .original-title').textContent,
                    release_date: allMovies.querySelector('.hidden-movies .img-slide:nth-child(1) .date').textContent,
                    rating: allMovies.querySelector('.hidden-movies .img-slide:nth-child(1) .rating').textContent,
                    overview: allMovies.querySelector('.hidden-movies .img-slide:nth-child(1) .hidden-details .overview').textContent,
                    id: allMovies.querySelector('.hidden-movies .img-slide:nth-child(1) .hidden-details .id').textContent,
                    language: allMovies.querySelector('.hidden-movies .img-slide:nth-child(1) .hidden-details .language').textContent
                }
            } else {
                movie_one = null
            }

            //movie two
            let movie_two;
            if(parent.querySelector('.hidden-movies figure:nth-child(2)')){
                const allMovies = parent.querySelector('.hidden-movies figure:nth-child(2)')
                movie_two = {
                    poster: allMovies.querySelector('.hidden-movies .img-slide:nth-child(2) .poster').src,
                    title: allMovies.querySelector('.hidden-movies .img-slide:nth-child(2) .original-title').textContent,
                    release_date: allMovies.querySelector('.hidden-movies .img-slide:nth-child(2) .date').textContent,
                    rating: allMovies.querySelector('.hidden-movies .img-slide:nth-child(2) .rating').textContent,
                    overview: allMovies.querySelector('.hidden-movies .img-slide:nth-child(2) .hidden-details .overview').textContent,
                    id: allMovies.querySelector('.hidden-movies .img-slide:nth-child(2) .hidden-details .id').textContent,
                    language: allMovies.querySelector('.hidden-movies .img-slide:nth-child(2) .hidden-details .language').textContent
                }
            } else {
                movie_two = null
            }

            //movie three
            let movie_three;
            if(parent.querySelector('.hidden-movies figure:nth-child(3)')){
                const allMovies = parent.querySelector('.hidden-movies figure:nth-child(3)')
                movie_three = {
                    poster: allMovies.querySelector('.hidden-movies .img-slide:nth-child(3) .poster').src,
                    title: allMovies.querySelector('.hidden-movies .img-slide:nth-child(3) .original-title').textContent,
                    release_date: allMovies.querySelector('.hidden-movies .img-slide:nth-child(3) .date').textContent,
                    rating: allMovies.querySelector('.hidden-movies .img-slide:nth-child(3) .rating').textContent,
                    overview: allMovies.querySelector('.hidden-movies .img-slide:nth-child(3) .hidden-details .overview').textContent,
                    id: allMovies.querySelector('.hidden-movies .img-slide:nth-child(3) .hidden-details .id').textContent,
                    language: allMovies.querySelector('.hidden-movies .img-slide:nth-child(3) .hidden-details .language').textContent
                }
            } else {
                movie_three = null
            }

            arr.push(movie_one, movie_two, movie_three)
        }
        return arr
    }
    //
    getParentElement(parent){

        const getMovieDetails = {
            poster: parent.querySelector('.poster').src,
            title: parent.querySelector('.original-title').textContent,
            release_date: parent.querySelector('.date').textContent,
            rating: parent.querySelector('.rating').textContent,
            overview: parent.querySelector('.hidden-details .overview').textContent,
            id: parent.querySelector('.hidden-details .id').textContent,
            language: parent.querySelector('.hidden-details .language').textContent,
            known_for: this.movies_acted(parent)
        }

        this.saveMovieDetails(getMovieDetails)
    }
    saveMovieDetails(getMovieDetails){
        let movie = this.storeMovieDetails()
        movie.push(getMovieDetails)
        sessionStorage.setItem('movie', JSON.stringify(movie))

    }
    storeMovieDetails(){
        let movie;
        let storedMovie = sessionStorage.getItem('movie')
        if(storedMovie === null){
            movie = []
        } else {
            movie = JSON.parse(storedMovie)
        } return movie
    }
    storage(){
        // console.log(id);
        let movie = this.storeMovieDetails()
        if(movie.length > 1){
            movie.splice(0,1)
        }
        sessionStorage.setItem('movie', JSON.stringify(movie))
    }

    //
    view_search_details(){
        const get_search = JSON.parse(sessionStorage.getItem('movie'))

        if(get_search[0].known_for.length === 0){
            //movie only
            this.view_movie_only(get_search)
        } else {
            //actor + movie
            // console.log(get_search);
        }
    }

    //
    view_movie_only(get_search){
        //
        const viewSearch = document.querySelector('.view-search')
        let movie = get_search[0]

        let movieTemplate = ""
        movieTemplate += `
            <div class="movie-header">
                <div class="searched-image-header">
                    <figure>
                        <img src="${movie.poster}" alt="${movie.title}">
                    </figure>
                </div>
                <div class="searched-details-header">
                    <div class="title-header">
                        <p>${movie.title}</p>
                    </div>
                    <div class="overview-header">
                        <p>${movie.overview}</p>
                    </div>
                    <div class="details-header">
                        <p><span class="span">Release Date: </span> ${movie.release_date}</p>
                        <p><span class="span">Rating: </span>${movie.rating}</p>
                        <p><span class="span">Movie ID: </span>${movie.id}</p>
                        <p><span class="span">Language: </span> <span>${movie.language}</span></p>
                    </div>
                </div>
            </div>
        `;

        if(viewSearch){
            viewSearch.innerHTML = movieTemplate
        }
    }
}