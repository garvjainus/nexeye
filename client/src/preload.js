const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Health check
  checkHealth: () => ipcRenderer.invoke('api:health'),
  
  // Recommendations
  getChampionRecommendation: (data) => ipcRenderer.invoke('api:champion-recommendation', data),
  getBuildRecommendation: (data) => ipcRenderer.invoke('api:build-recommendation', data),
});

