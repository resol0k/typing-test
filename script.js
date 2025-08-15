const quotes = [
    "The quick brown fox jumps over the lazy dog",
    "Practice makes perfect in every skill",
    "Typing fast is a useful and fun ability",
    "JavaScript powers the modern web",
    "Coding is like solving puzzles with logic"
];

let quoteEl = document.getElementById("quote");
let inputEl = document.getElementById("input");
let timerEl = document.getElementById("timer");
let wpmEl = document.getElementById("wpm");
let accuracyEl = document.getElementById("accuracy");
let restartBtn = document.getElementById("restart");

let time = 0;
let timerInterval;
let currentQuote = "";
let started = false;

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function startTest() {
    currentQuote = getRandomQuote();
    quoteEl.textContent = currentQuote;
    inputEl.value = "";
    time = 0;
    timerEl.textContent = 0;
    wpmEl.textContent = 0;
    accuracyEl.textContent = 100;
    started = false;
    clearInterval(timerInterval);
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

restartBtn.addEventListener("click", startTest);

startTest();
