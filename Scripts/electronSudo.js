var Sudoer = require('electron-sudo').default;
const path = require('path');
const helper = require('./HelperFunctions');
var options = {
    name: 'vpn-world',
    icns: helper.isDev() ? './Assets/icno.icns' : path.join(process.resourcesPath, 'icno.icns'), // (optional, only for MacOS),
    process: {
        options: {
            // Can use custom environment variables for your privileged subprocess
            // env: { 'VAR': 'VALUE' }
            // ... and all other subprocess options described here
            // https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
        },
        on: function(ps) {
            ps.stdout.on('data', function(data) {
                console.log(data);
            });
            setTimeout(function() {
                ps.kill()
            }.bind(ps), 50000);
        }
    }
};
var sudoer = new Sudoer(options);
module.exports.cd = sudoer;