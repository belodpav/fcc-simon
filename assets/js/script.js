// Simon Game Object
function simonGame (state, mode) {
    this._state = state, // 0 - off, 1 - on
    this._mode = mode, // -1 - not active, 0 - standart, 1 - stict
    this._stepsCount = 0, // 20 is the max value
    this._stepsList = [],
    this._listenerState = 0, // 0 - computer is showing an example, 1 - cumputer is listening your steps
    this._userStepsCount = 0,
    this.incUserStepsCount = function () {
        this._userStepsCount++;    
    },
    this.removeUserStepsCount = function () {
        this._userStepsCount = 0;
    },
    this.getUserStepsCount = function () {
        return this._userStepsCount;
    },
    this.getStepsCount = function () {
        return this._stepsCount;
    },
    this.getStepsList = function () {
        return this._stepsList;
    },
    this.setState = function(newState) {
        this._state = newState;
    },
    this.getState = function() {
        return this._state;
    },
    this.setMode = function(newMode) {
        this._mode = newMode;
    },
    this.getMode = function() {
        return this._mode;    
    },
    this.setListenerState = function(val) {
        this._listenerState = val;
    },
    this.getListenerState = function() {
        return this._listenerState;
    }
    this.incStepsCount = function() {
        this._stepsCount++;
    },
    this.addNewStep = function() {
        this._stepsList.push(Math.floor(Math.random()*4)+1);
    },
    this.initGame = function() {
        this._state = -1;
        this._mode = 0;
        this._stepsCount = 0;
        this._stepsList = [];
        this._listenerState = 0;
        this._userStepsCount = 0;
    }
}

var btnOff = document.getElementById("tougle-off"),
    btnOn = document.getElementById("tougle-on"),
    btnStart = document.getElementById("btn-start"),
    btnStrict = document.getElementById("btn-strict"),
    gameBtnList = document.getElementsByClassName("game-button"),
    counterDisplay = document.getElementById("app-counter"),
    bodyElement = document.getElementsByTagName("body")[0];
    

var newSimon = new simonGame(0, -1);
function showStepsList(curNum, stepsList, btnList) {
    console.log(stepsList);
    if (curNum >= stepsList.length) {
        return;
    }
    var curBtn = stepsList[curNum];
    switch (curBtn) {
            case 1:
                btnList[0].style.backgroundColor = "#000";
                break;
            case 2:
                btnList[1].style.backgroundColor = "#000";
                break;
            case 3:
                btnList[2].style.backgroundColor = "#000";
                break;
            case 4:
                btnList[3].style.backgroundColor = "#000";
                break;
        }
    setTimeout(function () {
        btnList[0].style.backgroundColor = "#f2f2f2";
        btnList[1].style.backgroundColor = "#f2f2f2";
        btnList[2].style.backgroundColor = "#f2f2f2";
        btnList[3].style.backgroundColor = "#f2f2f2"; 
    },800); 
    
    
    
    setTimeout(function () {showStepsList(curNum+1,stepsList, btnList)}, 1600);
    
}

function gameLoop(game, btnList) {
    game.addNewStep();
    game.incStepsCount();
    game.setListenerState(0);
    showStepsList(0, game.getStepsList(),btnList);
    game.setListenerState(1);
    
}
//newSimon.changeListenerState();
//console.log(newSimon.listenerState);
btnOff.onclick = function() {
    newSimon.setState(0);
}
btnOn.onclick = function() {
    counterDisplay.textContent = "___";
    newSimon.initGame();
    newSimon.setState(1);
}
btnStart.onclick = function() {
    if (newSimon.getState() === 0) {
        return;
    }
    newSimon.setMode(0);
    gameLoop(newSimon, gameBtnList);
    
}
btnStrict.onclick = function() {
    if (newSimon.getState() === 0) {
        return;
    }
    newSimon.setMode(1);
}
document.onclick = function(element) {
    if (newSimon.getState() === 0 || newSimon.getListenerState() === 0) {
        return;
    }
    var target = element.target,
        gameBtn = target.closest(".game-button"),
        stepsList = [];
    if (!gameBtn) {
        return;
    }
    
    value = parseInt(gameBtn.getAttribute("id"));
    stepsList = newSimon.getStepsList();
    console.log(stepsList[newSimon.getUserStepsCount()], "  btn value",value);
    if (stepsList[newSimon.getUserStepsCount()] === value) {
        console.log("Right!");
        newSimon.incUserStepsCount();
    } else {
        // if button was wrong
        bodyElement.style.backgroundColor = "#f00";
        setTimeout(function() {
            bodyElement.style.backgroundColor = "#fff";    
        }, 1000);
        
        setTimeout(function() {
            if (newSimon.getMode() === 1) {
               newSimon.initGame();
               newSimon.setState(1);
               counterDisplay.textContent = "0";
               return;
            }

            newSimon.removeUserStepsCount();
            showStepsList(0, newSimon.getStepsList(), gameBtnList);
        }, 1200);
        
    }
    console.log(newSimon.getUserStepsCount()," ***** ",newSimon.getStepsCount());
    if (newSimon.getUserStepsCount() >= newSimon.getStepsCount()) {
        newSimon.removeUserStepsCount();
        counterDisplay.textContent = newSimon.getStepsCount();
        if (newSimon.getStepsCount() === 5) { // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!==== change 5 to 20 === !!!!!!!!!!!!!!
            // Winner functionality!!!
            counterDisplay.textContent = "You are WINNER!!!";
            // Stop Game
        }
        gameLoop(newSimon, gameBtnList);
    }
}