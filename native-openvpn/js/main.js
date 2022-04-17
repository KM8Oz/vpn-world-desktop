var addon = require('bindings')('openvpn');

console.log(addon.hello()); // 'world'