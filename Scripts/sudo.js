const os = require("os")
const helper = require('./HelperFunctions.js');
const { gte } = require("semver");
const { env } = require('process')
const { execFileSync, execFile } = require("child_process")
var { exec } = require('sudo-prompt');
var icns = helper.isDev() ? './Assets/icno.icns' : path.join(process.resourcesPath, 'icno.icns')
var sudoaskpass = helper.isDev() ? './Assets/sudo-askpass.osascript.js' : path.join(process.resourcesPath, 'sudo-askpass.osascript.js')
const catalinaSudoExec = (cmd) => {
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

module.exports.sudoExec = (cmd) => {
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
        (error, stdout, stderr) => {
            log.info("[sudo-exec]", stdout, stderr)
            if (error) {
                log.error("[sudo-exec] error:", error)
            }
        },
    )
}