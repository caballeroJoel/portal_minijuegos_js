const game1B = document.querySelector("#game1");
const game2B = document.querySelector("#game2");
const game3B = document.querySelector("#game3");

const disGame = document.querySelector("#displayGame");
const gameWin = document.querySelector("#gameWindows");

let last5 = [];

game1B.addEventListener("click", (e) => {
    e.stopPropagation();
    applyGame(1);
});
game2B.addEventListener("click", (e) => {
    e.stopPropagation();
    applyGame(2);
});
game3B.addEventListener("click", (e) => {
    e.stopPropagation();
    applyGame(3);
});


function applyGame(numGame) {
    disGame.classList.remove("hidden");

    switch(numGame) {
        case 1:
            guessTheNumber();
            break;
        case 2:
            pacman();
            break;
        case 3:
            lifesGame();
            break;
    }

}

window.addEventListener("click", function(e) {
    if(e.target.classList.contains("display_game")) {
        disGame.classList.add("hidden");
        gameWin.innerHTML = "";
    }
})

function newFirst(array, nuevoNumero) {
    array.unshift(nuevoNumero);
    
    if (array.length > 5) {
        array.pop();
    }
    
    return array;
}

function guessTheNumber() {
    console.log(last5);
    let tabla = "", h="";

    for(let i=0; i<5; i++) {
        h+=`<td>${last5[i]??""}</td>`;
    }

    tabla = `
        <table>
            <tr>
                ${h}
            </tr>
        </table>
    `;

    let html = `
        <div class="guess_the_number">
            <div class="title_history">
                <h2>Adivina el numero</h2>
                <div class="last5">
                    <p>Últimas 5 partidas</p>
                    ${tabla}
                </div>
            </div>
            <div class="game">
                <div class="hist_nums">
                    <div class="col_hnums" id="attempts">
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                </div>
                <div class="interact_nums">
                    <p class="msg_num" id="msgNum">Adivina el numero</p>
                    <input type="number" name="guessNum" id="guessNum">
                </div>
            </div>
        </div>
    `;
    gameWin.innerHTML = html;

    let randNum = Math.trunc((Math.random()*100)+1);
    console.log(randNum);
    let intentos = 0;

    const attempts = document.querySelectorAll("#attempts p");
    const guessNum = document.querySelector("#guessNum");
    const msgNum = document.querySelector("#msgNum");
    guessNum.addEventListener("change", relNum);


    function relNum() {
        numPlay = guessNum.value;
        if(numPlay > 99 || numPlay < 1) {
            msgNum.textContent = "El numero debe estar entre 1 y 100";
            exit;
        }
        
        attempts[intentos].textContent = numPlay;
        intentos++;
        
        if(randNum > numPlay) {
            msgNum.textContent = "El numero es mayor";
            guessNum.value = "";    
        } else if(randNum < numPlay) {
            msgNum.textContent = "El numero es menor";
            guessNum.value = "";    
        } else if(randNum == numPlay) {
            msgNum.textContent = "!! HAS ACERTADO !!";
            guessNum.disabled = true;   
            newFirst(last5, intentos+" int.");
        }
        
        if(intentos==10 && randNum != numPlay) {
            msgNum.textContent = `Has perdido, el numero era ${randNum}`;
            guessNum.disabled = true;
            newFirst(last5, "Lost");
        }

    }

}

function pacman() {

    let html='', startHtml='';

    startHtml = `
        <div class="pacman_game">
            <div class="main_game">
                <div class="start_pacman">
                    <h2>Pacman</h2>
                    <img src="./img/img_game_2.png" alt="Pacman">
                    <button id="startPacman">Iniciar</button>
                </div>
            </div>
        </div>
    `;

    html = `
        <div class="pacman_game">
            <div class="main_game">
                <div class="mapa">
                    <table id="mapaLog" class="mapa-log"></table>
                </div>
            </div>
        </div>
    `;

    gameWin.innerHTML = startHtml;

    const startPacmanButton = document
        .querySelector("#startPacman")
        .addEventListener("click", function(e) {

            gameWin.innerHTML = html;
        
            const mapaLog = document.querySelector("#mapaLog");
        
            const mapa = [
                [{estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"pacman"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}]
            ];
        
            let pacmanObj = {
                fila: 1,
                columna: 1,
                direccion: "right"
            };
        
        
        
            function getRotacion() {
                switch (pacmanObj.direccion) {
                    case "up":
                        return -90;
                    case "down":
                        return 90;
                    case "left":
                        return 180;
                    case "right":
                        return 0;
                }
            }
        
        
            function renderMap() {
                mapaLog.innerHTML = "";
                for(let fila in mapa) {
                    mapaLog.innerHTML += `<tr>`;
                    
                    let html='';
                    for(let j=0; j<mapa[fila].length; j++) {
                        if(mapa[fila][j].estado === "pacman") {
                            html += `
                                <td class="${mapa[fila][j].estado}">
                                    <div class="pacman-player" style="transform: rotate(${getRotacion()}deg)"></div>
                                </td>
                            `;
                        } else {
                            html += `<td class="${mapa[fila][j].estado}"></td>`;
                        }
                    }
                    mapaLog.innerHTML += html;
                    mapaLog.innerHTML += `</tr>`;
                }
            }
        
            document.addEventListener("keydown", function(e) {
                if(e.key === "ArrowUp" || e.key === "w") {
                    pacmanObj.direccion = "up";
                    const nuevaFila = pacmanObj.fila - 1;
                    
                    if (mapa[nuevaFila][pacmanObj.columna].estado !== "pared") {
                        mapa[pacmanObj.fila][pacmanObj.columna].estado = "libre";
        
                        pacmanObj.fila = nuevaFila;
        
                        mapa[pacmanObj.fila][pacmanObj.columna].estado = "pacman";
        
                        renderMap();
                    }
                }
                if(e.key === "ArrowDown" || e.key === "s") {
                    pacmanObj.direccion = "down";
                    const nuevaFila = pacmanObj.fila + 1;
                    
                    if (mapa[nuevaFila][pacmanObj.columna].estado !== "pared") {
                        mapa[pacmanObj.fila][pacmanObj.columna].estado = "libre";
        
                        pacmanObj.fila = nuevaFila;
        
                        mapa[pacmanObj.fila][pacmanObj.columna].estado = "pacman";
        
                        renderMap();
                    }
                }
                if(e.key === "ArrowLeft" || e.key === "a") {
                    pacmanObj.direccion = "left";
                    const nuevaColumna = pacmanObj.columna - 1;
                    
                    if (mapa[pacmanObj.fila][nuevaColumna].estado !== "pared") {
                        mapa[pacmanObj.fila][pacmanObj.columna].estado = "libre";
        
                        pacmanObj.columna = nuevaColumna;
        
                        mapa[pacmanObj.fila][pacmanObj.columna].estado = "pacman";
        
                        renderMap();
                    }
                }
                if(e.key === "ArrowRight" || e.key === "d") {
                    pacmanObj.direccion = "right";
                    const nuevaColumna = pacmanObj.columna + 1;
                    
                    if (mapa[pacmanObj.fila][nuevaColumna].estado !== "pared") {
                        mapa[pacmanObj.fila][pacmanObj.columna].estado = "libre";
        
                        pacmanObj.columna = nuevaColumna;
        
                        mapa[pacmanObj.fila][pacmanObj.columna].estado = "pacman";
        
                        renderMap();
                    }
                }
        
            });
        
            renderMap();
        });

}