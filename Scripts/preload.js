const { contextBridge, ipcRenderer } = require('electron')
const validChannels = ["changeIcon"]
// Renderer process
// const { port1, port2 } = new MessageChannel()
contextBridge.exposeInMainWorld('vpn', {
    changeIcon: (channel, ...args) => {
        if ( validChannels.includes(channel) && ipcRenderer) {
            ipcRenderer.send(channel, ...args)
        };
    },
})