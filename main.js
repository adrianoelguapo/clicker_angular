const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: false, // Por seguridad
      contextIsolation: true, // Por seguridad
      preload: path.join(__dirname, 'preload.js') // Opcional por ahora
    }
  });

  // IMPORTANTE: Cargar el index.html compilado por Angular
  // Angular compila en dist/clicker_angular/browser/index.html
  const distPath = path.join(__dirname, 'dist/clicker_angular/browser/index.html');
  
  win.loadFile(distPath);

  // Abrir herramientas de desarrollo (DevTools)
  // win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

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