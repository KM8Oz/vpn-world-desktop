const { app, BrowserWindow, Tray, nativeImage } = require('electron');
const helper = require('./HelperFunctions.js');
var sudo = require("sudo-prompt");
const path = require('path');
const child = require('child_process');
const isDev = require('electron-is-dev');
class WindowManager {
    constructor() {
        //Iconpaht different in Build
        this.configpath = helper.isDev() ? '/Assets/client.ovpn' : path.join(process.resourcesPath, 'client.ovpn');
        this.binarypath = helper.isDev() ? './Assets/bin/sbin/openvpn' : path.join(process.resourcesPath, 'bin/sbin/openvpn');
        this.sudopath = helper.isDev() ? './Assets/sudo/gksudo' : path.join(process.resourcesPath, 'sudo/gksudo');
        let imgPath = helper.isDev() ? './Assets/Icon.png' : path.join(process.resourcesPath, 'Icon.png');
        this.icns = helper.isDev() ? './Assets/icno.icns' : path.join(process.resourcesPath, 'icno.icns')
        let imgPath1 = helper.isDev() ? './Assets/Icon1.png' : path.join(process.resourcesPath, 'Icon1.png');
        this.icon = nativeImage.createFromPath(imgPath);
        this.icon1 = nativeImage.createFromPath(imgPath1);
    }
    async connect() {
       return await this.initializeit(this.binarypath, {
            host: 'vpn.oldidev.ru',
            port: 1194, // port should *always* be set at this point but we will defualt it anyway to 1337 just incase.
            config:this.configpath
        })
    }
    initializeit(binarypath,options){
        return new Promise((resolve, reject)=>{
            var arg = [
                '--proto-force',
                'udp',
                '--dev',
                'tun0',
                '--auth-nocache',
                '--remote',
                options.host,
                options.port,
                '--config',
                "$(PWD)"+options.config,
                '--daemon', "vpnworld"
              ];
              var option = {
                name: 'VPN WORLD',
                icns: this.icns, // (optional)
              };
              try {
                sudo.exec(binarypath+" "+arg.join(" "),option,
                function(error, stdout, stderr) {
                  if (error) reject(error);
                  resolve('stdout: ' + stdout);
                }
              )   
              } catch (error) {
                  reject(error)
              }
        })
    }
    disconnect(){
        return new Promise((resolve, reject)=>{
              var option = {
                name: 'VPN WORLD',
                icns: this.icns, // (optional)
              };
              try {
                sudo.exec("killall openvpn",option,
                function(error, stdout, stderr) {
                  if (error) reject(error);
                  resolve('stdout: ' + stdout);
                }
              )   
              } catch (error) {
                  reject(error)
              }
        })
    }
    //Creates a Tray and a Windows
    setIcon(value) {
        if (value) {
            this.tray.setToolTip('connected')
            this.tray.setImage(this.icon1)
        } else {
            this.tray.setToolTip('offline')
            this.tray.setImage(this.icon)
        }
    }
    createUI() {
        if (process.platform == "darwin")
            app.dock.hide();
        this.createTray();
        this.createMainWindow();
    }

    createTray() {
        this.tray = new Tray(this.icon);
        this.tray.on('click', this.toggleWindowMain.bind(this));

        if (process.platform == "darwin")
            this.tray.setIgnoreDoubleClickEvents(true); //Better UX on MacOS
    }

    createMainWindow() {
        this.win = new BrowserWindow({
            width: 250,
            height: 435,
            frame: false,
            show: false,
            fullscreenable: false,
            movable: false,
            resizable: false,
            webPreferences: {
                contextIsolation: true,
                preload: path.join(__dirname, 'preload.js'),
            },
            skipTaskbar: true
        })
        this.win.loadURL(
            isDev ?
                'http://localhost:3000' :
                `file://${path.join(__dirname, '../build/index.html')}`
        );
        // Open the DevTools.
        // if (isDev) {
        //     win.webContents.openDevTools({ mode: 'detach' });
        // }
        // this.win.loadFile('index.html');
        this.win.setVisibleOnAllWorkspaces(true);

        //When closing Windows
        this.win.on('closed', () => {
            this.win = null
        })
    }

    getWindowPosition() {
        const windowBounds = this.win.getBounds()
        const trayBounds = this.tray.getBounds()

        let x = 0;
        let y = 0;

        //MacOS
        if (process.platform != "win32") {
            // Center window horizontally below the tray icon
            x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
            // Position window 4 pixels vertically below the tray icon
            y = Math.round(trayBounds.y + trayBounds.height + 4)

            return {
                x: x,
                y: y
            }
        }
        //On Windows the Task bar is sadly very flexible
        else {
            if (trayBounds.y < 250) {
                x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
                y = Math.round(trayBounds.y + trayBounds.height + 4)
            } else if (trayBounds.x < 250) {
                x = Math.round(trayBounds.x + trayBounds.height * 2);
                y = Math.round(trayBounds.y - windowBounds.height + trayBounds.height)
            } else if (trayBounds.height >= 40) {
                x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
                y = Math.round(trayBounds.y - windowBounds.height)
            } else {
                x = Math.round(trayBounds.x - windowBounds.width);
                y = Math.round(trayBounds.y - windowBounds.height + trayBounds.height)
            }
            return {
                x: x,
                y: y
            }
        }
    }

    showMainWindow() {
        const position = this.getWindowPosition();
        this.win.setPosition(position.x, position.y);
        this.win.show()
        this.win.focus()

        //This is necessary for the window to appear on windows
        if (process.platform == "win32") {
            this.win.moveTop();
        }
    }


    toggleWindowMain() {
        //This triggers if the window is visible but occluded
        if (!this.win.isFocused() && this.win.isVisible()) {
            this.showMainWindow();
            return;
        }
        if (this.win.isVisible()) {
            this.win.hide()
        } else {
            this.showMainWindow();
        }
    }
}

module.exports = WindowManager;