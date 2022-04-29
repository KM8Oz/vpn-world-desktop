const { signAsync } = require('@electron/osx-sign')
const path = require("path")
signAsync({
  app: path.resolve(__dirname,"../../release/build/mac/vpnworld.app"),
  preEmbedProvisioningProfile:path.resolve(__dirname, "../vpn_world_desktop_profile.provisionprofile"),
  identity:"07F375B19F642D793E0957C46FF4624EEBE49273",
  version:"1.0.1",
  type:"distribution",
  platform:"darwin",
  preAutoEntitlements:true,
  pkg:path.resolve(__dirname,"../../release/build/"),
  ignore:(f)=>f.search(/openvpn/g)!==-1
})
  .then(function () {
    // Application signed
    console.log("signed");
  })
  .catch(function (err) {
    // Handle the error
    console.log("signing error:", err);
  })