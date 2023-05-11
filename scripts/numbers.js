
//SCREENS
const settingsSection = document.getElementById("settings");
const memorizeSection = document.getElementById("memorize");
const recallSection = document.getElementById("recall");
const scoreSection = document.getElementById("score");


//SETTINGS
const memorizeTimeInput = document.getElementById('memorize-time');
const recallTimeInput = document.getElementById('recall-time')
const digitsInput = document.getElementById("digits");
const setSizeInput = document.getElementById("set-size")

const startButton = document.getElementById("start");


//MEMORIZE
const memorizeDisplay = document.getElementById("memorize-display");
const setDisplay = document.getElementById("set-display");

const setRight = document.getElementById("set-right");
const setLeft = document.getElementById("set-left");

let randomNumber = parseInt(Math.random()*10, 10).toString();

let setLocation = 0;
let setSize = parseInt(setSizeInput.value);

let displayedDigits;

const startRecallButton = document.getElementById("start-recall");


//RECALL
const recallDisplay = document.getElementById("recall-display");
let guessedNumber = "";
let recalledDigits;
let recallLocation = 0;

const showScoreBtn = document.getElementById("show-score");

//SCORE
let totalScore = 0;
const scoreDisplay = document.getElementById("score-display");


window.onload = function() {
    scoreSection.style.display="none";
    memorizeSection.style.display="none";
    recallSection.style.display="none";

    digitsInput.value = localStorage.getItem("digits") || 10;
}

digitsInput.onchange = function() {
    localStorage.setItem("digits", parseInt(digitsInput.value))
}

startButton.onclick = function(e) {
    e.preventDefault();

    startMemorize();
}


startRecallButton.onclick = function(e) {
    startRecall();
}

showScoreBtn.onclick = function(e) {
    showScore();
}

function startMemorize() {
    settingsSection.style.display="none";
    memorizeSection.style.display="block";
    console.log(digits.value);
    randomNumber = parseInt(Math.random()*(Math.pow(10,digitsInput.value)),10).toString();

    setLocation = 0;
    setSize = parseInt(setSizeInput.value);

    for(let i = 0; i < randomNumber.length; i++) {
    memorizeDisplay.innerHTML += `<span class='digit-display memorize-digit-display'>${randomNumber.charAt(i)}</span>`;
    }

    setDisplay.innerHTML = randomNumber.slice(setLocation, setLocation+setSize);

    displayedDigits = document.querySelectorAll(".memorize-digit-display");
    showActiveDigits(setLocation, setLocation+setSize);
}

function startRecall() {
    memorizeSection.style.display="none";
    recallSection.style.display="block";

    for(let i = 0; i < randomNumber.length; i++) {
        recallDisplay.innerHTML += `<span class='digit-display recall-digit-display'> </span>`;
    }


    recalledDigits = document.querySelectorAll(".recall-digit-display");
}


function showScore() {
    recallDisplay.innerHTML = "";

    for(let i = 0; i < randomNumber.length; i++) {
        if(randomNumber.charAt(i)==guessedNumber.charAt(i)) {
            recallDisplay.innerHTML += `<span class='digit-container'><span class='correct-digit'><span class='digit-display memorize-digit-display'>${randomNumber.charAt(i)}</span><span class='digit-display recall-digit-display correct'>${guessedNumber.charAt(i)}</span></span></span>`;
            totalScore++;
        }
        else
        recallDisplay.innerHTML += `<span class='digit-container'><span class='correct-digit'><span class='digit-display memorize-digit-display'>${randomNumber.charAt(i)}</span><span class='digit-display recall-digit-display incorrect'>${guessedNumber.charAt(i)}</span></span></span>`;
    }
    scoreDisplay.innerHTML = `Score: ${totalScore}`;
    scoreDisplay.style.display="block";

    showScoreBtn.style.display = "none";

    
}

function showActiveDigits() {
    for(let i = setLocation; i < Math.min(setLocation+setSize, randomNumber.length); i++) {
        displayedDigits[i].classList.add("active");
    }
}

function hideActiveDigits() {
    for(let i = setLocation; i < Math.min(setLocation+setSize, randomNumber.length); i++) {
        displayedDigits[i].classList.remove("active");
    }
}

setRight.onclick = function(e) {
    hideActiveDigits()
    if(setLocation+setSize*2<randomNumber.length) {
    setLocation+=setSize;
    setDisplay.innerHTML = randomNumber.slice(setLocation, setLocation+setSize);
    
    }
    else {
        if(setLocation+setSize<randomNumber.length)
        setLocation+=setSize;
        setDisplay.innerHTML = randomNumber.slice(setLocation);
    }
    showActiveDigits();
}

setLeft.onclick = function(e) {
    hideActiveDigits()
    setLocation-=setSize;
    if(setLocation<0) setLocation=0;
    setDisplay.innerHTML = randomNumber.slice(setLocation, setLocation+setSize);
    showActiveDigits();
}


document.addEventListener("keydown", function(e) {
    console.log(e.key);
    if(!isNaN(e.key)) {
        if(recallLocation < randomNumber.length) {
        recalledDigits[recallLocation].innerHTML = e.key;
        guessedNumber+=e.key;
        recallLocation++;
        }
    }
    else {
        if(e.key=='Backspace') {
            if(recallLocation>0) {
                recalledDigits[recallLocation-1].innerHTML = "";
                guessedNumber = guessedNumber.slice(0, recallLocation-1);
                recallLocation--;
            }
        }
    }
});