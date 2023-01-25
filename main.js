import './style.css'
import { checkScroll } from './scroll.js'
import anime from 'animejs';

const TILE_SIZE = 50; // Tile size (100px if the window width is greater than 800px, 50px if it's less than 800px)
const root = document.querySelector(':root');

// INITAL TITLE ANIMATION

var textWrapper = document.querySelector('.title .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>") // Wrap every letter in a span
textWrapper = document.querySelector('.subtitle .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>") // Wrap every letter in a span

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
    translateX: [0, document.querySelector('.title .letters').getBoundingClientRect().width + 10],
    easing: "easeOutExpo",
    duration: 700,
    delay: 200
  }).add({
    // fade in the letters
    targets: '.title .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    delay: anime.stagger(30)
  },'-=730').add({
    // move line to the bottom of the title
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
    delay: anime.stagger(30, {from: 'center'})
    });





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
        opacity: toggled ? 0.3 : 0.8,
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
