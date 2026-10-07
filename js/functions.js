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
    if(inputColumnas.value>50 || inputFilas.value>50) {
        pass=false;
    }

    if(!pass) {
        displayError.textContent = "Los valores deben estar entre 10 y 50";
        inputColumnas.classList.add("red");
        inputFilas.classList.add("red");
    }

    return pass;

}

export function crearUniverso(col, fil) {
    let html='';
    html='<div class="universo">';
    console.log("Columnas: ", col);
    console.log("Filas: ", fil);
    
    for(let i=0; i<fil; i++) {
        html+='<div class="fila">';
        for(let y=0; y<col; y++) {
            html+=`<div class="celda muerta" data-id="${i}-${y}"></div>`;
        }
        html+='</div>';
    }

    html+='</div>';
    lifeGameWin.innerHTML=html;

}

export function aleatorio() {
    
    return Math.random() > 0.5 ? true : false;
}

console.log(aleatorio());