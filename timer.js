let timerDisplay = document.getElementById('timer');
let finishTimeDisplay = document.getElementById('finishTime');
let startButton = document.getElementById('continueButton');
let startFromInputButton = document.getElementById('startFromInput'); // Added reference to the start from input button
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');
let hoursInput = document.getElementById('hours');
let minutesInput = document.getElementById('minutes');
let secondsInput = document.getElementById('seconds');
let countdown;
let remainingTime = 0;

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

function stopTimer() {
    clearInterval(countdown);
}

function resetTimer() {
    clearInterval(countdown);
    timerDisplay.textContent = '00:00:00';
    finishTimeDisplay.textContent = '';
    remainingTime = 0;
}

function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remainderMinutes = Math.floor((seconds % 3600) / 60);
    const remainderSeconds = seconds % 60;
    const display = `${hours < 10 ? '0' : ''}${hours}:${remainderMinutes < 10 ? '0' : ''}${remainderMinutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

function playSound() {
    let audio = new Audio('../timer/songs/1.mp3');
    audio.play();
}

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

startFromInputButton.addEventListener('click', function() { // Added event listener for the start from input button
    const hours = parseInt(hoursInput.value);
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);
    timer(hours * 3600 + minutes * 60 + seconds);
});

function displayCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const display = `Current Time: ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById('currentTime').textContent = display;
}

function displayFinishTime(timestamp) {
    const finishTime = new Date(timestamp);
    const hours = finishTime.getHours();
    const minutes = finishTime.getMinutes();
    const seconds = finishTime.getSeconds();
    const display = `Finish time: ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    finishTimeDisplay.textContent = display;
}

setInterval(displayCurrentTime, 1000);

stopButton.addEventListener('click', stopTimer);

resetButton.addEventListener('click', resetTimer);
