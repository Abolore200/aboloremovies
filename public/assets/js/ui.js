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
        if(title.length > 30){
            title_length = `${title.substring(0,25)}...`
        } else if(title.length > 20){
            title_length = `${title.substring(0,20)}...`
        } else if(!title){
            title_length = `${name.substring(0,20)}...`
        } else {
            title_length = title
        } return title_length
    }
    //
    rating(movies){
        let noRate;
        if(movies.vote_average || movies.vote_average === 0){
            noRate = movies.vote_average
        } else if(!movies.vote_average) {
            noRate = movies.media_type
        } return noRate
    }
    //
    releaseDate(date){
        let noDate;
        if(date.known_for_department){
            noDate = date.known_for_department
        } else if(date.release_date === "" || date.release_date === undefined){
            noDate = 'no date'
        }  else {
            noDate = date.release_date
        } return noDate
    }
    //
    imgPoster(image){
        let img;
        if(!image.poster_path && !image.backdrop_path){
            img = image.profile_path
        } else if(image.poster_path !== null){
            img = image.poster_path
        } else {
            img = image.backdrop_path
        } return img
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
    displayMessage(form, message){
        const error = document.createElement('div')
        error.classList.add('error')
        error.innerHTML = `<p> ${message}</p>`
        //
        const searchModal = document.querySelector('.search-modal')

        form.insertBefore(error, searchModal)

        //remove error after 2 seconds
        setTimeout(() => {
            error.remove()
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
                            <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(movies[i])}" alt="${movies[i].title !== null ? movies[i].name : movies[i].original_title}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide"> ${movies[i].title} </p>
                            <p> ${(!movies[i].title ? movies[i].name : movies[i].title)} </p>
                        </a>
                        <div class="year-ratings">
                            <p class="date"> ${this.releaseDate(movies[i])} </p>
                            <p> ${movies[i].media_type} ${this.rating(movies[i])} </p>
                        </div>
                        <div class="hide">
                            <p class="overview"> ${movies[i].overview} </p>
                            <p class="id"> ${movies[i].id} </p>
                            <p class="language"> ${movies[i].original_language} </p>
                        </div>
                        <div class="hide">
                            ${this.personMovie(movies[i])}
                        </div>
                    </figcaption>
                </figure>
            `
        }
        if(searchResult){
            searchResult.innerHTML = searchMovies
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
                                <img src="https://image.tmdb.org/t/p/w500/${this.imgPoster(film[i])}" alt="${film[i].title !== null ? film[i].title : film[i].original_title}"/>
                            </a>
                        </div>
                        <figcaption>
                            <a href="#">
                                <p class="hide"> ${film[i].title} </p>
                                <p> ${(!film[i].title ? film[i].name : film[i].title)} </p>
                            </a>
                            <div class="year-ratings">
                                <p class="date"> ${this.releaseDate(film[i])} </p>
                                <p> ${this.rating(film[i])} </p>
                            </div>
                            <div class="hide">
                                <p class="overview"> ${film[i].overview} </p>
                                <p class="id"> ${film[i].id} </p>
                                <p class="language"> ${film[i].original_language} </p>
                            </div>
                        </figcaption>
                    </figure>
                `;
            } return html
        }
    }
}

// movies[i].vote_average !== null ? movies[i].vote_average : 'NR', 
// movies[i].poster_path !== null ? movies[i].poster_path : movies[i].backdrop_path