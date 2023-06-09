const electron = require('electron');

process.once('loaded', () => {
    global.ipcRenderer = electron.ipcRenderer;
    global.app = electron.remote.app;
});

electron.contextBridge.exposeInMainWorld('electronAPI', {
    saveFile: (data) => ipcRenderer.invoke('save-file', data),
    convCmd: (data) => ipcRenderer.invoke('conv-cmd', data),
});