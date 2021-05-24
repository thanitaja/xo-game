let isEnd = false;
let turn, board, size, c, ctx, firstTurn, playerCharacter, name;
let positionDraw = {
    x:0,
    y:0
}
let playerX = {
    x: new Array(),
    y: new Array()
}

let playerO = {
    x: new Array(),
    y: new Array()
}

let available = [];

async function checkPositionMouse(event) {
    if(!isEnd && turn == playerCharacter){
        let x = event.offsetX;
        let y = event.offsetY;
        let isDraw = await findPositionDrawPlayer(x, y, c.width, c.height, size);

        if(isDraw) {
            await drawXO();
        } else {
            return alert("this has a value or not your turn");
        }

    }
}

async function drawXO() {
    if (turn == "O") {
        ctx.beginPath();
        ctx.arc(positionDraw.x, positionDraw.y, c.width / (size * 3), 0, 2 * Math.PI);
        ctx.stroke();

        if(await isWin()) {
            document.getElementById("turn").innerText = turn + " WIN !";
            document.getElementById("give-up").style.display = "none";
            document.getElementById("save").style.display = null;
            isEnd = true;
            return true;
        }

        turn = "X";

    } else if (turn == "X") {
        ctx.beginPath();
        let xr = c.width/ (size * 3);
        ctx.moveTo(parseFloat(positionDraw.x) - xr, parseFloat(positionDraw.y) - xr);
        ctx.lineTo(parseFloat(positionDraw.x) + xr, parseFloat(positionDraw.y) + xr);
        ctx.moveTo(parseFloat(positionDraw.x) + xr, parseFloat(positionDraw.y) - xr);
        ctx.lineTo(parseFloat(positionDraw.x) - xr, parseFloat(positionDraw.y) + xr);
        ctx.stroke();

        if(await isWin()) {
            document.getElementById("turn").innerText = turn + " WIN !";
            document.getElementById("give-up").style.display = "none"
            document.getElementById("save").style.display = null;
            isEnd = true;
            return true;
        }

        turn = "O";
    }

    document.getElementById("turn").innerText = "This turn : " + turn;

    if(available.length == 0) {
        turn = "D";
        document.getElementById("turn").innerText = "Draw !!";
        document.getElementById("give-up").style.display = "none";
        document.getElementById("save").style.display = null;

    } else if (playerCharacter != turn) {
        await botTurn();
    }
}

async function createBoard() {
    let players = ["X", "O"];
    const random = Math.floor(Math.random() * players.length);
    turn = players[random];
    firstTurn = players[random];
    playerCharacter = document.getElementById("player-input").value;
    size = parseInt(document.getElementById("size-input").value);
    name = document.getElementById("name-input").value;
    if (!isCreateBoard(size, name)) {
        return alert("name or size is wrong");
    }

    c = document.getElementById("board-game");
    ctx = c.getContext("2d");

    let w = c.width / size;
    let h = c.height / size;

    createBoardArr(size, w, h);

    ctx.beginPath();
    for (let i = 1 ; i < size ; i++) {
        // line column
        ctx.moveTo(w * i, 0);
        ctx.lineTo(w * i, c.height);

        // line row
        ctx.moveTo(0, h * i);
        ctx.lineTo(c.width, h * i);
    }
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#E0CF44';
    ctx.stroke();

    document.getElementById("name-input").disabled = true;
    document.getElementById("name-input").style.background = '#fff9c8';
    document.getElementById("size-input").disabled = true;
    document.getElementById("size-input").style.background = '#fff9c8';
    document.getElementById("player-input").disabled = true;
    document.getElementById("player-input").style.background = '#fff9c8';
    document.getElementById("back").style.display = "none";
    document.getElementById("go").style.display = "none";
    document.getElementById("button-action").style.display = null;
    document.getElementById("turn").innerText = "This turn : " + turn;

    //Check Turn
    if(playerCharacter != firstTurn) {
        await botTurn();
    }

}

function isCreateBoard(size, name) {
    return !isNaN(size) && (size >= 3 && size <= 50) && name != "";
}

function createBoardArr(size, w, h) {
    board = new Array(size);

    for (let i = 0; i < size; i++) {
        board[i] = new Array(size);
        for (let j = 0; j < size; j++) {
           available.push([i, j]);
           board[i][j] = ((h*j) + (h/2)) + "," + ((w*i) +(w/2));
        }
    }
}

async function findPositionDrawPlayer(xPoint, yPoint, cWidth, cHeight, size) {
    let w = cWidth / size;
    let h = cHeight / size;

    for (let i = 0 ; i < size  ; i++) {
        let left = w * i;
        let right = w * (i+1);
        for (let j = 0 ; j < size  ; j++) {
            let top = h * j;
            let bottom = h * (j+1);
            if((xPoint > left) && (xPoint < right) && (yPoint > top) && (yPoint < bottom)) {
                positionDraw.x = left + (w/2) ;
                positionDraw.y = top + (h/2);

                //set xo in board
                if (board[j][i] == "X" || board[j][i] == "O") {
                    return false;

                } else {
                    board[j][i] = turn;

                    //delete available
                    let index = available.findIndex(a=> a[0] == j && a[1] == i);
                    await available.splice(index, 1);
                    addPositionToArr();
                    return true;
                }

            }
        }
    }
}

function addPositionToArr() {
    if(turn == "X") {
        playerX.x.push(positionDraw.x);
        playerX.y.push(positionDraw.y);
    } else {
        playerO.x.push(positionDraw.x);
        playerO.y.push(positionDraw.y);
    }
}


async function botTurn() {
    const random = Math.floor(Math.random() * available.length);
    let point = board[available[random][0]][available[random][1]];
    positionDraw.x = point.split(',')[0];
    positionDraw.y = point.split(',')[1];
    addPositionToArr();
    board[available[random][0]][available[random][1]] = turn;
    available.splice(random, 1);

    await drawXO();
}

function giveUp() {
    isEnd = true;
    if (turn == "X") {
        document.getElementById("turn").innerText = " O WIN !";
        document.getElementById("give-up").style.display = "none"
        turn = "O";
        alert(" O WIN ! ")
    } else {
        document.getElementById("turn").innerText = " X WIN !";
        document.getElementById("give-up").style.display = "none"
        turn = "X";
        alert(" X WIN ! ")
    }
    document.getElementById("save").style.display = null;
}

function isWin() {
    let diagonal1 = new Array();
    let diagonal2 = new Array();

    for (let i = 0; i < size; i++) {
        let horizontal = new Array();
        for(let j = 0; j < size ; j++) {
            horizontal.push(board[j][i]);

            if (j == i) {
                diagonal1.push(board[i][j]);

            }

            if (j == size - i - 1 ) {
                diagonal2.push(board[i][j]);
            }
        }
        // Vertical
        if (board[i].every((v,j) => v == turn)) {
            return true;
        }

        //horizontal
        if (horizontal.every((v,j) => v == turn)) {
            return true;
        }
    }
    //Diagonal
    if (diagonal1.every((v,j) => v == turn)) {
        return true;
    }
    console.log(diagonal2)
    if (diagonal2.every((v,j) => v == turn)) {
        return true;
    }

}

function restart() {
    location.reload();
}

function saveHistory() {
    $.ajax({
        type: 'POST',
        url: '/save-history',
        contentType: 'application/json',
        data: JSON.stringify({
            name: name,
            size: size,
            character: playerCharacter,
            firstTurn: firstTurn,
            winner: turn,
            playerX: playerX,
            playerO: playerO
        }),
        success: function() {
            alert("success");
            document.getElementById("save").disabled = true;
        }
    });
}