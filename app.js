let gameseq = [];
let userseq = [];
let score = [];
let starter = false;
let level = 0;
let max;

let h2 = document.querySelector('h2');
let color = ["red", "purple", "aqua", "pink"];
let show = document.querySelector('#highScore');
let button = document.querySelector('button');

button.addEventListener("click", function () {
    if (starter == false) {
        console.log("Game Started!");
        starter = true;

        levelUp();
    }
});

function checkSeq(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelUp, 800);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score is <b>${level}</b> <br> Press Start to Restart the Game.`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector('body').style.backgroundColor = "white";
        }, 200);
        highScore();
        reset();
    }

}

function randFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);

}

function userFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);

}

function userClickBtn() {
    let userBtn = this;
    userFlash(userBtn);

    let userColor = userBtn.getAttribute("id");
    userseq.push(userColor);

    checkSeq(userseq.length - 1);

}


function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = color[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    randFlash(randBtn);
    gameseq.push(randColor);
    console.log(gameseq);
}

let allBtn = document.querySelectorAll('.btn');
for (btns of allBtn) {
    btns.addEventListener("click", userClickBtn);
}

function reset() {
    gameseq = [];
    userseq = [];
    starter = false;
    level = 0;
}

function highScore() {
    score.push(level);
    console.log(score);
    let max = score[0];
    for (let i = 1; i < score.length; i++) {
        if (score[i] > max) {
            max = score[i];
        }
    }

    let highScore = max;
    show.innerText = `High Score is ${highScore}`;
    show.style.color = "rgb(59, 149, 60)";

}



