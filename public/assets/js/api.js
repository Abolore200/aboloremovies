class API{
    //trending movies
    async trendingMovies(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGMyYWQ3MzFmNDljNDU0YjY4YWQ4OTlkMTdmZWViNCIsInN1YiI6IjY0ZjA4NWY0OTdhNGU2MDBhYzNlNGI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XeS0eYVjdPNCbSb-gk-xNR7MKq2YFdufOdYFWVzmEBU'
            }
        }; 
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-U', options)
        const trending_movies = await response.json()
        return {trending_movies}
    }

    //
    async trendingPerson(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGMyYWQ3MzFmNDljNDU0YjY4YWQ4OTlkMTdmZWViNCIsInN1YiI6IjY0ZjA4NWY0OTdhNGU2MDBhYzNlNGI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XeS0eYVjdPNCbSb-gk-xNR7MKq2YFdufOdYFWVzmEBU'
            }
        }; 
        const response = await fetch('https://api.themoviedb.org/3/trending/person/day?language=en-U', options)
        const trending_person = await response.json()
        return {trending_person}
    }

    //fetch api for now playing movies
    async nowPlayingMovies(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGMyYWQ3MzFmNDljNDU0YjY4YWQ4OTlkMTdmZWViNCIsInN1YiI6IjY0ZjA4NWY0OTdhNGU2MDBhYzNlNGI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XeS0eYVjdPNCbSb-gk-xNR7MKq2YFdufOdYFWVzmEBU'
            }
        }; 
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US', options)
        const now_playing = await response.json()
        return {now_playing}
    }

    //fetch api for popular movies
    async popularMovies(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGMyYWQ3MzFmNDljNDU0YjY4YWQ4OTlkMTdmZWViNCIsInN1YiI6IjY0ZjA4NWY0OTdhNGU2MDBhYzNlNGI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XeS0eYVjdPNCbSb-gk-xNR7MKq2YFdufOdYFWVzmEBU'
            }
        }; 
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        const apiMovie = await response.json()
        return {apiMovie}
    }

    //fetch api for upcoming movies
    async upcomingMovies(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGMyYWQ3MzFmNDljNDU0YjY4YWQ4OTlkMTdmZWViNCIsInN1YiI6IjY0ZjA4NWY0OTdhNGU2MDBhYzNlNGI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XeS0eYVjdPNCbSb-gk-xNR7MKq2YFdufOdYFWVzmEBU'
            }
        }; 
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
        const upcoming = await response.json()
        return {upcoming}
    }
    
    //fetch api for search movies
    async searchMovies(search){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGMyYWQ3MzFmNDljNDU0YjY4YWQ4OTlkMTdmZWViNCIsInN1YiI6IjY0ZjA4NWY0OTdhNGU2MDBhYzNlNGI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XeS0eYVjdPNCbSb-gk-xNR7MKq2YFdufOdYFWVzmEBU'
            }
        }; 
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&`, options)
        const searchedMovies = await response.json()
        return {searchedMovies}
    }

    //
    async topRatedMovie(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGMyYWQ3MzFmNDljNDU0YjY4YWQ4OTlkMTdmZWViNCIsInN1YiI6IjY0ZjA4NWY0OTdhNGU2MDBhYzNlNGI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XeS0eYVjdPNCbSb-gk-xNR7MKq2YFdufOdYFWVzmEBU'
            }
        };
        
        const response =  await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        const rated = await response.json()
        return {rated}
    }

    //
    async airingToday(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGMyYWQ3MzFmNDljNDU0YjY4YWQ4OTlkMTdmZWViNCIsInN1YiI6IjY0ZjA4NWY0OTdhNGU2MDBhYzNlNGI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XeS0eYVjdPNCbSb-gk-xNR7MKq2YFdufOdYFWVzmEBU'
            }
        };
        
        const response =  await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US', options)
        const airing_today = await response.json()
        return {airing_today}
    }

    //
    async tvRated(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGMyYWQ3MzFmNDljNDU0YjY4YWQ4OTlkMTdmZWViNCIsInN1YiI6IjY0ZjA4NWY0OTdhNGU2MDBhYzNlNGI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XeS0eYVjdPNCbSb-gk-xNR7MKq2YFdufOdYFWVzmEBU'
            }
        };
        
        const response =  await fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US', options)
        const rated = await response.json()
        return {rated}
    }
}