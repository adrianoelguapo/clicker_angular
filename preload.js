const { contextBridge, ipcRenderer } = require('electron');

/* --- Exponer API al renderer --- */
contextBridge.exposeInMainWorld('api', {
    
    /* --- Guardar puntuación --- */
    saveScore: (name, clicks) => {

        return ipcRenderer.invoke('save-score', { name, clicks });

    },
    
    /* --- Obtener puntuaciones --- */
    getTopScores: () => {

        return ipcRenderer.invoke('get-scores');

    }
    
});