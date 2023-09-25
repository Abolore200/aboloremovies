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
    openMenuBar(){
        const category = document.querySelector('.category')
        const category_ul = document.querySelector('.category ul')
        const closeMenu = document.querySelector('#close-btn button')

        //
        const openMenu = document.querySelector('#button')
        openMenu.addEventListener('click', () => {
            category.classList.add('block')
            document.body.style.position = 'fixed'
        })

        //
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
    }

    //
    animateTopBtn(topBtn){
        if(document.documentElement.scrollTop > 200){
            topBtn.classList.add('block')
        } else {
            topBtn.classList.remove('block')
        }
    }

    //
    currentYear(){
        const year = document.querySelector('.year')
        if(year){
            year.innerHTML = new Date().getFullYear()
        }
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
        else if(image.poster_path === null && !image.backdrop_path){
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
    trendingMovies(trending_movies){
        const movie = trending_movies.results

        //
        const trendingMoviesHeader = document.querySelector('.trending-movies')

        let html = ""
        //
        for(let i = 0; i < (movie.length - 15); i++){
            html += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(movie[i])}" class="poster" alt="${this.ImgName(movie[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${movie[i].title}</p>
                            <p class="original-title">${(!movie[i].title ? movie[i].name : movie[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(movie[i])}</p>
                            <p class="rating">${this.rating(movie[i])}</p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(movie[i])}</p>
                            <p class="id">${movie[i].id}</p>
                            <p class="language">${this.language(movie[i])}</p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }

        //
        if(trendingMoviesHeader){
            trendingMoviesHeader.innerHTML = html

            const checkMovie = document.querySelectorAll('.trending-movies .img-slide a')
            if(checkMovie){
                this.viewHomePageMovie(checkMovie)
            }
        }

        //
        const allTrendingMoviesHeader = document.querySelector('.all-trendingMovies-movies')
        //
        let allTrendingMovies = ""
        //array of all Trending movies
        for(let i = 0; i < movie.length; i++){
            allTrendingMovies += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(movie[i])}" class="poster" alt="${this.ImgName(movie[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${movie[i].title}</p>
                            <p class="original-title">${(!movie[i].title ? movie[i].name : movie[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(movie[i])}</p>
                            <p class="rating">${this.rating(movie[i])}</p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(movie[i])}</p>
                            <p class="id">${movie[i].id}</p>
                            <p class="language">${this.language(movie[i])}</p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }
        if(allTrendingMoviesHeader){
            allTrendingMoviesHeader.innerHTML = allTrendingMovies

            this.viewSeeMoreMvoie()
        }
    }

    //
    trendingPerson(trending_person){
        const person = trending_person.results

        //
        const trendingPersonHeader = document.querySelector('.person-movies')

        let personTemplate = ""
        //
        for(let i = 0; i < (person.length - 15); i++){
            personTemplate += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(person[i])}" class="poster" alt="${this.ImgName(person[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${person[i].title || person[i].original_name}</p>
                            <p class="original-title">${(!person[i].original_name ? person[i].name : person[i].original_name)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(person[i])}</p>
                            <p class="rating">${this.rating(person[i])}</p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(person[i])}</p>
                            <p class="id">${person[i].id}</p>
                            <p class="language">${this.language(person[i])}</p>
                        </div>
                        <div class="hide hidden-movies">
                            ${this.personMovie(person[i])}
                        </div>
                    </figcaption>
                </figure>
            `;
        }
        if(trendingPersonHeader){
            trendingPersonHeader.innerHTML = personTemplate

            const checkMovie = document.querySelectorAll('.person-movies .img-slide a')
            if(checkMovie){
                this.viewHomePageMovie(checkMovie)
            }
        }

        console.log(person);

        const allPersonMoviesHeader = document.querySelector('.all-person-movies')
        //
        let allPersonMovies = ""
        //array of all Person movies
        for(let i = 0; i < person.length; i++){
            allPersonMovies += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(person[i])}" class="poster" alt="${this.ImgName(person[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${person[i].title}</p>
                            <p class="original-title">${(!person[i].title ? person[i].name : person[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(person[i])}</p>
                            <p class="rating">${this.rating(person[i])}</p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(person[i])}</p>
                            <p class="id">${person[i].id}</p>
                            <p class="language">${this.language(person[i])}</p>
                        </div>
                        <div class="hide hidden-movies">
                            ${this.personMovie(person[i])}
                        </div>
                    </figcaption>
                </figure>
            `;
        }
        if(allPersonMoviesHeader){
            allPersonMoviesHeader.innerHTML = allPersonMovies

            this.viewSeeMoreMvoie()
        }
    }
    //
    
    trendingTv(trending_tv){
        const tv = trending_tv.results

        //trending tv-series movies
        const trendingTvMoviesHeader = document.querySelector('.trendingTV-movies')

        //trending tv-series movies-all
        const alltrendingTvMoviesHeader = document.querySelector('.all-trendingTV-movies')

        //
        let movies = ""

        //array of 5 trending tv-series movies
        for(let i = 0; i < (tv.length - 15); i++){
            movies += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(tv[i])}" class="poster" alt="${this.ImgName(tv[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${tv[i].title}</p>
                            <p class="original-title">${(!tv[i].title ? tv[i].name : tv[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(tv[i])}</p>
                            <p class="rating">${this.rating(tv[i])}</p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(tv[i])}</p>
                            <p class="id">${tv[i].id}</p>
                            <p class="language">${this.language(tv[i])}</p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }
        //add upcomingMovie into upcomingMoviesHeader
        if(trendingTvMoviesHeader){
            trendingTvMoviesHeader.innerHTML = movies

            const checkMovie = document.querySelectorAll('.trendingTV-movies .img-slide a')
            if(checkMovie){
                this.viewHomePageMovie(checkMovie)
            }

            const all_animation = document.querySelectorAll('.animate')
            if(all_animation){
                this.getAnimation(all_animation)
            }
            
        }

        //
        let allUpcomingMovies = ""
        //array of all upcoming movies
        for(let i = 0; i < tv.length; i++){
            allUpcomingMovies += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(tv[i])}" class="poster" alt="${this.ImgName(tv[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${tv[i].title}</p>
                            <p class="original-title">${(!tv[i].title ? tv[i].name : tv[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(tv[i])}</p>
                            <p class="rating">${this.rating(tv[i])}</p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(tv[i])}</p>
                            <p class="id">${tv[i].id}</p>
                            <p class="language">${this.language(tv[i])}</p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }
        if(alltrendingTvMoviesHeader){
            alltrendingTvMoviesHeader.innerHTML = allUpcomingMovies

            this.viewSeeMoreMvoie()
        }
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
                <figure class="img-slide slides animate">
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

            const checkMovie = document.querySelectorAll('.upcoming-movies .img-slide a')
            if(checkMovie){
                this.viewHomePageMovie(checkMovie)
            }

            const all_animation = document.querySelectorAll('.animate')
            if(all_animation){
                this.getAnimation(all_animation)
            }
            
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

            this.viewSeeMoreMvoie()
        }
    }

    //
    getAnimation(all_animation){
        const arr = Array.from(all_animation)
        arr.forEach(animate => {
            this.getInterSection(animate)
        })
    }
    //
    getInterSection(animate){
        const observe = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('active')
                }
            })
        }, {threshold: 0.5})

        observe.observe(animate)
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

            const checkMovie = document.querySelectorAll('.popular-movies .img-slide a')
            if(checkMovie){
                this.viewHomePageMovie(checkMovie)
            }
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

            this.viewSeeMoreMvoie()
        }
    }

    //
    removeAnchorTag(){
        // const removeAnchor = Array.from(document.querySelectorAll('.movie-slideshow a'))
        // removeAnchor.forEach(link => {
        //     link.setAttribute('href', '.search.html')
        // })
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

            const checkMovie = document.querySelectorAll('.rated-movies .img-slide a')
            if(checkMovie){
                this.viewHomePageMovie(checkMovie)
            }
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

            this.viewSeeMoreMvoie()
        }
    }

    //
    viewHomePageMovie(parentPage){
        // const movies_result = document.querySelectorAll('.img-slide a')
        if(parentPage){
            parentPage.forEach(result => {
                result.setAttribute('href', './view.html')
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

    //
    viewSeeMoreMvoie(){
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

        if(get_search !== null){
            if(get_search[0].known_for.length === 0){
                //movie only
                this.view_movie_only(get_search)
            } else {
                //actor + movie
                this.view_actor(get_search)
            }
        }
    }

    //
    view_movie_only(get_search){
        //
        const view_movie = document.querySelector('.view-movie')

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
                        <p><span class="span">Release Date: </span> ${movie.release_date !== "undefined" ? movie.release_date : ""}</p>
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
        //
        if(view_movie){
            view_movie.innerHTML = movieTemplate
        }
    }

    //
    view_actor(get_search){
        //
        const viewSearch = document.querySelector('.view-search')

        //
        const view_movie = document.querySelector('.view-movie')


        //
        let actor = get_search[0]

        //
        let actorTemplate = ""
        actorTemplate += `
            <div class="movie-header">
                <div class="searched-image-header">
                    <figure>
                        <img src="${actor.poster}" alt="${actor.title}">
                    </figure>
                </div>
                <div class="searched-details-header">
                    <div class="title-header">
                        <p>${actor.title}</p>
                    </div>
                    <div class="overview-header">
                        <p>${actor.overview}</p>
                    </div>
                    <div class="details-header">
                        <p><span class="span">Department: </span>${actor.release_date}</p>
                        <p><span class="span">Type: </span>${actor.rating}</p>
                        <p><span class="span">ID: </span> <span>${actor.id}</span></p>
                    </div>
                </div>
            </div>
            <div class="known-for-header">
                <div class="feature-header"><p>Movies Featured In</p></div>
                <div class="known-for-flex">${this.getKnown_for(actor.known_for)}</div>
            </div>
        `;

        if(viewSearch){
            viewSearch.innerHTML = actorTemplate

            this.viewSeeMoreMvoie()
        }

        if(view_movie){
            view_movie.innerHTML = actorTemplate

            const checkMovie = document.querySelectorAll('.img-slide a')
            if(checkMovie){
                this.viewHomePageMovie(checkMovie)
            }
        }
    }

    getKnown_for(known_for){
        let known_forTemplate = ""
        for(let i = 0; i < known_for.length; i++){
            if(known_for[i] !== null){
                known_forTemplate += `
                    <figure class="img-slide slides">
                        <div class="img-hover">
                            <a href="#">
                                <img src="https://image.tmdb.org/t/p/w500/${(known_for[i].poster)}" class="poster" alt="${(known_for[i].title)}"/>
                            </a>
                        </div>
                        <figcaption>
                            <a href="#">
                                <p class="hide title">${known_for[i].title}</p>
                                <p class="original-title">${(known_for[i].title)}</p>
                            </a>
                            <div class="year-ratings">
                                <p class="date">${(known_for[i].release_date)}</p>
                                <p class="rating">${(known_for[i].rating)}</p>
                            </div>
                            <div class="hide hidden-details">
                                <p class="overview">${(known_for[i].overview)}</p>
                                <p class="id">${known_for[i].id}</p>
                                <p class="language">${(known_for[i].language)}</p>
                            </div>
                        </figcaption>
                    </figure>
                `;
            }
        }
        return known_forTemplate
    }

    //
    displayAiringToday(airing_today){
        //
        const airing = airing_today.results

        let airingMovies = ""
        for(let i = 0; i < (airing.length - 15); i++){
            airingMovies += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(airing[i])}" class="poster" alt="${this.ImgName(airing[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${airing[i].title}</p>
                            <p class="original-title">${(!airing[i].title ? airing[i].name : airing[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(airing[i])}</p>
                            <p class="rating">${this.rating(airing[i])}</p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(airing[i])}</p>
                            <p class="id">${airing[i].id}</p>
                            <p class="language">${this.language(airing[i])}</p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }

        const airingToday = document.querySelector('.airing-movies')
        if(airingToday){
            airingToday.innerHTML = airingMovies

            const checkMovie = document.querySelectorAll('.airing-movies .img-slide a')
            if(checkMovie){
                this.viewHomePageMovie(checkMovie)
            }
        }

        let allAiringMovies = ""
        for(let i = 0; i < airing.length; i++){
            allAiringMovies += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(airing[i])}" class="poster" alt="${this.ImgName(airing[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${airing[i].title}</p>
                            <p class="original-title">${(!airing[i].title ? airing[i].name : airing[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(airing[i])}</p>
                            <p class="rating">${this.rating(airing[i])} </p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(airing[i])}</p>
                            <p class="id">${airing[i].id}</p>
                            <p class="language">${this.language(airing[i])}</p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }

        const allAiringTodayHeader = document.querySelector('.all-airing-movies')
        if(allAiringTodayHeader){
            allAiringTodayHeader.innerHTML = allAiringMovies

            this.viewSeeMoreMvoie()
        }
    }

    //
    displayTvRated(on_the_air){
        const on_air = on_the_air.results

        let onTheAirMovies = ""
        for(let i = 0; i < (on_air.length - 15); i++){
            onTheAirMovies += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(on_air[i])}" class="poster" alt="${this.ImgName(on_air[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${on_air[i].title}</p>
                            <p class="original-title">${(!on_air[i].title ? on_air[i].name : on_air[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(on_air[i])}</p>
                            <p class="rating">${this.rating(on_air[i])}</p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(on_air[i])}</p>
                            <p class="id">${on_air[i].id}</p>
                            <p class="language">${this.language(on_air[i])}</p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }

        const onTheAir = document.querySelector('.tv-rated-movies')
        if(onTheAir){
            onTheAir.innerHTML = onTheAirMovies

            const checkMovie = document.querySelectorAll('.tv-rated-movies .img-slide a')
            if(checkMovie){
                this.viewHomePageMovie(checkMovie)
            }
        }

        let allOnTheAirMovies = ""
        for(let i = 0; i < on_air.length; i++){
            allOnTheAirMovies += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(on_air[i])}" class="poster" alt="${this.ImgName(on_air[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${on_air[i].title}</p>
                            <p class="original-title">${(!on_air[i].title ? on_air[i].name : on_air[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(on_air[i])}</p>
                            <p class="rating">${this.rating(on_air[i])} </p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(on_air[i])}</p>
                            <p class="id">${on_air[i].id}</p>
                            <p class="language">${this.language(on_air[i])}</p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }

        const allOnTheAirHeader = document.querySelector('.all-tv-rated-movies')
        if(allOnTheAirHeader){
            allOnTheAirHeader.innerHTML = allOnTheAirMovies

            this.viewSeeMoreMvoie()
        }
    }

    //
    displayNowPlayingMovies(nowPlayingMovies){
        const playing = nowPlayingMovies.results

        let nowPlayingMoviesTemplate = ""
        for(let i = 0; i < (playing.length - 15); i++){
            nowPlayingMoviesTemplate += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(playing[i])}" class="poster" alt="${this.ImgName(playing[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${playing[i].title}</p>
                            <p class="original-title">${(!playing[i].title ? playing[i].name : playing[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(playing[i])}</p>
                            <p class="rating">${this.rating(playing[i])}</p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(playing[i])}</p>
                            <p class="id">${playing[i].id}</p>
                            <p class="language">${this.language(playing[i])}</p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }

        const nowPlaying = document.querySelector('.now-playing-movies')
        if(nowPlaying){
            nowPlaying.innerHTML = nowPlayingMoviesTemplate

            const checkMovie = document.querySelectorAll('.now-playing-movies .img-slide a')
            if(checkMovie){
                this.viewHomePageMovie(checkMovie)
            }
        }

        let allNowPlayingMovies = ""
        for(let i = 0; i < playing.length; i++){
            allNowPlayingMovies += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(playing[i])}" class="poster" alt="${this.ImgName(playing[i])}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide title">${playing[i].title}</p>
                            <p class="original-title">${(!playing[i].title ? playing[i].name : playing[i].title)}</p>
                        </a>
                        <div class="year-ratings">
                            <p class="date">${this.releaseDate(playing[i])}</p>
                            <p class="rating">${this.rating(playing[i])} </p>
                        </div>
                        <div class="hide hidden-details">
                            <p class="overview">${this.overview(playing[i])}</p>
                            <p class="id">${playing[i].id}</p>
                            <p class="language">${this.language(playing[i])}</p>
                        </div>
                    </figcaption>
                </figure>
            `;
        }

        const allNowPlayingHeader = document.querySelector('.all-now-playing-movies')
        if(allNowPlayingHeader){
            allNowPlayingHeader.innerHTML = allNowPlayingMovies

            this.viewSeeMoreMvoie()
        }
    }
}