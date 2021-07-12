let board = [];
let btnArr = [];
let colourArr = [
                    ["red", "lime"],
                    ["yellow", "blue"]
                ];
let table = document.getElementById("board");
let dispLevel = document.getElementById("level");
let pattern = [];
let patternLength = 0;
let cIndex = 0;
const size = 4;
const opacity = "0.3";
for(let i = 0; i < size/2; i++) {
    let row = table.insertRow();
    board.push([]);
    btnArr.push([]);
    for(let j = 0; j < size/2; j++) {
        let cell = row.insertCell();
        let button = document.createElement("button");
        button.className = "gameTiles";
        button.x = j;
        button.y = i;
        button.onclick = clickTile;
        button.style = "background-color: " + colourArr[i][j];
        button.style.opacity = opacity;
        board[i].push(0);
        btnArr[i].push(button);
        cell.appendChild(button);
    }
}

function displayLevel() {
    dispLevel.innerHTML = "Level " + (patternLength + 1).toString();
}

function compClick(i) {
    console.log(i)
    btnArr[pattern[i][0]][pattern[i][1]].style.opacity = "1";
    setTimeout(function() { compUnclick(i) }, 1000);
}

function compUnclick(i) {
    btnArr[pattern[i][0]][pattern[i][1]].style.opacity = opacity;
}

function playPattern() {
    const blink = function(i = 0) {
        compClick(i);
        if(i < patternLength - 1) setTimeout(function() { blink(i + 1) }, 1500);
    }
    blink();
}

function addAndPlay(add, increase, play) {
    if(add == true) {
        let randRow = Math.floor(Math.random() * (size/2));
        let randCol = Math.floor(Math.random() * (size/2));
        pattern.push([randRow, randCol]);
        patternLength++;
    }
    if(increase == true) cIndex++;
    if(play == true) playPattern();
}

displayLevel();
addAndPlay(true, false, true);

function clickTile() {
    if(this.y == pattern[cIndex][0] && this.x == pattern[cIndex][1]) {
        if(cIndex == (patternLength - 1)) {
            alert("Correct, next level!");
            cIndex = 0;
            displayLevel();
            addAndPlay(true, false, true);
        } else {
            addAndPlay(false, true, false);
        }
    } else {
        alert("Incorrect, start over!");
        cIndex = 0
        pattern = [];
        patternLength = 0;
        displayLevel();
        addAndPlay(true, false, true);
    }
}