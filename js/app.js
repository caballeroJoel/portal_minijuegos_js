const game1B = document.querySelector("#game1");
const game2B = document.querySelector("#game2");
const game3B = document.querySelector("#game3");

const disGame = document.querySelector("#displayGame");
const gameWin = document.querySelector("#gameWindows");

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

function guessTheNumber() {
    let html = `
        <div class="guess_the_number">
            <h2>Adivina el numero</h2>
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
        }
        
        if(intentos==10 && randNum != numPlay) {
            msgNum.textContent = `Has perdido, el numero era ${randNum}`;
            guessNum.disabled = true;
        }

    }

}