// Game state
let score = 0;
let currentMatchaPosition = null;
let usedPairs = new Set();
let highScore = 0;
let isNewRecord = false;
let countdownTimer = null;
let timeRemaining = 30; // 30 seconds
const GAME_DURATION = 30; // 30 seconds

// Load high score from local storage
function loadHighScore() {
    const saved = localStorage.getItem('matchaOrSwampHighScore');
    highScore = saved ? parseInt(saved, 10) : 0;
    return highScore;
}

// Save high score to local storage
function saveHighScore(score) {
    const previousHighScore = highScore;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('matchaOrSwampHighScore', score.toString());
        console.log(`New record! Previous: ${previousHighScore}, New: ${score}`);
        return true; // New record!
    }
    console.log(`Not a new record. Score: ${score}, High Score: ${highScore}`);
    return false;
}

// Image pools (you'll need to add your own images to the images folder)
const matchaImages = [
    'images/matcha/matcha1.jpg',
    'images/matcha/matcha2.jpg',
    'images/matcha/matcha3.jpg',
    'images/matcha/matcha4.jpg',
    'images/matcha/matcha5.jpg',
    'images/matcha/matcha6.jpg',
    'images/matcha/matcha7.jpg',
    'images/matcha/matcha8.jpg',
    'images/matcha/matcha9.jpg',
    'images/matcha/matcha10.jpg',
    'images/matcha/matcha11.jpg',
    'images/matcha/matcha12.jpg',
];

const swampImages = [
    'images/swamp/swamp1.jpg',
    'images/swamp/swamp2.jpg',
    'images/swamp/swamp3.jpg',
    'images/swamp/swamp4.jpg',
    'images/swamp/swamp5.jpg',
    'images/swamp/swamp6.jpg',
    'images/swamp/swamp7.jpg',
    'images/swamp/swamp8.jpg',
    'images/swamp/swamp9.jpg',
    'images/swamp/swamp10.jpg',
    'images/swamp/swamp11.jpg',
    'images/swamp/swamp12.jpg',
];

// DOM elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gameoverScreen = document.getElementById('gameover-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const scoreDisplay = document.getElementById('score');
const finalScoreDisplay = document.getElementById('final-score');
const correctPositionDisplay = document.getElementById('correct-position');
const leftImage = document.getElementById('left-image');
const rightImage = document.getElementById('right-image');
const leftOption = document.getElementById('left-option');
const rightOption = document.getElementById('right-option');
const highScoreDisplay = document.getElementById('high-score');
const startHighScoreDisplay = document.getElementById('start-high-score');
const newRecordMessage = document.getElementById('new-record-message');
const countdownBar = document.getElementById('countdown-bar');

// Prevent multiple clicks during animation
let isProcessing = false;

// Event listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

// Make images clickable
leftOption.addEventListener('click', () => {
    if (!isProcessing) {
        hideTapIndicators();
        handleSelection('left');
    }
});

rightOption.addEventListener('click', () => {
    if (!isProcessing) {
        hideTapIndicators();
        handleSelection('right');
    }
});

// Hide tap indicators after first interaction
function hideTapIndicators() {
    const indicators = document.querySelectorAll('.tap-indicator');
    indicators.forEach(indicator => {
        indicator.style.display = 'none';
    });
}

// Start countdown timer
function startCountdown() {
    timeRemaining = GAME_DURATION;
    updateCountdownBar();

    countdownTimer = setInterval(() => {
        timeRemaining -= 0.1; // Update every 100ms for smooth animation

        if (timeRemaining <= 0) {
            timeRemaining = 0;
            stopCountdown();
            handleTimeExpired();
        }

        updateCountdownBar();
    }, 100);
}

// Stop countdown timer
function stopCountdown() {
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }
}

// Update countdown bar width
function updateCountdownBar() {
    const percentage = (timeRemaining / GAME_DURATION) * 100;
    if (countdownBar) {
        countdownBar.style.width = `${percentage}%`;
    }
}

// Handle timer expiration
function handleTimeExpired() {
    isProcessing = true;
    setTimeout(() => {
        showGameOver();
    }, 500);
}

// Initialize game
function startGame() {
    score = 0;
    usedPairs = new Set();
    isNewRecord = false;
    scoreDisplay.textContent = score;
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    startCountdown(); // Start the countdown timer
    loadNewRound();
}

