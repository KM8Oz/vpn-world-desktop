const { app, ipcMain } = require('electron')
const WindowManager = require('./Scripts/WindowManager.js');

//Main Object responsible for managing the electron windows is created
windowManager = new WindowManager();

//Called when Electron is ready
//This creates the browser windows and tray in the menu bar
// app.on('ready', windowManager.createUI.bind(windowManager));
//When all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
ipcMain.on('exit', (event, bool) => app.quit());
ipcMain.on('changeIcon', async (event, ...arg) => {
        // console.log ('changeIcon received arg:', arg);
        if(arg[0]){
            if(arg[0].status){
                windowManager.setIcon(true)
                windowManager.connect().then((a)=>{
                    console.log(a);
                }).catch(eer=>{
                    console.log("connect err:",eer);
                })
            } else {
                windowManager.setIcon(false)
                windowManager.disconnect().then((a)=>{
                    console.log(a);
                }).catch(eer=>{
                    console.log("connect err:",eer);
                })
            }
        }
})
app.whenReady().then(windowManager.createUI.bind(windowManager));