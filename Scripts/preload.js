const { contextBridge, ipcRenderer } = require('electron')
const validChannels = ["changeIcon", "openlink"]
// Renderer process
// const { port1, port2 } = new MessageChannel()
contextBridge.exposeInMainWorld('vpn', {
    changeIcon: (channel, ...args) => {
        if ( validChannels.includes(channel) && ipcRenderer) {
            ipcRenderer.send(channel, ...args)
        };
    },
    openlink: (channel, ...args) => {
        if ( validChannels.includes(channel) && ipcRenderer) {
            ipcRenderer.send(channel, ...args)
        };
    },
})