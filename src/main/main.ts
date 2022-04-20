import { app, ipcMain } from 'electron';
import WindowManager from './WindowManager';
import { shell } from 'electron';
//Main Object responsible for managing the electron windows is created
var windowManager = new WindowManager();
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
//Called when Electron is ready
//This creates the browser windows and tray in the menu bar
// app.on('ready', windowManager.createUI.bind(windowManager));
//When all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on('exit', (_event) => app.quit());
ipcMain.on("openlink", async (_event, ...arg)=>{
    if(arg[0]){
        shell.openExternal(arg[0].link)
    }
})
ipcMain.on('changeIcon', async (_event, ...arg) => {
        // console.log ('changeIcon received arg:', arg);
        app.dock.hide();
        if(arg[0]){
            if(arg[0].status){
                windowManager.setIcon(true)
                windowManager.connect().then((a:any)=>{
                    console.log("connect", a.pid);
                }).catch((eer:any)=>{
                    console.log("connect err:",eer);
                })
            } else {
                windowManager.setIcon(false)
                windowManager.disconnect().then((a:any)=>{
                    console.log("disconnect", a?.pid);
                }).catch((eer: any)=>{
                    console.log("connect err:",eer);
                })
            }
        }
})
app.whenReady().then(windowManager.createUI.bind(windowManager));