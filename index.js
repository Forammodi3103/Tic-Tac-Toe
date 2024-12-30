// fetch parameters
// all is use for all 9 boxes
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// create variables
let currentPlayer;
// array hase
let gameGrid;

// which are the winnig boxes pattern?
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//for things in starting
function initGame() {
    // display current player name. Here default is x(for starting)
    currentPlayer = "X";
    // making all grids empty
    gameGrid = ["","","","","","","","",""];

    // adding event listener
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    // new game button ne hide karva
    newGameBtn.classList.remove("active");
    // finding current player value
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
// calling function to display who is playing
initGame();

// making function
function swapTurn() {
    // jo current player x che tohh hve O no turn avse
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update for current player
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// making function
// check if game over or not
function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    //it means we have a winner
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

// making function
function handleClick(index) {
    // jo click karelo box empty che tohh j agal ni process thase
    if(gameGrid[index] === "" ) {
        // aa box ni ander current palyer nakho
        // UI ma change karse
        boxes[index].innerText = currentPlayer;
        // apde code ma j epmty grid banavi che starting ma ama jse
        gameGrid[index] = currentPlayer;
        // j pn box ni vaat thay che tya thi pointer remove karo
        boxes[index].style.pointerEvents = "none";
        // swap karse turn
        swapTurn();
        //check karse koi giti nathi gau ne!
        checkGameOver();
    }
}

// adding event listener to all boxes
// darek box mate
boxes.forEach((box, index) => {
    // jyare click thse tyare
    box.addEventListener("click", () => {
        // kaya number na index pr click kariu
        handleClick(index);
    })
});

// new button pr click thay tohh navi game chalu thay
newGameBtn.addEventListener("click", initGame);