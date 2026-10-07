import {comprobarCreacion, crearUniverso} from "./functions.js";

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
        this.clearInterval();
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
                    <div class="tit">
                        <h2 id="currentLevel">Nivel 1</h2>
                        <div>
                            <p id="tiempoContador">0 segs</p>
                            <p id="contadorKills">Hola</p>
                        </div>
                        </div>
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
            const currentLevel = document.querySelector("#currentLevel");
        
            const mapa = [
                [{estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"libre"}, {estado:"pared"}],
                [{estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"pacman"}, {estado:"libre"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}, {estado:"libre"}, {estado:"pared"}, {estado:"pared"}],
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
                fila: 6,
                columna: 8,
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

            function startGame() {
                for(let i=0; i<5; i++) {
                    let x = Math.trunc((Math.random()*17));
                    let y = Math.trunc((Math.random()*17));
    
                    
                    if(mapa[x][y].estado != "libre") {
                        i--;                    
                    } else {
                        mapa[x][y].estado="ghost";
                    }
                }
            }
            
            startGame();

            let nivel=1;
            let tiempo=0;
            let kills=0;
            let difi=500;

            let tiempoContador = document.querySelector("#tiempoContador");
            let contadorKills = document.querySelector("#contadorKills");

            let intervalo = setInterval(function() {
                tiempo++;
                tiempoContador.innerHTML = `${tiempo} segs`;
            },1000);
        
            function renderMap() {
                mapaLog.innerHTML = "";

                let fingame=true;

                mapa.forEach(row => {
                    row.forEach(cel => {
                        if(cel.estado=="ghost") {
                            fingame=false;
                        }
                    });
                });

                if(fingame==true) {
                    startGame();
                    nivel++;
                    int.clearInterval();
                    difi = 50;
                    currentLevel.innerHTML = `Nivel ${nivel}`;
                }

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
                }
                if(e.key === "ArrowDown" || e.key === "s") {
                    pacmanObj.direccion = "down";
                }
                if(e.key === "ArrowLeft" || e.key === "a") {
                    pacmanObj.direccion = "left";
                }
                if(e.key === "ArrowRight" || e.key === "d") {
                    pacmanObj.direccion = "right";
                }
            });

            let int = setInterval(function() {
                let nuevaColumna;
                let nuevaFila;

                switch(pacmanObj.direccion) {
                    case "right":
                        nuevaColumna = pacmanObj.columna + 1;
                
                        if (mapa[pacmanObj.fila][nuevaColumna].estado !== "pared") {
                            if(mapa[pacmanObj.fila][nuevaColumna].estado=="ghost") {
                                kills++;
                                contadorKills.innerHTML=`${kills} kills`;
                            }
                            mapa[pacmanObj.fila][pacmanObj.columna].estado = "libre";
            
                            pacmanObj.columna = nuevaColumna;
            
                            mapa[pacmanObj.fila][pacmanObj.columna].estado = "pacman";
                        }
                    break;
                    case "left":
                        nuevaColumna = pacmanObj.columna - 1;
                
                        if (mapa[pacmanObj.fila][nuevaColumna].estado !== "pared") {
                            if(mapa[pacmanObj.fila][nuevaColumna].estado=="ghost") {
                                kills++;
                                contadorKills.innerHTML=`${kills} kills`;
                            }
                            mapa[pacmanObj.fila][pacmanObj.columna].estado = "libre";
            
                            pacmanObj.columna = nuevaColumna;
            
                            mapa[pacmanObj.fila][pacmanObj.columna].estado = "pacman";
            
                        }
                    break;
                    case "up":
                        nuevaFila = pacmanObj.fila - 1;
                
                        if (mapa[nuevaFila][pacmanObj.columna].estado !== "pared") {
                            if(mapa[nuevaFila][pacmanObj.columna].estado=="ghost") {
                                kills++;
                                contadorKills.innerHTML=`${kills} kills`;
                            }
                            mapa[pacmanObj.fila][pacmanObj.columna].estado = "libre";
            
                            pacmanObj.fila = nuevaFila;
            
                            mapa[pacmanObj.fila][pacmanObj.columna].estado = "pacman";
            
                        }
                    break;
                    case "down":
                        nuevaFila = pacmanObj.fila + 1;
                
                        if (mapa[nuevaFila][pacmanObj.columna].estado !== "pared") {
                            if(mapa[nuevaFila][pacmanObj.columna].estado=="ghost") {
                                kills++;
                                contadorKills.innerHTML=`${kills} kills`;
                            }
                            mapa[pacmanObj.fila][pacmanObj.columna].estado = "libre";
            
                            pacmanObj.fila = nuevaFila;
            
                            mapa[pacmanObj.fila][pacmanObj.columna].estado = "pacman";
            
                        }
                    break;
                }
                renderMap();
            } , difi);
        
            renderMap();
        });

}

function lifesGame() {
    
    let html=`
        <div id="lifeGameWin" class="life-game">
            <div class="main-game">
                <h1>Bienvenido al Juego de la Vida</h1>
                <div class="selector-universo">
                    <p>Crear tu universo:</p>   
                    <div class="inputs">
                        <div>
                            <p>Numero de columnas:</p>
                            <input type="number" id="inputColumnas" value="10">
                        </div>
                        
                        <div>
                            <p>Numero de filas:</p>
                            <input type="number" id="inputFilas" value="10">
                        </div>
                    </div>
                    <p style="color: red;" id="displayError"></p>
                    <button class="crear-universo" id="btnCrearUniverso">Crear universo</button>
                </div>
            </div>
        </div>
    `;

    gameWin.innerHTML = html;

    // const lifeGameWin = document.querySelector("#lifeGameWin");
    const btnCrearUniverso = document.querySelector("#btnCrearUniverso");

    btnCrearUniverso
        .addEventListener("click", function() {
            if(comprobarCreacion()) {
                crearUniverso(inputColumnas.value, inputFilas.value);
            }
        });
        

}