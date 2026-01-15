// ===== Game State =====
let gameState = {
    clickCount: 0,
    timeRemaining: 30,
    gameActive: false,
    timerInterval: null
};

// ===== Screen Navigation =====
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Reset game if going to game screen
    if (screenId === 'game-screen') {
        resetGameState();
    }
}

// ===== Game Logic =====
function startGame() {
    if (gameState.gameActive) return;
    
    // Reset game state
    gameState.clickCount = 0;
    gameState.timeRemaining = 30;
    gameState.gameActive = true;
    
    // Update UI
    updateClickCount();
    updateTimer();
    
    // Enable click button
    const clickButton = document.getElementById('click-button');
    clickButton.classList.remove('disabled');
    
    // Hide start button
    const startBtn = document.getElementById('start-game-btn');
    startBtn.style.display = 'none';
    
    // Start timer
    gameState.timerInterval = setInterval(() => {
        gameState.timeRemaining--;
        updateTimer();
        updateProgressBar();
        
        if (gameState.timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

function handleClick() {
    if (!gameState.gameActive) return;
    
    // Increment click count
    gameState.clickCount++;
    updateClickCount();
    
    // Add click animation
    const clickButton = document.getElementById('click-button');
    clickButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickButton.style.transform = 'scale(1)';
    }, 100);
    
    // Create floating number animation
    createFloatingNumber();
}

function endGame() {
    // Stop timer
    clearInterval(gameState.timerInterval);
    gameState.gameActive = false;
    
    // Disable click button
    const clickButton = document.getElementById('click-button');
    clickButton.classList.add('disabled');
    
    // Show game over modal
    showGameOverModal();
}

function resetGame() {
    resetGameState();
    showScreen('game-screen');
}

function resetGameState() {
    // Clear any existing timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    // Reset state
    gameState.clickCount = 0;
    gameState.timeRemaining = 30;
    gameState.gameActive = false;
    
    // Update UI
    updateClickCount();
    updateTimer();
    updateProgressBar();
    
    // Show start button
    const startBtn = document.getElementById('start-game-btn');
    startBtn.style.display = 'block';
    
    // Disable click button
    const clickButton = document.getElementById('click-button');
    clickButton.classList.add('disabled');
}

// ===== UI Updates =====
function updateClickCount() {
    const clickCountElement = document.getElementById('click-count');
    if (clickCountElement) {
        clickCountElement.textContent = gameState.clickCount;
    }
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = gameState.timeRemaining;
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const percentage = (gameState.timeRemaining / 30) * 100;
        progressBar.style.width = percentage + '%';
    }
}

function createFloatingNumber() {
    const clickButton = document.getElementById('click-button');
    const rect = clickButton.getBoundingClientRect();
    
    const floatingNum = document.createElement('div');
    floatingNum.textContent = '+1';
    floatingNum.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        font-size: 2rem;
        font-weight: 800;
        color: #FF6B35;
        pointer-events: none;
        z-index: 1000;
        animation: floatUp 1s ease-out forwards;
    `;
    
    document.body.appendChild(floatingNum);
    
    // Remove after animation
    setTimeout(() => {
        floatingNum.remove();
    }, 1000);
}

// Add CSS animation for floating numbers
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px);
        }
    }
`;
document.head.appendChild(style);

// ===== Modal Functions =====
function showGameOverModal() {
    const modal = document.getElementById('game-over-modal');
    const finalScoreElement = document.getElementById('final-score');
    const messageElement = document.getElementById('game-over-message');
    
    // Update final score
    finalScoreElement.textContent = gameState.clickCount;
    
    // Generate message based on performance
    let message = '';
    if (gameState.clickCount >= 200) {
        message = '¡Increíble! ¡Eres un maestro del click! 🏆';
    } else if (gameState.clickCount >= 150) {
        message = '¡Excelente! ¡Tienes dedos veloces! 🔥';
    } else if (gameState.clickCount >= 100) {
        message = '¡Muy bien! ¡Sigue practicando! 💪';
    } else if (gameState.clickCount >= 50) {
        message = '¡Buen intento! ¡Puedes mejorar! 👍';
    } else {
        message = '¡No te rindas! ¡Inténtalo de nuevo! 😊';
    }
    
    messageElement.textContent = message;
    
    // Show modal
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('game-over-modal');
    modal.classList.remove('active');
    showScreen('start-screen');
}

// ===== Exit Game =====
function exitGame() {
    if (confirm('¿Estás seguro de que quieres salir del juego?')) {
        // In a real application, this would close the window
        // For web version, we'll just show an alert
        alert('Gracias por jugar a Click Master! 👋');
        // You could also redirect or close the tab:
        // window.close();
    }
}

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Space bar to click during game
    if (e.code === 'Space' && gameState.gameActive) {
        e.preventDefault();
        handleClick();
    }
    
    // Enter to start game when on game screen
    if (e.code === 'Enter') {
        const gameScreen = document.getElementById('game-screen');
        if (gameScreen.classList.contains('active') && !gameState.gameActive) {
            startGame();
        }
    }
    
    // Escape to close modal
    if (e.code === 'Escape') {
        const modal = document.getElementById('game-over-modal');
        if (modal.classList.contains('active')) {
            closeModal();
        }
    }
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Make sure click button is disabled initially
    const clickButton = document.getElementById('click-button');
    clickButton.classList.add('disabled');
    
    console.log('Click Master cargado correctamente! 🎮');
});
