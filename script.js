
const gameboard = document.getElementById("gameboard"); /* get the element gameboard in the document */
const startCells = ["", "", "", "", "", "", "", "", ""]; /* creates empty cells in the board*/
let turn = "circle"; /* turn variable is set to circle*/
const infoDisplay = document.getElementById("info"); /* variable to display info to players*/
infoDisplay.innerHTML = "Circle goes first"; /* initial value for infoDisplay variable */
infoDisplay.style.fontSize = "x-large"; /* style for infoDisplay variable */
restart = false; /* checks to see if game can restart*/

createBoard(); /* creates the board and starts the application*/

const winConditions = [ /* possible options to win the game */
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]; 

/* function to create the game board */
function createBoard() {
    document.getElementById("restart").style.display = "none"; /* sets the restart to not display (invisible) */
    startCells.forEach((cell, index) => { /* for each cell and element, the following has to be done.  */
        const cellElement = document.createElement("div"); /* to each cell create a div element*/
        cellElement.classList.add("square"); /* fill it with a white square*/
        cellElement.id = index; /* sets the index for later identification*/
        cellElement.addEventListener("click", takeTurn); /*adds event listener to each cell waiting for a click to take a turn*/
        gameboard.append(cellElement); /* appends each square to the game board */
        console.log ("gameboard created"); /* writes action to console */
    }
    )
}

/* function to take turns*/
function takeTurn(event) { /* the event is the div element the player clicked on */
    const currentTurn = document.createElement("div"); /* turn (x or o) is created the div element */
    const c = event.currentTarget; /* c is variable for the event target*/
    console.log ("take turn " + turn); /* debugging tool */
    if (checkItem(c, turn) && !restart) { /* checks the div if x or o can be used and game is not won */
        currentTurn.classList.add(turn); /* a class list (o or x) will be displayed in the div element */
        console.log ("id = " + c.id); /*debugging tool */
        event.target.append(currentTurn); /* append x or o element to the div box clicked on*/
        if (checkState(turn)) {  /*it checks the state if current player is a winner */
            infoDisplay.textContent = turn + "'s is a winner"; /* it returns a message if current player is a winner*/
            restart = true; /* restart button is available to restart the game */
            document.getElementById("restart").style.display = "inline"; /* button becomes visible*/
        }
        else { /* if it is not a winning move, players continue */
            if (turn === "circle") { /* check if current player i circle turn */
                turn = "x"; /* switches to player x */
            }
            else { /* if it is not a circle*/
                turn = "circle"; /* player is circle*/
            }
            infoDisplay.textContent = "It is now " + turn + "'s turn."; /* Info message is displayed to show who's turn it is. */
        }
    }
}

/* checks a single cell to see if x or o can be entered*/
function checkItem(element, turn) {
    id = element.id;
    console.log ("check item id " + id);
    if (startCells[id]  == "") { /* if the cell is empty */
        startCells[id] = turn; /* turn adds x or circle */
        return true; /* returns a true */
    }
    return false; /* if x or o cannot be entered, it returns a false */
}

/* function to determine a winner */
function checkState(turn) {
    result = false; /* default that turn cannot be made */
    winConditions.forEach(function (a) { /* it iterates through each element in the win condition to */
        if (startCells[a[0]] == turn && startCells[a[1]] == turn && startCells[a[2]] == turn) { /* check each element with the start cells */
            result = true; /* if it matches the winning condition it is true */
        }
    });
    return result; /* returns the result */
}


