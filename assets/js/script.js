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

    function updateSampleText() {
        const selectedDifficulty = difficultySelect.value;
        const selectedTexts = texts[selectedDifficulty];
        const randomText = selectedTexts[Math.floor(Math.random() * selectedTexts.length)];
        sampleTextDiv.textContent = randomText;
    }

    difficultySelect.addEventListener('change', updateSampleText);

    // Trigger change event to display initial text
    updateSampleText();
});