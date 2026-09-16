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
    let html = '';

    let randNum = Math.trunc((Math.random()*100)+1);

    

    gameWin.innerHTML = html;

}