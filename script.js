const quotes = [
    "The quick brown fox jumps over the lazy dog",
    "Practice typing every day to get faster",
    "Speed and accuracy both matter in typing",
    "Coding is like superpower for your brain",
    "JavaScript makes websites come alive"
];

let quoteEl = document.getElementById("quote");
let inputEl = document.getElementById("input");
let timerEl = document.getElementById("timer");
let wpmEl = document.getElementById("wpm");
let accuracyEl = document.getElementById("accuracy");
let scoreEl = document.getElementById("score");
let startBtn = document.getElementById("start");
let countdownEl = document.getElementById("countdown");

let time = 0;
let timerInterval;
let currentQuote = "";
let started = false;
let score = 0;

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function startCountdown(callback) {
    let count = 3;
    countdownEl.textContent = count;
    let countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownEl.textContent = count;
        } else {
            clearInterval(countdownInterval);
            countdownEl.textContent = "";
            callback();
        }
    }, 1000);
}

function startGame() {
    score = 0;
    scoreEl.textContent = score;
    inputEl.value = "";
    inputEl.disabled = false;
    started = false;
    time = 0;
    timerEl.textContent = 0;
    wpmEl.textContent = 0;
    accuracyEl.textContent = 100;
    clearInterval(timerInterval);

    currentQuote = getRandomQuote();
    quoteEl.textContent = currentQuote;

    startCountdown(() => {
        inputEl.focus();
    });
}

inputEl.addEventListener("input", () => {
    if (!started) {
        started = true;
        timerInterval = setInterval(() => {
            time++;
            timerEl.textContent = time;
            calculateWPM();
        }, 1000);
    }
    calculateAccuracy();

    if (inputEl.value.trim() === currentQuote) {
        clearInterval(timerInterval);
        calculateWPM();
        score += parseInt(wpmEl.textContent) + parseInt(accuracyEl.textContent);
        scoreEl.textContent = score;
        inputEl.disabled = true;
    }
});

function calculateWPM() {
    let wordsTyped = inputEl.value.trim().split(/\s+/).length;
    let minutes = time / 60;
    let wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
    wpmEl.textContent = wpm;
}

function calculateAccuracy() {
    let typed = inputEl.value;
    let correctChars = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === currentQuote[i]) correctChars++;
    }
    let accuracy = Math.round((correctChars / typed.length) * 100) || 100;
    accuracyEl.textContent = accuracy;
}

startBtn.addEventListener("click", startGame);
