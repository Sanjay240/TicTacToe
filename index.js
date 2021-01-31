window.addEventListener("load", function () {
    let gameView = document.getElementById("gamepage"); // this is the game screen
    gameView.style.display = "none";
    document.getElementById("helpInformation").style.display = "none"; // this is help information screen
    let informationForm = document.getElementById("userform"); // this is the user form screen
    informationForm.style.display = "inherit";

    let firstPlayerName; // stores first player name
    let secondPlayerName; // stores second player name
    let firstPlayerColor; // stores first player color selection
    let secondPlayerColor; // stores second player color selection
    let currentPlayer = "Current Player"; // track the current player of game
    let firstPlayerWins = 0; // stores first player wins
    let secondPlayerWins = 0; // stores second player wins

    /**
     * function handles the submit form activity assign values to all variables 
     * retrived from the form.
     */
    document.getElementById("userform").addEventListener("submit", function (e) {
        e.preventDefault();
        gameView.style.display = "inherit";
        informationForm.style.display = "none";
        document.getElementById("helpInformation").style.display = "none";
        firstPlayerName = document.getElementById("name1").value;
        secondPlayerName = document.getElementById("name2").value;
        firstPlayerColor = document.getElementById("color1").value;
        secondPlayerColor = document.getElementById("color2").value;
        currentPlayer = firstPlayerName;
        ouputHandler();

    });

    let gameActive = true; // tracks the game status
    let cellText = "X"; // manages the cell text either "X" or "O"
    let gameState = ["", "", "", "", "", "", "", "", ""]; //this list stores the text at each cell in table
    
    let tableCells = []; // list stores all the table cells
    for (let i = 0; i < 9; i++) {
        tableCells[i] = document.getElementById("cell" + i);
    }
    /* These are all the possible winning conditions */
    let winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    /**
     * This function controls the ouput displayed tho the user
     * Players name in their choice of color and the scores of each
     * individual player.
     */
    function ouputHandler() {
        let currentPlayerStatus = document.getElementById("currentPlayer");
        let firstPlayerNameStatus = document.getElementById("firstplayername");
        let firstPlayerScoreStatus = document.getElementById("firstplayerscore");
        let secondPlayerNameStatus = document.getElementById("secondplayername");
        let secondPlayerScorestatus = document.getElementById("secondplayerscore");
        currentPlayerStatus.innerHTML = currentPlayer + " : " + cellText;
        firstPlayerNameStatus.innerHTML = firstPlayerName;
        firstPlayerNameStatus.style.color = firstPlayerColor;
        firstPlayerScoreStatus.innerHTML = firstPlayerWins;
        secondPlayerNameStatus.innerHTML = secondPlayerName;
        secondPlayerNameStatus.style.color = secondPlayerColor;
        secondPlayerScorestatus.innerHTML = secondPlayerWins;

    }
    /**
     * This function is called when the cell is clicked and will get the cell index and checks 
     * if cell is empty or not.
     * @param {*} e 
     */
    function handleClickedCell(e) {
        clickedCell = e.target; //
        for (let i = 0; i < 9; i++) {
            if (tableCells[i] === clickedCell) {
                clickedCellIndex = i;
                break;
            }
        }
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        } else {
            handleCellPlayed(clickedCell, clickedCellIndex);
            handleResultValidation();
        }
    }
    /**
     * this function will load the the game state list with the cellText at the index cell is clicked.
     * @param {*} clickedCell 
     * @param {*} clickedCellIndex 
     */
    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = cellText;
        clickedCell.innerHTML = cellText;
    }

    /**
     * 
     */
    function handlePlayer() {
        if (currentPlayer === firstPlayerName) {
            currentPlayer = secondPlayerName;
            cellText = "O";
        } else {
            currentPlayer = firstPlayerName;
            cellText = "X";
        }
    }
    /**
     * This function handles the result validation after every click the result are checked it the match found then 
     * player wins otherwise match continues untill all cells are filled.
     */
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            console.log("Loop for "+i+"times"+ a+","+b+","+c);
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                for (let i = 0; i < 3; i++) {
                    tableCells[winCondition[i]].style.backgroundColor = "blue";
                }
                break;
            }
           
        }

        if (roundWon) {
            if (currentPlayer === firstPlayerName) {
                firstPlayerWins += 1;
            } else if (currentPlayer === secondPlayerName) {
                secondPlayerWins += 1;
            }
            gameActive = false;
            ouputHandler();
            return;
        }
        let roundDraw = true;
        for (let i = 0; i < 9; i++) {
            if (gameState[i] === "") {
                roundDraw = false;
                break;
            }
        }
        if (roundDraw) {
            gameActive = false;
            return;
        }
        handlePlayer();
        ouputHandler();

    }
    /**
     * This funcion handles the help button information to apper or disappear
     */
    function helpButtonHandler() {
        document.getElementById("helpInformation").style.display = "inherit";
        document.getElementById("gamescore").style.display = "none";
    }
    /**
     * the restart function will retart the funtion and initilize all
     * the variables to null.
     */
    function restartButtonHandler() {
        gameActive = true;
        if (firstPlayerWins > secondPlayerWins) {
            currentPlayer = firstPlayerName;
            cellText = "X";
        } else {
            currentPlayer = secondPlayerName;
            cellText = "O";
        }
        gameState = ["", "", "", "", "", "", "", "", ""];
        for (let i = 0; i < 9; i++) {
            tableCells[i].innerHTML = "";
            tableCells[i].style.backgroundColor = "white";
        }

    }
    /**
     * the fuction will disappear the information page and scores will appeaara again
     */
    function doneButtonHandler() {
        document.getElementById("helpInformation").style.display = "none";
        document.getElementById("gamescore").style.display = "inherit";
    }

    for (let i = 0; i < 9; i++) {
        tableCells[i].addEventListener("click", handleClickedCell);
    }
    document.getElementById("restartgame").addEventListener("click", restartButtonHandler);
    document.getElementById("helpbutton").addEventListener("click", helpButtonHandler);
    document.getElementById("donebutton").addEventListener("click", doneButtonHandler);
})