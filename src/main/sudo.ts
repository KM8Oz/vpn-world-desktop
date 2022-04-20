const os = require("os")
const helper = require('./HelperFunctions.js');
const { gte } = require("semver");
const { env } = require('process')
const path = require("path");
const { execFileSync, execFile } = require("child_process")
var { exec } = require('sudo-prompt');
var icns = helper.isDev() ? './assets/icno.icns' : path.join(process.resourcesPath, 'assets/icno.icns')
var sudoaskpass = helper.isDev() ? './assets/sudo-askpass.osascript.js' : path.join(process.resourcesPath, 'assets/sudo-askpass.osascript.js')
const catalinaSudoExec = (cmd: any) => {
    // console.log({env});
    return execFile("sudo", ["--askpass", "sh", "-c", cmd], {
        encoding: "utf8",
        env: {
            PATH: env.PATH,
            SUDO_ASKPASS: sudoaskpass,
            NODE_ENV: helper.isDev() ? "development" : "production"
        },
    })
}

module.exports.sudoExec = (cmd: any) => {
    if (os.platform() === "darwin" && gte(os.release(), "19.0.0")) {
        // >= macOS Catalina
        return catalinaSudoExec(cmd)
    }
    exec(
        cmd,
        {
            name: 'VPN WORLD',
            icns: icns,
        },
        (error: any, stdout: any, stderr: any) => {
            console.info("[sudo-exec]", stdout, stderr)
            if (error) {
                console.error("[sudo-exec] error:", error)
            }
        },
    )
}