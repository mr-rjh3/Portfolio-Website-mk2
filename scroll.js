import anime from 'animejs';

function animateProfile(){
    anime.timeline().add({
        targets: '.circle .text',
        translateY: [100, 0],
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 600,
    });
}

export function checkScroll(){
    const headerElements = document.querySelectorAll('Section') // header elements
    for (var i = 0; i < headerElements.length; i++) {
        const scrollPos = window.scrollY + window.innerHeight // scroll position
        if(scrollPos > headerElements[i].offsetTop + headerElements[i].offsetHeight){ // if scroll position is greater than the header element's offsetTop + offsetHeight
            console.log(headerElements[i].id)
            animateProfile();
        } else {
            headerElements[i].classList.remove('active') // remove active class
        }
    }

}

