import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-screen',
  imports: [RouterModule, CommonModule],
  templateUrl: './game-screen.html',
  styleUrl: './game-screen.css',
})
export class GameScreen implements OnDestroy {
  clickCount = 0;
  timeRemaining = 30;
  gameActive = false;
  gameEnded = false;
  showModal = false;
  finalScore = 0;
  gameOverMessage = '';
  rippleActive = false;
  progressPercentage = 100;
  
  private timerInterval: any = null;
  
  startGame() {
    this.clickCount = 0;
    this.timeRemaining = 30;
    this.gameActive = true;
    this.gameEnded = false;
    this.progressPercentage = 100;
    
    // Start timer
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.progressPercentage = (this.timeRemaining / 30) * 100;
      
      if (this.timeRemaining <= 0) {
        this.endGame();
      }
    }, 1000);
  }
  
  handleClick() {
    if (!this.gameActive) return;
    
    this.clickCount++;
    
    // Trigger ripple animation
    this.rippleActive = true;
    setTimeout(() => {
      this.rippleActive = false;
    }, 600);
    
    // Create floating number
    this.createFloatingNumber();
  }
  
  endGame() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    this.gameActive = false;
    this.gameEnded = true;
    this.finalScore = this.clickCount;
    
    // Generate message based on performance
    if (this.clickCount >= 200) {
      this.gameOverMessage = '¡Increíble! ¡Eres un maestro del click!';
    } else if (this.clickCount >= 150) {
      this.gameOverMessage = '¡Excelente! ¡Tienes dedos veloces!';
    } else if (this.clickCount >= 100) {
      this.gameOverMessage = '¡Muy bien! ¡Sigue practicando!';
    } else if (this.clickCount >= 50) {
      this.gameOverMessage = '¡Buen intento! ¡Puedes mejorar!';
    } else {
      this.gameOverMessage = '¡No te rindas! ¡Inténtalo de nuevo!';
    }
    
    this.showModal = true;
  }
  
  resetGame() {
    this.showModal = false;
    this.gameEnded = false;
    this.clickCount = 0;
    this.timeRemaining = 30;
    this.progressPercentage = 100;
    this.startGame();
  }
  
  closeModal() {
    this.showModal = false;
  }
  
  createFloatingNumber() {
    // This creates a DOM element for the floating +1 animation
    // In a real app, you might use a template-driven approach
    const floatingNum = document.createElement('div');
    floatingNum.textContent = '+1';
    floatingNum.className = 'floating-number';
    
    // Position near the click button
    const button = document.querySelector('.click-button');
    if (button) {
      const rect = button.getBoundingClientRect();
      floatingNum.style.left = (rect.left + rect.width / 2) + 'px';
      floatingNum.style.top = (rect.top + rect.height / 2) + 'px';
    }
    
    document.body.appendChild(floatingNum);
    
    setTimeout(() => {
      floatingNum.remove();
    }, 1000);
  }
  
  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}

