import './style.css'
import { checkScroll } from './scroll.js'


document.body.onscroll = checkScroll // calls moveCamera function when user scrolls the mouse wheel
