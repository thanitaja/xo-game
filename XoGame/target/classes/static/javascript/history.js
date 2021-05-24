let c, ctx, size;
let positionDraw = {
    x:0,
    y:0
}

async function drawXO() {
    if (playerX.x.length + playerO.x != 0) {
        console.log(" PO ==== " + playerO.x +" , " +playerO.y);
        console.log(" PX ==== " +playerX.x+" , " +playerX.y);
        console.log(turn);

        if (turn == "O") {
            await delay();
            ctx.beginPath();
            ctx.arc(positionDraw.x, positionDraw.y, c.width / (size * 3), 0, 2 * Math.PI);
            ctx.stroke();

            turn = "X";

        } else if (turn == "X") {
            await delay();
            ctx.beginPath();
            let xr = c.width/ (size * 3);
            ctx.moveTo(parseFloat(positionDraw.x) - xr, parseFloat(positionDraw.y) - xr);
            ctx.lineTo(parseFloat(positionDraw.x) + xr, parseFloat(positionDraw.y) + xr);
            ctx.moveTo(parseFloat(positionDraw.x) + xr, parseFloat(positionDraw.y) - xr);
            ctx.lineTo(parseFloat(positionDraw.x) - xr, parseFloat(positionDraw.y) + xr);
            ctx.stroke();

            turn = "O";
        }

        document.getElementById("turn").innerText = "This turn : " + turn;

        await drawXO();
    }

    if (winner === "D") {
        document.getElementById("turn").innerText = " Draw !";

    } else if (winner == "X") {
        document.getElementById("turn").innerText =  " X WIN !";

    } else if (winner == "O") {
        document.getElementById("turn").innerText = " O WIN !";

    }
}

async function replay() {
    document.getElementById("replay").style.display = "none";
    c = document.getElementById("board-game");
    ctx = c.getContext("2d");
    size = parseInt(document.getElementById("size-input").value);
    let w = c.width / size;
    let h = c.height / size;

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
    playerX.x.reverse();
    playerX.y.reverse();
    playerO.x.reverse();
    playerO.y.reverse();
    await drawXO();
}

function setPositionDraw() {
    if (turn == "X") {
        positionDraw.x = playerX.x.pop();
        positionDraw.y = playerX.y.pop();

    } else if (turn == "O") {
        positionDraw.x = playerO.x.pop();
        positionDraw.y = playerO.y.pop();
    }
}

function delay() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(setPositionDraw());
        }, 1000);
    });
}
