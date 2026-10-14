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

export function crearUniverso(universo) {

    const divUni = document.querySelector("#divUni");
    let html='';

    html='<div class="universo">';

    let fil = universo.length;
    let col = universo[0].length;
    
    for(let i=0; i<fil; i++) {
        html+=`<div class="fila" data-id="${i}">`;
        for(let y=0; y<col; y++) {
            html+=`<div class="celda ${universo[i][y] ? 'viva' : 'muerta'}" data-id="${i}-${y}"></div>`;
        }
        html+='</div>';
    }

    html+='</div>';
    divUni.innerHTML=html;

}

export function aleatorio() {
    return Math.random() > 0.5 ? true : false;
}

export function aleatorioPorcentage(por) {
    return (Math.random()*100) < por ? true : false;
}

export function crearMatriz(col, fil) {

    let mundo = [];

    for(let i=0; i<fil; i++) {
        mundo[i]=[];

        for(let y=0; y<col; y++) {
            mundo[i][y]=aleatorioPorcentage(10);
        }
    }

    return mundo;

}

export function contarVecinas(uni, x, y) {
    let celulaActual = uni[x][y];

    let veciVivos = 0;

    for(let k=-1; k<=1; k++) {
        for(let j=-1; j<=1; j++) {
            if(k!=0 || j!=0) {

                let xk = x+k;
                let yj = y+j;

                if(xk >= 0 && xk < uni.length && yj >= 0 && yj < uni[xk].length) {
                    if(uni[xk][yj]) {
                        veciVivos++;
                    }
                }
            }
        }
    }

    return veciVivos;
}

export function evolucionarCelula(uni, x, y, cel) {
    if(uni[x][y]) {
        if(cel<2) {
            return false;
        } else if(cel==2 || cel==3) {
            return true;
        } else {
            return false;
        }
    } else {
        if(cel==3) {
            return true;
        } else {
            return false;
        }
    }
}

export function anadirPatron(uni, fil, col, patron) {
    console.log("Fila:", fil);
    console.log("Columna:", col);
    console.log("Patrón:", patron);

    const filaInicio = fil - 1;
    const colInicio = col - 1;

    console.log("Fila final:", filaInicio + patron.altura);
    console.log("Columna final:", colInicio + patron.ancho);

    if (
        filaInicio + patron.altura < uni.length &&
        colInicio + patron.ancho < uni[0].length
    ) {
        
        if(patron.nombre == "Bloque") {
            for(let i = 0; i<2; i++) {
                for(let y = 0; y<2; y++) {
                    uni[fil+i][col+y]=true;
                }
            }
        }
        
    }
    return uni;
    
}