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
        } else {
            title_length = title
        } return title_length
    }
    //
    // movieSlides(slides){
    //     // let index = 0
    //     this.showSlides(slides)
    // }
    // showSlides(slides){
    //     let index = 0
    //     let i;
    //     for(i = 0; i < slides.length; i++){
    //         console.log(slides[i]);
    //         slides[i].style.display = 'none'
    //     }
    //     index++;
    //     if (index > slides.length) {index = 1}    
    //     slides[index - 1].style.display = "block";  
    //     setTimeout(this.showSlides, 2000); // Change image every 2 seconds
    // }
}