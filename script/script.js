/* Default value */
const main_container = document.querySelector(".main-container");
const btnReset = document.getElementById("reset");
const btnErase = document.getElementById("erase");
const btnRGB = document.getElementById("RGB");
const btnGray = document.getElementById("grayscale");
const btnShade = document.getElementById("shadding");
const btnBlack = document.getElementById("black");

let colorMode = "black";
let shadding = false;
let nbrElemSide = 50;

function createGrid(nbrElemSide){
    /* Create a grid with nbrElemSide element on each side */

    let new_div;
    for (let i = 0; i < nbrElemSide ** 2; i++){
        new_div = createGridElement(nbrElemSide);
        main_container.appendChild(new_div);
    }
}

function createGridElement(nbrElemSide) {
    /* Create an new element of the grid */

    let new_elem = document.createElement("DIV");
    new_elem.className = "grid-container";
    new_elem.style.width = `${100/nbrElemSide}%`;
    new_elem.addEventListener("mouseenter", showElem);

    return new_elem;
}


function showElem(event) {
    /* Change element style when mouse go over it */
    const gridElement = event.target;

    /* If erase enabled, just reset grid element */
    if (colorMode === "erase"){
        gridElement.className = "grid-container";
        gridElement.removeAttribute("data-step");
        gridElement.style.backgroundColor = "white";
        return;
    }

    /* change color if element have already a color */
    if (gridElement.getAttribute("data-step")){

        /* Check if shadding is enabled */
        if (shadding == false){
            return;
        }

        /* If shadding enabled */
        /* Get the shadding step */
        let step = parseInt(gridElement.getAttribute("data-step"));

        /* Add a step and shade color*/
        if (step <= 9) {
            const actualColor = gridElement.style.backgroundColor;
            const newColor = goToBlack(actualColor, step);

            gridElement.style.backgroundColor = newColor;

            gridElement.setAttribute("data-step", step + 1);
        }
        /* Step 10 = black => stop shadding ; change color to black*/
        else {
            gridElement.style.backgroundColor = 'black';
            gridElement.setAttribute("data-step", 10);
        }
        return;
    }
    /* The element is still blank, give a color following color mode*/
    else {
        let r, g, b;
        switch (colorMode) {
            case "RGB":
                r = Math.random() * 255;
                g = Math.random() * 255;
                b = Math.random() * 255;
                break;
            
            case "grayscale":
                r = 230;
                g = 230;
                b = 230;
                break;

            case "black":
                r = 0;
                g = 0;
                b = 0;

            default:
                break;
        }
        
        gridElement.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        gridElement.setAttribute("data-step", 0);
    }
    return;
}


function deleteGrid(){
    /* Delete all element inside the border of the grid */
    const main_container = document.querySelector(".main-container");
    main_container.innerHTML = "";
}


function resetGrid(event) {
    /* Delete the grid and create a blank one, side is choosen by user*/

    /* Ask user for nbr of square on side */
    nbrElemSide = prompt("How many squares per side? (max = 100)", 50);

    /* If cancel is pressed or user did not entered a number, nothing change */
    if (nbrElemSide === null || isNaN(+nbrElemSide)){
        return;
    }

    /* Be sure nbrSide is not too big */
    if (nbrElemSide > 100) nbrElemSide = 100;

    /* Delete the create set a new grid */
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

function setColor(event) {
    /* Change color mode and toggle the button style */
    colorMode = event.target.id;

    inactiveBtn();

    event.target.classList.add("active");
}

function changeShadding(event) {
    /* Toggle shadding */
    shadding = !shadding;

    /* Toggle shadding button style */
    const btn = event.target;
    if (btn.classList.contains("active")){
        btn.classList.remove("active");
    }
    else{
        btn.classList.add("active");
    }

    if (shadding == true){
        /* set other buttons inactive and remove the color mode*/
        inactiveBtn();
        colorMode = "";
    }
    
    
}

function inactiveBtn() {
    btnReset.classList.remove("active");
    btnErase.classList.remove("active");
    btnRGB.classList.remove("active");
    btnGray.classList.remove("active");
    btnBlack.classList.remove("active");
}

window.onload = () => {
    btnReset.addEventListener("click", resetGrid);
    btnErase.addEventListener("click", setColor);
    btnRGB.addEventListener("click", setColor);
    btnGray.addEventListener("click", setColor);
    btnBlack.addEventListener("click", setColor);
    btnShade.addEventListener("click", changeShadding);

    createGrid(nbrElemSide);
}