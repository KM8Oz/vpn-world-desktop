cmake_minimum_required(VERSION 3.5)

project(googletest-download NONE)

include(ExternalProject)
ExternalProject_Add(googletest
  GIT_REPOSITORY    https://github.com/google/googletest.git
        GIT_TAG           "release-1.11.0"
        SOURCE_DIR        "/Users/novyjpolzovatel/Desktop/vpndesktop/native-openvpn/build/cpp/openvpn/test/unittests/googletest-src"
        BINARY_DIR        "/Users/novyjpolzovatel/Desktop/vpndesktop/native-openvpn/build/cpp/openvpn/test/unittests/googletest-build"
        CONFIGURE_COMMAND ""
        BUILD_COMMAND     ""
        INSTALL_COMMAND   ""
        TEST_COMMAND      ""
        )
