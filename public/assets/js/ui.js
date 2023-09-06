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

        //
        const upcomingMoviesHeader = document.querySelector('.upcoming-movies')
        //
        let html = ""
        for(let i = 0; i < (results.length - 15); i++){
            html += `
            <figure class="img-slide slides">
                <div class="img-hover">
                    <a href="#">
                        <img src="https://image.tmdb.org/t/p/w500/${results[i].poster_path !== null ? results[i].poster_path : results[i].backdrop_path}" alt="${results[i].title !== null ? results[i].title : results[i].original_title}"/>
                    </a>
                </div>
                <figcaption>
                    <a href="#">
                        <p> ${this.titleLength(results[i].title)} </p>
                    </a>
                    <div class="year-ratings">
                        <p class="date"> ${results[i].release_date} </p>
                        <p> ${results[i].vote_average !== null ? results[i].vote_average : 'NR'} </p>
                    </div>
                </figcaption>
            </figure>
            `;
            if(upcomingMoviesHeader){
                upcomingMoviesHeader.innerHTML = html
            }
        }
    }
}