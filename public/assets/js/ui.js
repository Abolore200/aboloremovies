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
    titleLength(title){
        let title_length;
        if(title.length > 30){
            title_length = `${title.substring(0,25)}...`
        } else if(title.length > 20){
            title_length = `${title.substring(0,20)}...`
        } else {
            title_length = title
        } return title_length
    }
    //
    addUpcomingMovies(upcomingMovies){
        const results = upcomingMovies.results

        //upcoming-movies
        const upcomingMoviesHeader = document.querySelector('.upcoming-movies')

        //upcoming-moviesall
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

        const onclick = Array.from(document.querySelectorAll('.all-upcoming-movies .img-slide'))
        console.log(onclick);
        onclick.forEach(all => {
            console.log(all.children.item(0).children.item(0).setAttribute('href', '../index.html'))
            all.addEventListener('click', e => {
                if(e.target){
                    window.location.href = '../index.html'
                }
            })
        })
    }
    //
}