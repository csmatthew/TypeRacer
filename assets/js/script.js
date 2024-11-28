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
    const timeSpan = document.getElementById('time');
    let startTime, endTime;

    function updateSampleText() {
        const selectedDifficulty = difficultySelect.value;
        const selectedTexts = texts[selectedDifficulty];
        const randomText = selectedTexts[Math.floor(Math.random() * selectedTexts.length)];
        sampleTextDiv.textContent = randomText;
    }

    function startTest() {
        startTime = new Date();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        retryBtn.disabled = true;
    }

    function stopTest() {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000; // time in seconds
        timeSpan.textContent = timeTaken.toFixed(2);
        startBtn.disabled = false;
        stopBtn.disabled = true;
        retryBtn.disabled = false;
    }

    function retryTest() {
        updateSampleText();
        timeSpan.textContent = '0';
        startBtn.disabled = false;
        stopBtn.disabled = true;
        retryBtn.disabled = true;
    }

    difficultySelect.addEventListener('change', updateSampleText);
    startBtn.addEventListener('click', startTest);
    stopBtn.addEventListener('click', stopTest);
    retryBtn.addEventListener('click', retryTest);

    // Trigger change event to display initial text
    updateSampleText();
    stopBtn.disabled = true;
    retryBtn.disabled = true;
});