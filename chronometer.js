let chronometerDisplay = document.getElementById('chronometer');
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');

let chronometer;
let startTime;

function startChronometer() {
    startTime = Date.now();
    chronometer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
        const display = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        chronometerDisplay.textContent = display;
    }, 1000);
}

function stopChronometer() {
    clearInterval(chronometer);
}

function resetChronometer() {
    clearInterval(chronometer);
    chronometerDisplay.textContent = '00:00:00';
}

startButton.addEventListener('click', startChronometer);
stopButton.addEventListener('click', stopChronometer);
resetButton.addEventListener('click', resetChronometer);
