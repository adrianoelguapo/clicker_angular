import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  imports: [RouterModule],
  templateUrl: './start-screen.html',
  styleUrl: './start-screen.css',
})
export class StartScreen {
  exitGame() {
    if (confirm('¿Estás seguro de que quieres salir del juego?')) {
      alert('Gracias por jugar a Click Master! 👋');
      // In Electron, you could use: window.close();
    }
  }
}

