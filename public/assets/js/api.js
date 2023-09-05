class API{
    async getMovie(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGMyYWQ3MzFmNDljNDU0YjY4YWQ4OTlkMTdmZWViNCIsInN1YiI6IjY0ZjA4NWY0OTdhNGU2MDBhYzNlNGI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XeS0eYVjdPNCbSb-gk-xNR7MKq2YFdufOdYFWVzmEBU'
            }
        };
          
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        const apiMovie = await response.json()

        return {apiMovie}
    }
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
}