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
    btnStartIcon = document.getElementById("start-icon-circle"),
    btnStrict = document.getElementById("btn-strict"),
    btnStrictIcon = document.getElementById("strict-icon-circle"),
    gameBtnList = document.getElementsByClassName("game-button"),
    gameBtnBox = document.getElementById("app-game-buttons"),
    counterDisplay = document.getElementById("app-counter"),
    bodyElement = document.getElementsByTagName("body")[0],
    sounds = document.getElementsByClassName("sound-btn");
    

var newSimon = new simonGame(0, -1);
function showStepsList(curNum, stepsList, btnList) {
    console.log(stepsList);
    if (curNum >= stepsList.length) {
        return;
    }
    var curBtn = stepsList[curNum];
    switch (curBtn) {
            case 1:
                //btnList[0].style.backgroundColor = "#000";
                sounds[0].play();
                btnList[0].style.boxShadow = "none";
                btnList[0].style.top = "5px";
                break;
            case 2:
                //btnList[1].style.backgroundColor = "#000";
                sounds[1].play();
                btnList[1].style.boxShadow = "none";
                btnList[1].style.top = "5px";
                break;
            case 3:
                //btnList[2].style.backgroundColor = "#000";
                sounds[2].play();
                btnList[2].style.boxShadow = "none";
                btnList[2].style.top = "5px";
                break;
            case 4:
                //btnList[3].style.backgroundColor = "#000";
                sounds[3].play();
                btnList[3].style.boxShadow = "none";
                btnList[3].style.top = "5px";
                break;
        }
    setTimeout(function () {
        btnList[0].style.backgroundColor = "#f58036";
        btnList[0].style.boxShadow = "0px 5px 0px 0px rgba(184, 74, 7, 0.75)";
        btnList[0].style.top = "";
        btnList[1].style.backgroundColor = "#009d22";
        btnList[1].style.boxShadow = "0px 5px 0px 0px rgba(0, 89, 34, 0.75)";
        btnList[1].style.top = "";
        btnList[2].style.backgroundColor = "#ffd715";
        btnList[2].style.boxShadow = "0px 5px 0px 0px rgba(255, 142, 24, 0.75)";
        btnList[2].style.top = "";
        btnList[3].style.backgroundColor = "#73183f"; 
        btnList[3].style.boxShadow = "0px 5px 0px 0px rgba(68, 0, 41, 0.98)";
        btnList[3].style.top = "";
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
    btnOn.className = '';
    btnOff.className = 'active';
}
btnOn.onclick = function() {
    counterDisplay.textContent = "___";
    newSimon.initGame();
    newSimon.setState(1);
    btnOn.className = 'active';
    btnOff.className = '';
}
btnStart.onclick = function() {
    if (newSimon.getState() === 0) {
        return;
    }
    
    if (newSimon.getMode() !== 1) {   
        newSimon.initGame();
        newSimon.setMode(0);
    } else {
        newSimon.initGame();
        newSimon.setMode(1);    
    }
    
    counterDisplay.textContent = "1";
    gameLoop(newSimon, gameBtnList);
    
}
btnStrict.onclick = function() {
    if (newSimon.getState() === 0) {
        return;
    }
    if (newSimon.getMode() === 0) {
        newSimon.setMode(1);
        btnStrictIcon.className = "icon-circle circle-active";
    } else {
        newSimon.setMode(0);
        btnStrictIcon.className = "icon-circle circle-unactive";
    }
    
}
gameBtnBox.onclick = function(element) {
    if (newSimon.getState() === 0 || newSimon.getListenerState() === 0) {
        return;
    }
    var gameBtn = element.target,
        stepsList = [];
    if (gameBtn.className !== "game-button") {
        return;
    }
    
    value = parseInt(gameBtn.getAttribute("id"));
    stepsList = newSimon.getStepsList();
    console.log(stepsList[newSimon.getUserStepsCount()], " btn value",value);
    // ========================================
    
    switch (value) {
            case 1:
                //btnList[0].style.backgroundColor = "#000";
                sounds[0].play();
                gameBtnList[0].style.boxShadow = "none";
                gameBtnList[0].style.top = "5px";
                break;
            case 2:
                //btnList[1].style.backgroundColor = "#000";
                sounds[1].play();
                gameBtnList[1].style.boxShadow = "none";
                gameBtnList[1].style.top = "5px";
                break;
            case 3:
                //btnList[2].style.backgroundColor = "#000";
                sounds[2].play();
                gameBtnList[2].style.boxShadow = "none";
                gameBtnList[2].style.top = "5px";
                break;
            case 4:
                //btnList[3].style.backgroundColor = "#000";
                sounds[3].play();
                gameBtnList[3].style.boxShadow = "none";
                gameBtnList[3].style.top = "5px";
                break;
        }
    setTimeout(function () {
        gameBtnList[0].style.backgroundColor = "#f58036";
        gameBtnList[0].style.boxShadow = "0px 5px 0px 0px rgba(184, 74, 7, 0.75)";
        gameBtnList[0].style.top = "";
        gameBtnList[1].style.backgroundColor = "#009d22";
        gameBtnList[1].style.boxShadow = "0px 5px 0px 0px rgba(0, 89, 34, 0.75)";
        gameBtnList[1].style.top = "";
        gameBtnList[2].style.backgroundColor = "#ffd715";
        gameBtnList[2].style.boxShadow = "0px 5px 0px 0px rgba(255, 142, 24, 0.75)";
        gameBtnList[2].style.top = "";
        gameBtnList[3].style.backgroundColor = "#73183f"; 
        gameBtnList[3].style.boxShadow = "0px 5px 0px 0px rgba(68, 0, 41, 0.98)";
        gameBtnList[3].style.top = "";
    },800); 
    
    //=============================
    
    
    setTimeout(function() {
    if (stepsList[newSimon.getUserStepsCount()] === value) {
        console.log("Right!");
        newSimon.incUserStepsCount();
    } else {
        // if button was wrong
        bodyElement.style.backgroundColor = "#f00";
        setTimeout(function() {
            bodyElement.style.backgroundColor = "#d7e3fd";    
        }, 1000);
        
        setTimeout(function() {
            if (newSimon.getMode() === 1) {
               newSimon.initGame();
               newSimon.setMode(1);
               newSimon.setState(1);
               counterDisplay.textContent = "1";
               gameLoop(newSimon, gameBtnList);
               return;
            }

            newSimon.removeUserStepsCount();
            showStepsList(0, newSimon.getStepsList(), gameBtnList);
        }, 1200);
        
    }
    console.log(newSimon.getUserStepsCount()," ***** ",newSimon.getStepsCount());
    if (newSimon.getUserStepsCount() >= newSimon.getStepsCount()) {
        newSimon.removeUserStepsCount();
        counterDisplay.textContent = newSimon.getStepsCount() + 1;
        if (newSimon.getStepsCount() === 3) { // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!==== change 5 to 20 === !!!!!!!!!!!!!!
            // Winner functionality!!!
            alert("You are WINNER!!!");
            // Stop Game
            if (newSimon.getMode !== 1) {   
            counterDisplay.textContent = "0";
            newSimon.initGame();
            newSimon.setMode(0);
            } else {
            newSimon.initGame();
            newSimon.setMode(1);    
            }

        }
        gameLoop(newSimon, gameBtnList);
    }
    }, 1000);
}