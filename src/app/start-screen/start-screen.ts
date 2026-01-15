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
    // Cerrar la aplicación directamente sin diálogos
    window.close();
  }
}