// Load a new round with random images
function loadNewRound() {
    // Get random images that haven't been used together
    let matchaIndex, swampIndex, pairKey;
    let attempts = 0;
    const maxAttempts = 100;

    do {
        matchaIndex = Math.floor(Math.random() * matchaImages.length);
        swampIndex = Math.floor(Math.random() * swampImages.length);
        pairKey = `${matchaIndex}-${swampIndex}`;
        attempts++;

        // If we've exhausted most combinations, reset the used pairs
        if (attempts >= maxAttempts) {
            usedPairs.clear();
            break;
        }
    } while (usedPairs.has(pairKey));

    usedPairs.add(pairKey);

    const matchaImg = matchaImages[matchaIndex];
    const swampImg = swampImages[swampIndex];

    // Randomly decide which side the matcha will be on
    currentMatchaPosition = Math.random() < 0.5 ? 'left' : 'right';

    // Generate random positions for image cropping with safety margins
    // Using 20-80% range to avoid extreme edges and ensure good content visibility
    const margin = 20; // Safety margin as percentage
    const range = 100 - (2 * margin); // 60% usable range
    const leftPosX = margin + Math.floor(Math.random() * range);
    const leftPosY = margin + Math.floor(Math.random() * range);
    const rightPosX = margin + Math.floor(Math.random() * range);
    const rightPosY = margin + Math.floor(Math.random() * range);

    if (currentMatchaPosition === 'left') {
        leftImage.src = matchaImg;
        rightImage.src = swampImg;
    } else {
        leftImage.src = swampImg;
        rightImage.src = matchaImg;
    }

    // Set random crop positions for each image
    leftImage.style.objectPosition = `${leftPosX}% ${leftPosY}%`;
    rightImage.style.objectPosition = `${rightPosX}% ${rightPosY}%`;

    // Reset any previous styling
    document.getElementById('left-option').classList.remove('correct-choice', 'wrong-choice');
    document.getElementById('right-option').classList.remove('correct-choice', 'wrong-choice');
}

// Handle user selection
function handleSelection(selectedPosition) {
    // Prevent multiple clicks during processing
    isProcessing = true;

    if (selectedPosition === currentMatchaPosition) {
        // Correct choice
        score++;
        scoreDisplay.textContent = score;

        // Visual feedback
        if (selectedPosition === 'left') {
            leftOption.classList.add('correct-choice');
        } else {
            rightOption.classList.add('correct-choice');
        }

        // Load next round after a short delay
        setTimeout(() => {
            isProcessing = false;
            loadNewRound();
        }, 800);
    } else {
        // Wrong choice - game over
        stopCountdown(); // Stop the countdown timer

        if (selectedPosition === 'left') {
            leftOption.classList.add('wrong-choice');
            rightOption.classList.add('correct-choice');
        } else {
            rightOption.classList.add('wrong-choice');
            leftOption.classList.add('correct-choice');
        }

        // Show game over screen after a delay
        setTimeout(() => {
            showGameOver();
        }, 1500);
    }
}

// Show game over screen
function showGameOver() {
    gameScreen.classList.add('hidden');
    gameoverScreen.classList.remove('hidden');
    finalScoreDisplay.textContent = score;
    correctPositionDisplay.textContent = currentMatchaPosition;

    // Check if it's a new high score
    isNewRecord = saveHighScore(score);

    // Update high score display
    const highScoreContainer = document.querySelector('.high-score-container');
    if (highScore > 0) {
        if (highScoreDisplay) {
            highScoreDisplay.textContent = highScore;
        }
        if (highScoreContainer) {
            highScoreContainer.classList.remove('hidden');
        }
    } else {
        // Hide the container if there's no personal best yet
        if (highScoreContainer) {
            highScoreContainer.classList.add('hidden');
        }
    }

    // Show/hide new record message - only show if truly a NEW record
    if (newRecordMessage) {
        console.log(`isNewRecord: ${isNewRecord}, score: ${score}, highScore: ${highScore}`);
        if (isNewRecord && score > 0) {
            console.log('Showing new record message');
            newRecordMessage.style.display = 'inline-block';
            newRecordMessage.classList.remove('hidden');
        } else {
            console.log('Hiding new record message');
            newRecordMessage.style.display = 'none';
            newRecordMessage.classList.add('hidden');
        }
    }
}

// Restart game
function restartGame() {
    stopCountdown(); // Stop any existing countdown
    gameoverScreen.classList.add('hidden');

    // Ensure new record message is hidden when restarting
    if (newRecordMessage) {
        newRecordMessage.style.display = 'none';
        newRecordMessage.classList.add('hidden');
    }

    isProcessing = false;
    startGame();
}

// Preload images for better performance
function preloadImages() {
    const allImages = [...matchaImages, ...swampImages];
    allImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize on page load
window.addEventListener('load', () => {
    preloadImages();

    // Load and display high score
    loadHighScore();
    if (startHighScoreDisplay && highScore > 0) {
        startHighScoreDisplay.textContent = `Personal Best: ${highScore}`;
        startHighScoreDisplay.classList.remove('hidden');
    }
});
