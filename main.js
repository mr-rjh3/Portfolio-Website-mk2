import './style.css'
import { checkScroll } from './scroll.js'
import anime from 'animejs';

const TILE_SIZE = 50; // Tile size (100px if the window width is greater than 800px, 50px if it's less than 800px)
const root = document.querySelector(':root');

// INITAL TITLE ANIMATION
var textWrapper = document.querySelector('.title .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>") // Wrap every letter in a span
textWrapper = document.querySelector('.subtitle .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>") // Wrap every letter in a span

anime.timeline()
  .add({
    // fade in the line and title
    targets: '.title .line',
    scaleY: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700,
    delay: 500
  })
  .add({
    // move line to the right of the title
    targets: '.title .line',
    translateX: [0, document.querySelector('.title .letters').getBoundingClientRect().width + 20],
    easing: "easeOutExpo",
    duration: 700,
    delay: 200
  }).add({
    // fade in the letters
    targets: '.title .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    delay: anime.stagger(33)
  },'-=730').add({
    // Remove the line
    targets: '.title .line',
    scaleY: [1,0],
    easing: "easeOutExpo",
    duration: 700,
    delay: 200
    }).add({
    // fade in the subtitle letters
    targets: '.subtitle .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    delay: anime.stagger(30)
    });




// GRID ANIMATION
const tilesElement = document.querySelector('.tiles') // name-header element
const headerElement = document.body // header element
let columns = Math.floor(headerElement.clientWidth / TILE_SIZE) // number of columns in the header (get the height of the header and divide it by the tile size)
let rows = Math.floor((headerElement.clientHeight) / TILE_SIZE) // number of rows in the header (get the width of the header and divide it by the tile size)

const colors = [
    "rgb(229, 57, 53)",
    "rgb(244, 67, 54)",
    "rgb(233, 30, 99)",
    "rgb(156, 39, 176)",
    "rgb(103, 58, 183)",
    "rgb(63, 81, 181)",
    "rgb(33, 150, 243)"
]

const createTile = (index) => { // Creates a tile element
    const tile = document.createElement('div')
    tile.classList.add('tile')
    tile.onclick = e => tileClick(index) // calls tileClick function when the tile is clicked
    return tile
}
let count = -1
let toggled = false
const toggle = () => { // Toggles the animation
    toggled = !toggled
    if (toggled) {
        document.body.classList.add('is-toggled')
    } else {
        document.body.classList.remove('is-toggled')
    }
}


const tileClick = (index) => { // Handles the click event on the tile
    toggle() // calls toggle function
    count++
    // this is the code for the tile animation
    anime({
        targets: '.tile', // targets the tile element
        opacity: toggled ? Math.random() * (0.4 - 0.2) + 0.2 : Math.random() * (1 - 0.6) + 0.6, // changes the opacity of the tile to 0.4 if the animation is toggled, otherwise it changes it to a random number between 0.4 and 1
        // backgroundColor: colors[count %(colors.length - 1)], // changes the background color to black
        delay: anime.stagger(50, {grid: [columns, rows], from: index}), // stagger the animation by 50ms from the index of the tile
    })
}

const createTileArray = (quantity) => { // Generates tile elements and appends them to the name-header element
    for (let i = 0; i < quantity; i++) {
        tilesElement.appendChild(createTile(i))
    }
}

const refreshTiles = () => { // Recalculate the tiles in the header on window resize
    tilesElement.innerHTML = ''

    columns = Math.floor(headerElement.clientWidth / TILE_SIZE)
    rows = Math.floor((headerElement.clientHeight) / TILE_SIZE)

    root.setAttribute('style', `--columns: ${columns}; --rows: ${rows}; --tile-size: ${TILE_SIZE}px;`)

    console.log(columns , rows)
    createTileArray(columns * rows) // calls createTileArray function and passes the number of tiles to be created
}
refreshTiles() // calls refreshTiles function
window.onresize = refreshTiles // calls refreshTiles function when the window is resized
      

// PROJECTS ANIMATION

var boxEl = document.querySelectorAll('.box a');

function animateBox(el, scale, duration, elasticity) {
    anime.remove(el); // remove any existing animations
    anime({
      targets: el,
      scale: scale,
      duration: duration,
      elasticity: elasticity,
    });
  }
function enterBox(el) {
    animateBox(el, 1.05, 400, 200);
}
function leaveBox(el) {
    animateBox(el, 1, 400, 200);
}
function clickBox(el, scale, duration, elasticity) {
    anime.remove(el); // remove any existing animations
    anime({
      targets: el,
      keyframes: [
        {scale: scale, duration: duration/2},
        {scale: 1, duration: duration/2},
        ],
      scale: scale,
      duration: duration,
      elasticity: elasticity,
    });
}

for (var i = 0; i < boxEl.length; i++) {
boxEl[i].addEventListener('mouseenter', function(e) {
    enterBox(e.target);
}, false);

boxEl[i].addEventListener('mouseleave', function(e) {
    leaveBox(e.target)
}, false);  

boxEl[i].addEventListener('touchstart', function(e) {
    enterBox(e.target);
}, false);
boxEl[i].addEventListener('touchend', function(e) {
    leaveBox(e.target)
}, false);
boxEl[i].addEventListener('click', function(e) {
    clickBox(e.target, 0.97, 150, 500)
}, false);
}

// SCROLL ANIMATION
var sectionsTravelled = [false, false, false];
textWrapper = document.querySelector('.profile');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='profileLetter'>$&</span>") // Wrap every letter in a span
let textWrappers = document.querySelectorAll('.education h1');
for(let i = 0; i < textWrappers.length; i++){
    textWrappers[i].innerHTML = textWrappers[i].textContent.replace(/\S/g, "<span class='educationH1'>$&</span>") // Wrap every letter in a span
}
textWrappers = document.querySelectorAll('.education h3');
for(let i = 0; i < textWrappers.length; i++){
    textWrappers[i].innerHTML = textWrappers[i].textContent.replace(/\S/g, "<span class='educationH3'>$&</span>") // Wrap every letter in a span
}

const profileAnimation = anime.timeline({autoplay: false})
    .add({
        // fade in the image
        targets: '.square',
        translateX: [-100,0],
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1000,
        delay: 200,
    })
    .add({
    // fade in the line and title
    targets: '.profile span',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 700,
    delay: anime.stagger(5),
    });

const projectAnimation = anime({
                            targets: '.boxes.active .box',
                            opacity: [0,1],
                            translateY: [-100,0],
                            easing: "easeOutExpo",
                            duration: 1000,
                            delay: anime.stagger(100),
                            autoplay: false
                        });

const educationAnimation = anime.timeline({autoplay: false})
        .add({
            // Fade in image
            targets: '.long-square',
            translateX: [-100,0],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            delay: anime.stagger(500),
        })
        .add({
            // fade in the line and title
            targets: '.education span',
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 700,
            delay: anime.stagger(10),
            });

function animateScroll() {
    const currentScroll = window.pageYOffset;
    const sectionElements = document.querySelectorAll('Section');
    const sectionPositions = [];
    sectionElements.forEach((section) => {
        sectionPositions.push(section.offsetTop + window.innerHeight *1.1);
    });
    console.log(currentScroll, sectionPositions[0], sectionPositions[1], sectionPositions[2]);
    if(currentScroll > sectionPositions[0] - 300 && currentScroll < sectionPositions[1] - 300) {
        console.log(sectionElements[0]);
        // animate profile section
        console.log(sectionsTravelled[0]);
        if(sectionsTravelled[0] != true) {
            profileAnimation.play();
            profileAnimation.finished.then(() => {
                sectionsTravelled[0] = true;
            });
        }   
    }
    if(currentScroll > sectionPositions[1] - 300 && currentScroll < sectionPositions[2] - 300) {
        console.log(sectionElements[1]);
        // animate project section
        console.log(sectionsTravelled[1]);
        if(sectionsTravelled[1] != true) {
            projectAnimation.play();
            projectAnimation.finished.then(() => {
                sectionsTravelled[1] = true;
            });
        }   
    }
    if(currentScroll > sectionPositions[2] - 300) {
        console.log(sectionElements[2]);
        // animate Education section
        console.log(sectionsTravelled[2]);
        if(sectionsTravelled[2] != true) {
            educationAnimation.play();
            educationAnimation.finished.then(() => {
                sectionsTravelled[2] = true;
            });
        }   
    }

}

// ARROW BUTTON CONTROLS
const arrowButtons = document.querySelectorAll('.round')
const boxesElements = document.querySelectorAll('.boxes')
var currentBoxesElement = 0

function updateBoxes() {
    // animate the boxes being removed
    anime.remove('.boxes.active .box') // remove any existing animations
    anime({
        targets: '.boxes.active .box',
        opacity: [1,0],
        translateY: [0,100],
        easing: "easeOutExpo",
        duration: 1000,
        delay: anime.stagger(150, {direction: 'reverse'}),
        complete: function() {
            // remove the active class from all boxes elements
            boxesElements.forEach(boxesElement => boxesElement.classList.remove('active'))
            // add the active class to the current boxes element
            boxesElements[currentBoxesElement].classList.add('active')
            // animate the boxes being added
            anime({
                targets: '.boxes.active .box',
                opacity: [0,1],
                translateY: [-100,0],
                easing: "easeOutExpo",
                duration: 1000,
                delay: anime.stagger(100),
            })
            
        }
    })
    

    
}

arrowButtons.forEach(arrowButton => arrowButton.addEventListener('click', el => {
    // animate the button
    clickBox(arrowButton, 0.97, 150, 500)
    // check which button was clicked
    console.log(arrowButton.querySelector('.arrow.right'))
    if(arrowButton.querySelector('.arrow.left') != null) {
        // left button was clicked
        currentBoxesElement--
    }
    if(arrowButton.querySelector('.arrow.right') != null) {
        // right button was clicked
        currentBoxesElement++
    }

    // cycle to the next boxes element
    // if the current boxes element is the first one, cycle to the last one
    if (currentBoxesElement < 0) {
        currentBoxesElement = boxesElements.length - 1
    }
    else if (currentBoxesElement >= boxesElements.length)  {
        currentBoxesElement = 0
    }
    // update the boxes element
    console.log(currentBoxesElement)
    updateBoxes()
}))

animateScroll();
window.onscroll = animateScroll;
