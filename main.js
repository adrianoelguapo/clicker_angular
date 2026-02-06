const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { saveScore, getTopScores } = require('./database');

/* --- Variable para la ventana de Electron --- */
let win;

/* --- Método para crear la ventana --- */
function createWindow() {

  win = new BrowserWindow({

    width: 1024,
    height: 768,
    show: false,
    webPreferences: {

      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')

    }

  });

  win.maximize();
  win.show();

  const distPath = path.join(__dirname, 'dist/clicker_angular/browser/index.html');
  
  win.loadFile(distPath);

  win.on('closed', () => {

    win = null;

  });

}

/* --- Evento para guardar la puntuación --- */
ipcMain.handle('save-score', async (event, { name, clicks }) => {

  try {

    const result = await saveScore(name, clicks);
    return { success: true, data: result };

  } catch (error) {

    return { success: false, error: error.message };

  }

});

/* --- Evento para obtener puntuaciones --- */
ipcMain.handle('get-scores', async () => {

  try {

    const scores = await getTopScores(10);
    return { success: true, data: scores };

  } catch (error) {

    return { success: false, error: error.message };

  }
  
});


app.on('ready', createWindow);

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {

    app.quit();

  }

});

app.on('activate', () => {

  if (win === null) {

    createWindow();

  }

});