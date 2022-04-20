#!/bin/sh
test -f vpnworld.dmg && rm vpnworld.dmg
create-dmg \
  --volname "VpnWorld Installer" \
  --volicon "./assets/icons/mac/icon.icns" \
  --background "back.png" \
  --window-pos 100 100 \
  --window-size 515 351 \
  --icon-size 100 \
  --icon "vpnworld.app" 200 190 \
  --hide-extension "vpnworld.app" \
  --app-drop-link 400 100 \
  "vpnworld.dmg" \
  "release/build/mac/"