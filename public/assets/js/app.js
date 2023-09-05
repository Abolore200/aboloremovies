const api = new API()

//
const nav = document.querySelector('.navbar')
const span = Array.from(document.querySelectorAll('.site-name a span'))
const list = Array.from(document.querySelectorAll('.category ul li a'))
//
window.addEventListener('scroll', () => {
    if(document.documentElement.scrollTop > 50){
        api.addActiveClass(nav,span,list)
    } else {
        api.removeActiveClass(nav,span,list)
    }
})

//
const movieGenre = document.querySelector('.movie-genre p span')
//
// if(window){
//     window.addEventListener('DOMContentLoaded', () => {
//         api.getMovie()
//         .then(genres => {
//             const moviesGenres = genres.apiMovie.genres

//             //
//             let span = ""
//             moviesGenres.forEach(genreID => {
//                 span += `${genreID.name}, `

//                 console.log(genreID);
//             })
//             movieGenre.innerHTML = span

//             // console.log(genres);
//         })
//     })
// }