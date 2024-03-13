// Element References
let chronometerDisplay = document.getElementById('chronometer');
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');

// Variables
let chronometer;
let startTime;

// Start Chronometer Function
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

// Stop Chronometer Function
function stopChronometer() {
    clearInterval(chronometer);
}

// Reset Chronometer Function
function resetChronometer() {
    clearInterval(chronometer);
    chronometerDisplay.textContent = '00:00:00';
}

// Event Listeners
startButton.addEventListener('click', startChronometer);
stopButton.addEventListener('click', stopChronometer);
resetButton.addEventListener('click', resetChronometer);
