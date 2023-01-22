export function checkScroll(){
    const t = document.body.getBoundingClientRect().top; // get the distance from the top of the webpage
    if(t < -500){ // if far enough from the top display the top button
        // bring topButton in
        if(topButton.matches(":hover")) // if the topButton is being hovered over
            topButton.style.transform = "scale(1.05) rotate(360deg)";
        else
            topButton.style.transform = "scale(1)";
        topButton.onclick = topFunction;
        topButton.style.cursor = "pointer";
    }
    else{
        //  get rid of topButton and stop it from being clicked
        topButton.style.transform = "scale(0)";
        topButton.onclick = null;
        topButton.style.cursor = "default";
    }
}

