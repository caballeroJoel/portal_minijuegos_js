export function comprobarCreacion() {

    let pass=true;

    const inputColumnas = document.querySelector("#inputColumnas");
    const inputFilas = document.querySelector("#inputFilas");

    const displayError = document.querySelector("#displayError");
    displayError.textContent = "";

    inputColumnas.classList.remove("red");
    inputFilas.classList.remove("red");

    if(!inputColumnas.value || !inputFilas.value) {
        pass=false;
    }
    if(inputColumnas.value<10 || inputFilas.value<10) {
        pass=false;
    }
    if(inputColumnas.value>100 || inputFilas.value>100) {
        pass=false;
    }

    if(!pass) {
        displayError.textContent = "Los valores deben estar entre 10 y 100";
        inputColumnas.classList.add("red");
        inputFilas.classList.add("red");
    }

    return pass;

}

export function crearUniverso(col, fil) {
    lifeGameWin.innerHTML="";
    console.log("Columnas: ", col);
    console.log("Filas: ", fil);
    
    for(let i=0; i<fil; i++) {
        
    }

}