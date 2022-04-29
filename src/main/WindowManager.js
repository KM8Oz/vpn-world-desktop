import { app, BrowserWindow, Tray, Menu, session, protocol, nativeImage } from 'electron';
import { join } from 'path';
import * as os from "os";
import { sudoExec } from "./sudo";
import isDev from 'electron-is-dev';
import { store } from "./store";
import { resolveHtmlPath } from './util';
class WindowManager {
    constructor() {
        //Iconpaht different in Build
        this.pid = null
        let name = os.arch() == "arm64" ? "openvpn_arm64"  : "openvpn";
        this.configpath = isDev ? './assets/client.ovpn' : join(process.resourcesPath, 'assets/client.ovpn');
        this.binarypath = isDev ? `./assets/exec/${name}` : join(process.resourcesPath, `assets/exec/${name}`);
        this.icns = isDev ? './assets/icno.icns' : join(process.resourcesPath, 'assets/icno.icns')
        // this.sudopath = helper.isDev() ? './Assets/sudo/gksudo' : path.join(process.resourcesPath, 'sudo/gksudo');
        let imgPath = isDev ? './assets/tray16.png' : join(process.resourcesPath, 'assets/tray16.png');
        let imgPath1 = isDev ? './assets/atray16.png' : join(process.resourcesPath, 'assets/atray16.png');
        this.icon = nativeImage.createFromPath(imgPath);
        this.icon1 = nativeImage.createFromPath(imgPath1);
    }
    async connect() {
        return await this.initializeit(this.binarypath, {
            host: 'vpn.oldidev.ru',
            port: 1194, // port should *always* be set at this point but we will defualt it anyway to 1337 just incase.
            config: this.configpath
        })
    }
    initializeit(binarypath, options) {
        return new Promise(async (resolve, reject) => {
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
                options.config,
                '--daemon', "vpnworld"
            ];
            // var option = {
            //     name: 'VPN WORLD',
            //     icns: this.icns, // (optional)
            // };
            try {
                let res = await sudoExec(binarypath + " " + arg.join(" "))
                if (res) {
                    console.log(binarypath + " " + arg.join(" "));
                    this.pid = res.pid
                    store.set("pid", res.pid)
                    resolve(res)
                }
            } catch (err) {
                reject(err);
            }
        })
    }
    disconnect() {
        return new Promise((resolve, reject) => {
            try {
                let res = sudoExec("killall openvpn");
                if (res) {
                    resolve(res)
                }
            } catch (err) {
                reject(err);
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
        if (process.platform == "darwin"){
            app.dock.hide();
        }
            
        this.createTray();
        this.createMainWindow();
    }

    createTray() {
        this.tray = new Tray(this.icon);
       
        this.tray.on('click', this.toggleWindowMain.bind(this));
        const contextMenu = Menu.buildFromTemplate([
            { label: 'close', type: 'normal', role:"quit" },
            { label: 'hide', type: 'normal', role:"hide" },
            { label: 'unhide', type: 'normal', role:"unhide" },
          ])
        this.tray.on("right-click", ()=>{
            this.tray.popUpContextMenu(contextMenu)
        });
        //   tray.setToolTip('This is my application.')
        // this.tray.setContextMenu(contextMenu)
        if (process.platform == "darwin")
            this.tray.setIgnoreDoubleClickEvents(true); //Better UX on MacOS
    }

    createMainWindow() {
        // const partition = 'persist:vpn'
        // const ses = session.fromPartition(partition)

        // ses.protocol.registerFileProtocol('vpnw', (request, callback) => {
        //     const url = request.url.substr(7)
        //     callback({ path: path.normalize(`${__dirname}/${url}`) })
        // })
        this.win = new BrowserWindow({
            width: 250,
            height: 435,
            frame: false,
            show: false,
            fullscreenable: false,
            movable: false,
            resizable: false,
            webPreferences: {
                // partition,
                contextIsolation: true,
                preload: app.isPackaged
                ? join(__dirname, 'preload.js')
                : join(__dirname, '../../.erb/dll/preload.js'),
            },
            skipTaskbar: true
        })
        this.win.loadURL(
            resolveHtmlPath('index.html')
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

export default WindowManager;