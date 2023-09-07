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
    releaseDate(date){
        let noDate = ""
        if(date === "" || date === undefined){
            noDate += `no date`
        } else {
            noDate = date
        } return noDate
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
                            <p> ${this.titleLength(results[i].title)} </p>
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
        console.log(movies);
        //
        const searchResult = document.querySelector('.search-results')

        let searchMovies = ""
        for(let i = 0; i < movies.length; i++){

            // if(movies[i].title == null || movies[i].title === undefined){

            //     //
            //     const form = document.querySelector('.search-form')

            //     this.displayMessage(form, 'not found')
            // }
            console.log(movies[i]);
            searchMovies += `
                <figure class="img-slide slides">
                    <div class="img-hover">
                        <a href="#">
                            <img src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path !== null ? movies[i].poster_path : movies[i].backdrop_path}" alt="${movies[i].title !== null ? movies[i].title : movies[i].original_title}"/>
                        </a>
                    </div>
                    <figcaption>
                        <a href="#">
                            <p class="hide"> ${movies[i].title} </p>
                            <p> ${(!movies[i].title ? movies[i].name : movies[i].title)} </p>
                        </a>
                        <div class="year-ratings">
                            <p class="date"> ${this.releaseDate(movies[i].release_date)} </p>
                            <p> ${movies[i].vote_average !== null ? movies[i].vote_average : 'NR'} </p>
                        </div>
                        <div class="hide">
                            <p class="overview"> ${movies[i].overview} </p>
                            <p class="id"> ${movies[i].id} </p>
                            <p class="language"> ${movies[i].original_language} </p>
                        </div>
                    </figcaption>
                </figure>
            `
        }
        if(searchResult){
            searchResult.innerHTML = searchMovies
        }
    }
}