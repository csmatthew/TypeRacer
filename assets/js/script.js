document.addEventListener('DOMContentLoaded', function() {
    const texts = {
        easy: [
            "The cat sat on the mat.",
            "A quick brown fox jumps over the lazy dog.",
            "She sells seashells by the seashore."
        ],
        medium: [
            "To be or not to be, that is the question.",
            "All that glitters is not gold.",
            "A journey of a thousand miles begins with a single step."
        ],
        hard: [
            "It was the best of times, it was the worst of times.",
            "In the beginning God created the heavens and the earth.",
            "The only thing we have to fear is fear itself."
        ]
    };

    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const retryBtn = document.getElementById('retry-btn');
    const userInput = document.getElementById('user-input');
    const timeSpan = document.getElementById('time');
    const wpmSpan = document.getElementById('wpm');
    const levelSpan = document.getElementById('level');
    let startTime = null, endTime = null;
    let timerStarted = false;

    function updateSampleText() {
        const selectedDifficulty = difficultySelect.value;
        const selectedTexts = texts[selectedDifficulty];
        const randomText = selectedTexts[Math.floor(Math.random() * selectedTexts.length)];
        sampleTextDiv.textContent = randomText;
    }

    function startTest() {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        retryBtn.disabled = true;
        userInput.disabled = false;
        userInput.value = ''; // Clear the user input area
        userInput.focus(); // Set focus to the user input area
        timerStarted = false; // Reset the timer started flag
    }

    function startTimer() {
        if (!timerStarted) {
            startTime = new Date();
            timerStarted = true;
        }
    }

    function stopTest() {
        if (!timerStarted) {
            timeSpan.textContent = '0.00';
            wpmSpan.textContent = '0';
            startBtn.disabled = false;
            stopBtn.disabled = true;
            retryBtn.disabled = false;
            userInput.disabled = true;
            return;
        }

        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000; // time in seconds
        timeSpan.textContent = timeTaken.toFixed(2);
        startBtn.disabled = false;
        stopBtn.disabled = true;
        retryBtn.disabled = false;
        userInput.disabled = true;

        // Calculate WPM
        const sampleText = sampleTextDiv.textContent;
        const userText = userInput.value;
        const sampleWords = sampleText.split(' ');
        const userWords = userText.split(' ');
        let correctWords = 0;

        for (let i = 0; i < userWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                correctWords++;
            }
        }

        const wpm = Math.round((correctWords / timeTaken) * 60);
        wpmSpan.textContent = wpm;

        // Display difficulty level
        const selectedDifficulty = difficultySelect.value;
        levelSpan.textContent = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
    }

    function retryTest() {
        updateSampleText();
        timeSpan.textContent = '0';
        wpmSpan.textContent = '0';
        startBtn.disabled = false;
        stopBtn.disabled = true;
        retryBtn.disabled = true;
        userInput.disabled = true;
        userInput.value = ''; // Clear the user input area
        startTime = null; // Reset the start time
        endTime = null; // Reset the end time
        timerStarted = false; // Reset the timer started flag
    }

    difficultySelect.addEventListener('change', updateSampleText);
    startBtn.addEventListener('click', startTest);
    stopBtn.addEventListener('click', stopTest);
    retryBtn.addEventListener('click', retryTest);
    userInput.addEventListener('input', startTimer); // Start timer on user input
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action of the Enter key
            stopTest();
        }
    });

    // Trigger change event to display initial text
    updateSampleText();
    stopBtn.disabled = true;
    retryBtn.disabled = true;
    userInput.disabled = true; // Disable user input area initially
});