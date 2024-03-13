// Element References
let timerDisplay = document.getElementById('timer');
let finishTimeDisplay = document.getElementById('finishTime');
let startButton = document.getElementById('continueButton');
let startFromInputButton = document.getElementById('startFromInput');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');
let hoursInput = document.getElementById('hours');
let minutesInput = document.getElementById('minutes');
let secondsInput = document.getElementById('seconds');

// Variables
let countdown;
let remainingTime = 0;

// Timer Function
function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        remainingTime = secondsLeft;
        if (secondsLeft < 0) {
            clearInterval(countdown);
            playSound();
            return;
        }
        displayTimeLeft(secondsLeft);
        displayFinishTime(then);
    }, 1000);
}

// Stop Timer Function
function stopTimer() {
    clearInterval(countdown);
}

// Reset Timer Function
function resetTimer() {
    clearInterval(countdown);
    timerDisplay.textContent = '00:00:00';
    finishTimeDisplay.textContent = '';
    remainingTime = 0;
}

// Display Time Left Function
function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remainderMinutes = Math.floor((seconds % 3600) / 60);
    const remainderSeconds = seconds % 60;
    const display = `${hours < 10 ? '0' : ''}${hours}:${remainderMinutes < 10 ? '0' : ''}${remainderMinutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

// Play Sound Function
function playSound() {
    let audio = new Audio('../timer/songs/1.mp3');
    audio.play();
}

// Event Listeners
startButton.addEventListener('click', function() {
    if (remainingTime > 0) {
        timer(remainingTime);
    } else {
        const hours = parseInt(hoursInput.value);
        const minutes = parseInt(minutesInput.value);
        const seconds = parseInt(secondsInput.value);
        timer(hours * 3600 + minutes * 60 + seconds);
    }
});

startFromInputButton.addEventListener('click', function() {
    const hours = parseInt(hoursInput.value);
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);
    timer(hours * 3600 + minutes * 60 + seconds);
});

stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Display Current Time Function
function displayCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const display = `Current Time: ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById('currentTime').textContent = display;
}

// Display Finish Time Function
function displayFinishTime(timestamp) {
    const finishTime = new Date(timestamp);
    const hours = finishTime.getHours();
    const minutes = finishTime.getMinutes();
    const seconds = finishTime.getSeconds();
    const display = `Finish time: ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    finishTimeDisplay.textContent = display;
}

// Update Current Time Every Second
setInterval(displayCurrentTime, 1000);
