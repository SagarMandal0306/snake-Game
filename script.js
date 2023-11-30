let foodx;
let foody;
let headx = 3;
let heady = 15;
let playBord = document.querySelector(".bord");
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let GameOver = false;
let currentScore = 0;
let score = document.querySelector(".score");
let highScoreElement = document.querySelector(".high-score");
let control = document.querySelectorAll(".arrow");
let mfood = new Audio("music/food.mp3");
let mgo = new Audio("music/gameover.mp3");
let move = new Audio("music/move.mp3");
let music = new Audio("music/music.mp3");
let game = document.querySelector(".game");
let menu = document.querySelector(".menu");
let stlogic;
let bord = document.querySelector(".bord");
let high = 0;

// music.play();

const changeFoodPosition = () => {
  //random logic for food
  foodx = Math.floor(Math.random() * 20) + 1;
  foody = Math.floor(Math.random() * 20) + 1;
};

const gameOver = () => {
  clearInterval(stlogic);
  mgo.play();
  alert("GameOver");
  location.reload();
};

const changeSnakeDirection = (e) => {
  //logic of changing the direction
  move.play();
  if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  }
};

control.forEach((key) => {
  key.addEventListener("click", () =>
    changeSnakeDirection({ key: key.dataset.key })
  );
});

// easy game logic
function EasyLogicGame() {
  let HighScore = localStorage.getItem("high-score") || 0;
  highScoreElement.innerText = `High-Score:${HighScore}`;
  if (GameOver) return gameOver();
  else {
    high = 1;
    menu.style.display = "none";
    game.style.filter = "none";
    //create food
    let htmlmarkup = `<div class="food" style="grid-area:${foody}/${foodx}"><img src="img/apple.png" alt=""  ></div>`;

    //when eating the food change the position of food
    if (headx === foodx && heady === foody) {
      mfood.play();
      changeFoodPosition();
      snakeBody.push([foodx, foody]);
      currentScore++;

      score.innerText = `Score:${currentScore}`;
      HighScore = currentScore >= HighScore ? currentScore : HighScore;
      localStorage.setItem("high-score", HighScore);
      highScoreElement.innerText = `High-Score:${HighScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
      // console.log(snakeBody[i]);
    }
    snakeBody[0] = [headx, heady];
    // console.log(snakeBody);

    headx += velocityX;
    heady += velocityY;

    if (headx <= 0 || headx > 20 || heady <= 0 || heady > 20) {
      GameOver = true;
    }

    for (let i = 1; i < snakeBody.length; i++) {
      if (
        snakeBody[0][0] === snakeBody[i][0] &&
        snakeBody[0][1] === snakeBody[i][1]
      ) {
        GameOver = true;
      }
    }

    //updating a bord by add snake head
    for (let i = 0; i < snakeBody.length; i++) {
      if (i === 0) {
        htmlmarkup += `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"><img src="img/snake.png" alt=""  ></div>`;
      } else {
        htmlmarkup += `<div class="body" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
      }
    }
    playBord.innerHTML = htmlmarkup;
  }
}

let easy = document.getElementById("easy");
easy.addEventListener("click", () => {
  // easyMethod();
  stlogic = setInterval(EasyLogicGame, 300);
});




function MediumLogicGame() {
  let MHighScore = localStorage.getItem("mhigh-score") || 0;
  highScoreElement.innerText = `High-Score:${MHighScore}`;
  if (GameOver) return gameOver();
  else {
    
    menu.style.display = "none";
    game.style.filter = "none";
    bord.style.gridTemplate = "repeat(25,1fr)/repeat(25,1fr)";
    //create food
    let htmlmarkup = `<div class="food" style="grid-area:${foody}/${foodx}"><img src="img/apple.png" alt=""  ></div>`;

    //when eating the food change the position of food
    if (headx === foodx && heady === foody) {
      mfood.play();
      foodx = Math.floor(Math.random() * 25) + 1;
      foody = Math.floor(Math.random() * 25) + 1;
      snakeBody.push([foodx, foody]);
      currentScore++;
      score.innerText = `Score:${currentScore}`;
      MHighScore = currentScore >= MHighScore ? currentScore : MHighScore;
      localStorage.setItem("mhigh-score", MHighScore);
      highScoreElement.innerText = `High-Score:${MHighScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
      // console.log(snakeBody[i]);
          }
    snakeBody[0] = [headx, heady];
    // console.log(snakeBody);

    headx += velocityX;
    heady += velocityY;

    if (headx <= 0 || headx > 25 || heady <= 0 || heady > 25) {
      GameOver = true;
    }

    for (let i = 1; i < snakeBody.length; i++) {
      if (
        snakeBody[0][0] === snakeBody[i][0] &&
        snakeBody[0][1] === snakeBody[i][1]
      ) {
        GameOver = true;
      }
    }

    //updating a bord by add snake head
    for (let i = 0; i < snakeBody.length; i++) {
      if (i === 0) {
        htmlmarkup += `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"><img src="img/snake.png" alt=""  ></div>`;
      } else {
        htmlmarkup += `<div class="body" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
      }
    }
    playBord.innerHTML = htmlmarkup;
  }
}

let medium = document.getElementById("medium");
medium.addEventListener("click", () => {
  // easyMethod();
  stlogic = setInterval(MediumLogicGame, 200);
});



function HardLogicGame() {
  let HHighScore = localStorage.getItem("hhigh-score") || 0;
  highScoreElement.innerText = `High-Score:${HHighScore}`;
  if (GameOver) return gameOver();
  else {
    high = 2;
    menu.style.display = "none";
    game.style.filter = "none";
    bord.style.gridTemplate = "repeat(30,1fr)/repeat(30,1fr)";
    //create food
    let htmlmarkup = `<div class="food" style="grid-area:${foody}/${foodx}"><img src="img/apple.png" alt=""  ></div>`;

    //when eating the food change the position of food
    if (headx === foodx && heady === foody) {
      mfood.play();
      foodx = Math.floor(Math.random() * 30) + 1;
      foody = Math.floor(Math.random() * 30) + 1;
      snakeBody.push([foodx, foody]);
      currentScore++;
      score.innerText = `Score:${currentScore}`;
      HHighScore = currentScore >= HHighScore ? currentScore : HHighScore;
      localStorage.setItem("hhigh-score", HHighScore);
      highScoreElement.innerText = `High-Score:${HHighScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
      // console.log(snakeBody[i]);
    }
    snakeBody[0] = [headx, heady];
    // console.log(snakeBody);

    headx += velocityX;
    heady += velocityY;

    if (headx <= 0 || headx > 30 || heady <= 0 || heady > 30) {
      GameOver = true;
    }

    for (let i = 1; i < snakeBody.length; i++) {
      if (
        snakeBody[0][0] === snakeBody[i][0] &&
        snakeBody[0][1] === snakeBody[i][1]
      ) {
        GameOver = true;
      }
    }

    //updating a bord by add snake head
    for (let i = 0; i < snakeBody.length; i++) {
      if (i === 0) {
        htmlmarkup += `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"><img src="img/snake.png" alt=""  ></div>`;
      } else {
        htmlmarkup += `<div class="body" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
      }
    }
    playBord.innerHTML = htmlmarkup;
  }
}

let hard=document.querySelector("#hard");
hard.addEventListener("click", () => {
  // easyMethod();
  stlogic = setInterval(HardLogicGame, 100);
});

//change the direction using arrow keys
document.addEventListener("keydown", changeSnakeDirection);

changeFoodPosition();


// let easyMethod=()=>{
//    setInterval(EasyLogicGame, 500);
// }


/* here in logicGame() whene sneak eat the food the food position is add in snakeBody[] then after in the another loop the food position is in 1st index and the 1st index value is assign in 0th index then the head movement is countinue then the another loop is run in this loop the snakeBody's index by the snake html div is print and so on.  */
