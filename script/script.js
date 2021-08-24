document.getElementById("reset").addEventListener("click", resetGrid);

/* Initialize grid */
const nbrElemSide = 50;
createGrid(nbrElemSide);

function createGrid(nbrElemSide){
    /* Create a grid with nbrElemSide element on each side */
    const main_container = document.querySelector(".main-container");

    let new_div;
    for (let i = 0; i < nbrElemSide ** 2; i++){
        new_div = createGridElement(nbrElemSide);
        main_container.appendChild(new_div);
    }
}

function showElem(event) {
    /* Change element style when mouve pass over it */
    const gridElement = event.target;

    /* change color if element have already a color */
    if (gridElement.classList.contains("hovered")){

        /* Get the step to black for class name*/
        let step = gridElement.classList[2][5];
        
        /* Add a step and change color*/
        if (step <= 8) {
            const actualColor = gridElement.style.backgroundColor;
            const newColor = goToBlack(actualColor, step);

            gridElement.style.backgroundColor = newColor;

            gridElement.classList.remove(`step-${step}`);
            gridElement.classList.add(`step-${+step + 1}`);
        }
        /* change 'step-10' and 'hovered' to 'black' ; change color to black*/
        else {
            gridElement.style.backgroundColor = 'black';
            gridElement.classList.remove(`step-9`);
            gridElement.classList.remove(`hovered`);
            gridElement.classList.add("black");
        }
        return;/*TODO*/
    }
    /* If the element is already black, nothing change */
    else if (gridElement.classList.contains("black")){
        return ;
    }
    /* The element is still blank, give a rdm color */
    else {
        const r = Math.random() * 255;
        const g = Math.random() * 255;
        const b = Math.random() * 255;
        gridElement.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        gridElement.classList.add("hovered");
        gridElement.classList.add("step-0");
    }
    return;
}

function createGridElement(nbrElemSide) {
    /* Create an new element of the grid */

    let new_elem = document.createElement("DIV");
    new_elem.className = "grid-container";
    new_elem.style.width = `${100/nbrElemSide}%`;
    new_elem.addEventListener("mouseenter", showElem);

    return new_elem;
}


function deleteGrid(){
    /* Delete all element inside the border of the grid */
    const main_container = document.querySelector(".main-container");
    main_container.innerHTML = "";
}


function resetGrid(event) {
    /* Delete the grid and create a blank one, side is choosen by user*/

    /* Ask user for nbr of square on side */
    let nbrElemSide = prompt("How many squares per side? (max = 100)", 50);

    /* If cancel is pressed or user did not entered a number, nothing change */
    if (nbrElemSide === null || isNaN(+nbrElemSide)){
        return;
    }

    /* Be sure nbrSide is not too big */
    if (nbrElemSide > 100) nbrElemSide = 100;

    /* Delete the create the grid */
    deleteGrid();
    createGrid(nbrElemSide);
    const gridElements = document.querySelectorAll(".grid-container");
    gridElements.forEach(element => {
        element.classList.remove("hovered");
    });   
}


function goToBlack(actualColor, step) {
/* Add one 10th of color toward black to actualColor*/

    /* Parse rgb(xx, xx, xx) to separated red, green and blue component */
    const arrayOfColor = actualColor.slice(4, actualColor.length-1).split(",");
    
    let r = +arrayOfColor[0];
    let g = +arrayOfColor[1];
    let b = +arrayOfColor[2];

    /* Add 1/10th of color to black */
    let rb = Math.round(r - ( r /(10-step)));
    let gb = Math.round(g - ( g /(10-step)));
    let bb = Math.round(b - ( b /(10-step)));

    return `rgb(${rb}, ${gb}, ${bb})`;
}