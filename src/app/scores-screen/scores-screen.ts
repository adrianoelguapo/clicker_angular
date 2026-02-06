import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/* --- Definir la interfaz de la API --- */
declare global {

  interface Window {

    api?: {

      saveScore: (name: string, clicks: number) => Promise<any>;
      getTopScores: () => Promise<any>;

    };

  }

}

/* --- Definir la estructura (modelo) de una puntuación --- */
interface Score {

  score_id: number;
  name: string;
  clicks: number;

}

/* --- Definir el componente de la vista de puntuaciones --- */
@Component({

  selector: 'app-scores-screen',
  imports: [RouterModule, CommonModule],
  templateUrl: './scores-screen.html',

})

/* --- Clase de la lógica de la vista de puntuaciones --- */
export class ScoresScreen implements OnInit {

  /* --- Atributos --- */
  scores: Score[] = [];
  loading = true;
  error = false;

  /* --- Constructor --- */
  constructor(

    private ngZone: NgZone,
    private cdr: ChangeDetectorRef

  ) {}

  /* --- Al inciar la vista se cargan las puntuaciones --- */
  async ngOnInit() {

    await this.loadScores();

  }

  /* --- Cargar las puntuaciones en la vista --- */
  async loadScores() {

    /* --- Se asume que las puntuaciones aún se están cargando y que no ha habido ningún error --- */
    this.loading = true;
    this.error = false;

    try {

      /* --- Se comprueba que la API esté disponible y que el método para obtener las puntuaciones más altas esté disponible --- */
      if (window.api && window.api.getTopScores) {

        /* --- Se llama al método para obtener las puntuaciones más altas y se guardan en una constante --- */
        const result = await window.api.getTopScores();
        
        /* --- Actualizar la vista --- */
        this.ngZone.run(() => {

          /* --- Se comprueba que la petición se ha realizado correctamente y que hay datos --- */
          if (result.success && result.data) {

            /* --- Se actualizan las puntuaciones en la vista --- */
            this.scores = result.data;

          } else {

            /* --- Si hay un error se marca el valor como true y se mostrará en la vista el mensaje de que no hay puntuaciones --- */
            this.error = true;

          }

          /* --- Se marca el valor como false y se actualiza la vista --- */
          this.loading = false;
          this.cdr.markForCheck();

        });

      } else {

        /* --- Si hay un error se marca el valor como true y se mostrará en la vista el mensaje de que no hay puntuaciones --- */
        this.ngZone.run(() => {

          this.error = true;
          this.loading = false;
          this.cdr.markForCheck();
          
        });

      }

    } catch (err) {

      /* --- Si hay un error se marca el valor como true y se mostrará en la vista el mensaje de que no hay puntuaciones --- */
      this.ngZone.run(() => {

        this.error = true;
        this.loading = false;
        this.cdr.markForCheck();

      });

    }
    
  }

  /* --- Aplicar estilos a las tres primeras puntuaciones --- */
  getMedalClass(index: number): string {

    if (index === 0) return 'score-item-gold';
    if (index === 1) return 'score-item-silver';
    if (index === 2) return 'score-item-bronze';

    return '';

  }
  
}