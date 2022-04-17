cmake_minimum_required(VERSION 3.9)
cmake_policy(SET CMP0042 NEW)
set (CMAKE_CXX_STANDARD 11)
set(VCPKG_CRT_LINKAGE dynamic)
set(VCPKG_LIBRARY_LINKAGE dynamic)
set(VCPKG_PLATFORM_TOOLSET "v142")
set(VCPKG_DEP_INFO_OVERRIDE_VARS "v142")
set(VCPKG_BUILD_TYPE release)
project (openvpn)
include_directories(${CMAKE_JS_INC})
file(GLOB SOURCE_FILES "cpp/module.cc")
add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})

# Include Node-API wrappers
execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )
set(CMAKE_MODULE_PATH ${CMAKE_CURRENT_SOURCE_DIR}/cpp/openvpn/cmake
                      ${CMAKE_MODULE_PATH})
set(CMAKE_CXX_STANDARD 11)

include(findcoredeps)
string(REGEX REPLACE "[\r\n\"]" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})

target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_ADDON_API_DIR})

# define NPI_VERSION
add_definitions(-DNAPI_VERSION=3)
add_subdirectory(cpp/openvpn/client)
add_subdirectory(cpp/openvpn/test/unittests)
add_subdirectory(cpp/openvpn/test/ovpncli)
add_subdirectory(cpp/openvpn/test/ssl)

if (WIN32)
    add_subdirectory(cpp/openvpn/openvpn/omi)
    add_subdirectory(cpp/openvpn/openvpn/ovpnagent/win)
endif ()

if (APPLE)
    add_subdirectory(cpp/openvpn/openvpn/ovpnagent/mac)
endif ()
