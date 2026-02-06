import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* --- Definir la interfaz de la API --- */
declare global {

  interface Window {

    api?: {

      saveScore: (name: string, clicks: number) => Promise<any>;
      getTopScores: () => Promise<any>;

    };

  }

}

/* --- Definir el componente de la vista de juego --- */
@Component({

  selector: 'app-game-screen',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './game-screen.html',

})

/* --- Clase de la lógica de la vista de juego --- */
export class GameScreen implements OnDestroy {

  /* --- Atributos --- */
  clickCount = 0;
  timeRemaining = 30;
  gameActive = false;
  gameEnded = false;
  showModal = false;
  finalScore = 0;
  gameOverMessage = '';
  rippleActive = false;
  playerName = '';
  
  private timerInterval: any = null;
  
  /* --- Método para iniciar la partida --- */
  startGame() {

    /* --- Se reinician las variables: contador de clicks, tiempo restante, partida activa y partida terminada --- */
    this.clickCount = 0;
    this.timeRemaining = 30;
    this.gameActive = true;
    this.gameEnded = false;
    
    /* --- Se inicia el crono --- */
    this.timerInterval = setInterval(() => {

      /* --- Se resta un segundo al tiempo restante --- */
      this.timeRemaining--;
      
      /* --- Si el tiempo restante llega a 0, se termina la partida --- */
      if (this.timeRemaining <= 0) {

        this.endGame();

      }

    }, 1000);

  }
  
  /* --- Método para manejar el click --- */
  handleClick() {

    /* --- Si no se ha empezado la partida, no hace nada --- */
    if (!this.gameActive) return;
    
    /* --- Se incrementa el contador de clicks --- */
    this.clickCount++;
    
    /* --- Se activa el efecto de encoger el botón --- */
    this.rippleActive = true;

    /* --- Y se desactiva el efecto de encoger el botón después de 600ms --- */
    setTimeout(() => {

      this.rippleActive = false;

    }, 600);

  }
  
  /* --- Método para terminar la partida --- */
  async endGame() {

    /* --- Parar el crono --- */
    if (this.timerInterval) {

      clearInterval(this.timerInterval);

    }
    
    /* --- Se actualizan las variables: la partida deja de estar activa, la partida ha terminado, la puntuación final es la del contador de clicks --- */
    this.gameActive = false;
    this.gameEnded = true;
    this.finalScore = this.clickCount;

    /* --- Se devuelve un mensaje dependiendo del número de clicks que se hayan hecho --- */
    if (this.clickCount >= 200) {

      this.gameOverMessage = 'Amazing! You\'re a click master!';

    } else if (this.clickCount >= 150) {

      this.gameOverMessage = 'Excellent! You have fast fingers!';

    } else if (this.clickCount >= 100) {

      this.gameOverMessage = 'Very good! Keep practicing!';

    } else if (this.clickCount >= 50) {

      this.gameOverMessage = 'Good try! You can improve!';

    } else {

      this.gameOverMessage = 'Don\'t give up! Try again!';

    }
    
    /* --- Se inicia la variable para guardar el nombre del jugador y se muestra el modal --- */
    this.playerName = '';
    this.showModal = true;

  }
  
  /* --- Método para guardar la puntuación y volver al menú --- */
  async saveAndGoToMenu() {

    await this.saveScore();
    this.showModal = false;

  }
  
  /* --- Método para reiniciar la partida sin guardar la puntuación --- */
  resetGameWithoutSaving() {

    /* --- Se cierra el modal, se indica que la partida ha terminado, se reinicia el contador de clicks, el tiempo restante, el nombre del jugador y se inicia la partida --- */
    this.showModal = false;
    this.gameEnded = false;
    this.clickCount = 0;
    this.timeRemaining = 30;
    this.playerName = '';
    this.startGame();

  }
  
  /* --- Método para cerrar el modal sin guardar la puntuación --- */
  closeModalWithoutSaving() {

    this.showModal = false;
    this.playerName = '';

  }
  
  /* --- Método para guardar la puntuación --- */
  async saveScore() {

    /* --- Si no se ha indicado un nombre, no se guarda la puntuación --- */
    if (!this.playerName || !this.playerName.trim()) {

      console.log('No se ha indicado un nombre, no se ha guardado la puntuación');
      return;

    }
    
    /* --- Se intenta guardar la puntuación --- */
    try {

      /* --- Si la API está disponible y tiene el método saveScore --- */
      if (window.api && window.api.saveScore) {

        /* --- Se guarda la puntuación --- */
        const result = await window.api.saveScore(this.playerName.trim(), this.finalScore);

        /* --- Se comprueba que la puntuación se ha guardado correctamente --- */
        if (result.success) {

          /* --- Se muestra un mensaje de éxito --- */
          console.log('Puntuación guardada correctamente!');

        } else {

          /* --- Se muestra un mensaje de error --- */
          console.error('Error al guardar la puntuación:', result.error);

        }

      } else {

        /* --- Se muestra un mensaje de error --- */
        console.log('API no disponible');

      }

    } catch (error) {

      /* --- Se muestra un mensaje de error --- */
      console.error('Error al guardar la puntuación:', error);

    }

  }
  
  /* --- Método que se ejecuta cuando la vista se destruye --- */
  ngOnDestroy() {

    /* --- Si el cronómetro está activo, se detiene --- */
    if (this.timerInterval) {

      clearInterval(this.timerInterval);

    }

  }

}