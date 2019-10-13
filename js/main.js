'use strict'

var gTableSize = 16;
var gNums = createNumsArray();
var gCounter = 1;

var gameInterval;

renderBoard()





function renderBoard() {
    var strHTML = '';
    var len = Math.sqrt(gTableSize);
    var idx = 0;
    var nums = shuffleNums();

    for (var i = 0; i < len; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < len; j++) {
            strHTML += `<td class="" onclick="cellClicked(this)" >${nums[idx]}`
            strHTML += '</td>';
            idx++;
        }
        strHTML += '</tr>'
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}


function startGame() {
    gNums = createNumsArray();
    gCounter = 1;
    renderBoard();
    var elnum = document.querySelector('h3.nextNum');
    elnum.innerHTML = gCounter;
}

function changeSizeSmall() {
    gTableSize = 16;
    startGame();
}

function changeSizeMidium() {
    gTableSize = 25;
    startGame();
}

function changeSizeBig() {
    gTableSize = 36;
    startGame();
}

function cellClicked(elCell) {
    var num = elCell.innerHTML;
    if (+num === gCounter) {

        if (gCounter === 1) {
            var time = 0;
            gameInterval = setInterval(function () {
                time += 100;
                var showTime = (time / 1000).toFixed(3)
                if (gCounter === gTableSize + 1) {
                    clearInterval(gameInterval);
                }
                var elTime = document.querySelector('h3.time');
                elTime.innerHTML = showTime;
            }, 100)

        }
        elCell.style.backgroundColor = "green";
        gCounter++;

        var elnum = document.querySelector('h3.nextNum');
        if (gCounter === gTableSize + 1) {
            elnum.innerHTML = 'you won'
        }else {
            elnum.innerHTML = gCounter;    
        }
        
    }
}


function shuffleNums() {
    var res = [];
    for (var i = 0; i < gTableSize; i++) {
        var randIdx = getRandomInteger(0, gNums.length - 1);
        var currNum = gNums[randIdx];
        res.push(currNum);
        gNums.splice(randIdx, 1);
    }
    gNums = createNumsArray();

    return res;
}


function createNumsArray() {
    var nums = [];
    for (var i = 1; i <= gTableSize; i++) {
        nums.push(i);
    }
    return nums;
}


function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}