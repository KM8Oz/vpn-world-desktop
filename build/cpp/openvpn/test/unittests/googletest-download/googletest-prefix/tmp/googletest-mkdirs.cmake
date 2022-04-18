# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

file(MAKE_DIRECTORY
  "/Users/novyjpolzovatel/Desktop/vpndesktop/build/cpp/openvpn/test/unittests/googletest-src"
  "/Users/novyjpolzovatel/Desktop/vpndesktop/build/cpp/openvpn/test/unittests/googletest-build"
  "/Users/novyjpolzovatel/Desktop/vpndesktop/build/cpp/openvpn/test/unittests/googletest-download/googletest-prefix"
  "/Users/novyjpolzovatel/Desktop/vpndesktop/build/cpp/openvpn/test/unittests/googletest-download/googletest-prefix/tmp"
  "/Users/novyjpolzovatel/Desktop/vpndesktop/build/cpp/openvpn/test/unittests/googletest-download/googletest-prefix/src/googletest-stamp"
  "/Users/novyjpolzovatel/Desktop/vpndesktop/build/cpp/openvpn/test/unittests/googletest-download/googletest-prefix/src"
  "/Users/novyjpolzovatel/Desktop/vpndesktop/build/cpp/openvpn/test/unittests/googletest-download/googletest-prefix/src/googletest-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "/Users/novyjpolzovatel/Desktop/vpndesktop/build/cpp/openvpn/test/unittests/googletest-download/googletest-prefix/src/googletest-stamp/${subDir}")
endforeach()
