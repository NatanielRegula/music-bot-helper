/**
 * @name ZoxMusicBotHelper
 * @description describe
 * @author NR
 * @version undefined
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/botController/botController.ts":
/*!********************************************!*\
  !*** ./src/botController/botController.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentVoiceChannelUsersIds: () => (/* binding */ getCurrentVoiceChannelUsersIds),
/* harmony export */   getCurrentlyActiveBotId: () => (/* binding */ getCurrentlyActiveBotId),
/* harmony export */   getMusicBotsInCurrentVoiceChat: () => (/* binding */ getMusicBotsInCurrentVoiceChat)
/* harmony export */ });
/* harmony import */ var _dis_modules_stores__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dis/modules/stores */ "./src/dis/modules/stores.ts");

function getCurrentVoiceChannelUsersIds() {
    var voiceStatesForCurrentVoiceChannelObject = _dis_modules_stores__WEBPACK_IMPORTED_MODULE_0__.DisVoiceStateStore.getVoiceStatesForChannel(_dis_modules_stores__WEBPACK_IMPORTED_MODULE_0__.DisSelectedChannelStore.getVoiceChannelId());
    var currentVoiceChannelUsersIds = Object.keys(voiceStatesForCurrentVoiceChannelObject).map(function (key) { return voiceStatesForCurrentVoiceChannelObject[key].userId; });
    return currentVoiceChannelUsersIds;
}
function getCurrentlyActiveBotId() {
    //this will in the future allow to switch between multiple bots in vc
    //for now it just gives the first form the list
    var selectedBots = getMusicBotsInCurrentVoiceChat();
    if (selectedBots.length == 0)
        return null;
    return selectedBots[0];
}
function getMusicBotsInCurrentVoiceChat() {
    var currentVoiceChannelUsersIds = getCurrentVoiceChannelUsersIds();
    var detectedBotsIds = currentVoiceChannelUsersIds.filter(function (userId) { return _dis_modules_stores__WEBPACK_IMPORTED_MODULE_0__.DisUserStore.getUser(userId).bot; });
    return detectedBotsIds;
}


/***/ }),

/***/ "./src/dis/modules/modules.ts":
/*!************************************!*\
  !*** ./src/dis/modules/modules.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DisAudioCtl: () => (/* binding */ DisAudioCtl)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/bdApi */ "./src/utils/bdApi.ts");

//audio info
var DisAudioCtl = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].findModuleByProps('toggleLocalMute', 'setLocalVolume');


/***/ }),

/***/ "./src/dis/modules/stores.ts":
/*!***********************************!*\
  !*** ./src/dis/modules/stores.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DisMediaInfo: () => (/* binding */ DisMediaInfo),
/* harmony export */   DisSelectedChannelStore: () => (/* binding */ DisSelectedChannelStore),
/* harmony export */   DisUserStore: () => (/* binding */ DisUserStore),
/* harmony export */   DisVoiceStateStore: () => (/* binding */ DisVoiceStateStore)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/bdApi */ "./src/utils/bdApi.ts");

var DisVoiceStateStore = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].findModuleByProps('getVoiceStateForUser', 'getVoiceStatesForChannel');
var DisSelectedChannelStore = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].findModuleByProps('getLastSelectedChannelId');
//guild info
var DisUserStore = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].findModuleByProps('getCurrentUser', 'getUser');
var DisMediaInfo = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].findModuleByProps('getOutputVolume');


/***/ }),

/***/ "./src/dis/modules/uiComponents.ts":
/*!*****************************************!*\
  !*** ./src/dis/modules/uiComponents.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Switch: () => (/* binding */ Switch)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/bdApi */ "./src/utils/bdApi.ts");

var DisUiComponents = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].findModuleByProps('AnimatedAvatar');
var Switch = DisUiComponents.Switch;


/***/ }),

/***/ "./src/dis/nativeModules/discordUtils.ts":
/*!***********************************************!*\
  !*** ./src/dis/nativeModules/discordUtils.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var NativeDisUtils = window.DiscordNative.nativeModules.requireModule('discord_utils');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NativeDisUtils);


/***/ }),

/***/ "./src/ui/changeLogPopup/ChangeLogPopup.tsx":
/*!**************************************************!*\
  !*** ./src/ui/changeLogPopup/ChangeLogPopup.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/bdApi */ "./src/utils/bdApi.ts");
/* harmony import */ var _changelog_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../changelog.json */ "./changelog.json");
/* harmony import */ var _components_ChangesUl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ChangesUl */ "./src/ui/changeLogPopup/components/ChangesUl.tsx");
/* harmony import */ var _components_EnablePluginPrompt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/EnablePluginPrompt */ "./src/ui/changeLogPopup/components/EnablePluginPrompt.tsx");




function ChangeLogPopup(props) {
    return (_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "colorStandard-1Xxp1s size12-12FL_s" },
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_components_EnablePluginPrompt__WEBPACK_IMPORTED_MODULE_3__["default"], null),
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "content-FDHp32" }, Object.entries(_changelog_json__WEBPACK_IMPORTED_MODULE_1__).map(function (_a) {
            var _ = _a[0], value = _a[1];
            return (_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { style: {
                    padding: '1rem',
                    background: 'var(--primary-700)',
                    borderRadius: '5px',
                    margin: '0 0 1rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                } },
                _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", { style: {
                        //   alignSelf: 'flex-end',
                        margin: '0 0 1rem 0',
                    }, className: "defaultColor-1EVLSt heading-lg-semibold-14ouVv" }, value.title),
                _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_components_ChangesUl__WEBPACK_IMPORTED_MODULE_2__.ChangesUlImprovements, { changes: value.improved }),
                _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_components_ChangesUl__WEBPACK_IMPORTED_MODULE_2__.ChangesUlBugFixes, { changes: value.fixed })));
        }))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChangeLogPopup);


/***/ }),

/***/ "./src/ui/changeLogPopup/ChangeLogTopBanner.tsx":
/*!******************************************************!*\
  !*** ./src/ui/changeLogPopup/ChangeLogTopBanner.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChangeLogTopBanner)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/bdApi */ "./src/utils/bdApi.ts");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config.json */ "./config.json");


function ChangeLogTopBanner() {
    return (_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { style: {
            display: 'flex',
            flexDirection: 'column',
        } },
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { style: {
                width: '410px',
                display: 'flex',
                justifyContent: 'space-between',
            } },
            _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", { style: {
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                } }, "Plugin updated"),
            _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", { style: {
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    color: 'var(--text-normal)',
                } }, "Current Version: ".concat(_config_json__WEBPACK_IMPORTED_MODULE_1__.version))),
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null, "".concat(_config_json__WEBPACK_IMPORTED_MODULE_1__.name))));
}


/***/ }),

/***/ "./src/ui/changeLogPopup/components/ChangesUl.tsx":
/*!********************************************************!*\
  !*** ./src/ui/changeLogPopup/components/ChangesUl.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChangesUlBugFixes: () => (/* binding */ ChangesUlBugFixes),
/* harmony export */   ChangesUlImprovements: () => (/* binding */ ChangesUlImprovements)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/bdApi */ "./src/utils/bdApi.ts");

function ChangesUlImprovements(props) {
    return (_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", null, props.changes.length != 0 && (_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.Fragment, null,
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", { style: {
                color: 'var(--text-positive)',
                fontWeight: 600,
                //   textTransform: 'uppercase',
            } }, "Improvements"),
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("ul", { style: { margin: '.3rem 0px 1.5rem 1.5rem' } }, props.changes.map(function (change) {
            return _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("li", null, change);
        }))))));
}
function ChangesUlBugFixes(props) {
    return (_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", null, props.changes.length != 0 && (_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.Fragment, null,
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", { style: {
                color: 'var(--text-danger)',
                fontWeight: 600,
                //   textTransform: 'uppercase',
            } }, "Bug fixes"),
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("ul", { style: { margin: '.3rem 0px 1.5rem 1.5rem' } }, props.changes.map(function (change) {
            return _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("li", null, change);
        }))))));
}


/***/ }),

/***/ "./src/ui/changeLogPopup/components/EnablePluginPrompt.tsx":
/*!*****************************************************************!*\
  !*** ./src/ui/changeLogPopup/components/EnablePluginPrompt.tsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EnablePluginPrompt)
/* harmony export */ });
/* harmony import */ var _dis_modules_uiComponents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../dis/modules/uiComponents */ "./src/dis/modules/uiComponents.ts");
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/bdApi */ "./src/utils/bdApi.ts");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../config.json */ "./config.json");



function EnablePluginPrompt(props) {
    var _a = (0,_utils_bdApi__WEBPACK_IMPORTED_MODULE_1__.useState)(_utils_bdApi__WEBPACK_IMPORTED_MODULE_1__["default"].Plugins.isEnabled(_config_json__WEBPACK_IMPORTED_MODULE_2__.name)), isChecked = _a[0], setIsChecked = _a[1];
    return (_utils_bdApi__WEBPACK_IMPORTED_MODULE_1__.React.createElement("div", { style: {
            boxShadow: 'var(--dark-elevation-border), var(--dark-elevation-high)',
            padding: '1rem',
            borderRadius: '5px',
            margin: '1rem 0 1rem 0',
            display: 'flex',
            flexDirection: 'column',
        } },
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_1__.React.createElement("div", { style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            } },
            _utils_bdApi__WEBPACK_IMPORTED_MODULE_1__.React.createElement("label", { htmlFor: "enablePlugin", className: "title-2yADjX" }, "Enable the plugin"),
            _utils_bdApi__WEBPACK_IMPORTED_MODULE_1__.React.createElement(_dis_modules_uiComponents__WEBPACK_IMPORTED_MODULE_0__.Switch, { id: "enablePlugin", checked: isChecked, onChange: function (value) {
                    _utils_bdApi__WEBPACK_IMPORTED_MODULE_1__["default"].Plugins.toggle(_config_json__WEBPACK_IMPORTED_MODULE_2__.name);
                    setIsChecked(_utils_bdApi__WEBPACK_IMPORTED_MODULE_1__["default"].Plugins.isEnabled(_config_json__WEBPACK_IMPORTED_MODULE_2__.name));
                } })),
        !isChecked && (_utils_bdApi__WEBPACK_IMPORTED_MODULE_1__.React.createElement("div", { style: { margin: '1rem 0 0 0' } },
            _utils_bdApi__WEBPACK_IMPORTED_MODULE_1__.React.createElement("span", { style: {
                    fontSize: ' 0.8rem',
                    textTransform: 'uppercase',
                    color: 'var(--text-danger)',
                } }, "Plugin is currently disabled!"),
            ' '))));
}


/***/ }),

/***/ "./src/utils/bdApi.ts":
/*!****************************!*\
  !*** ./src/utils/bdApi.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Data: () => (/* binding */ Data),
/* harmony export */   Patcher: () => (/* binding */ Patcher),
/* harmony export */   React: () => (/* binding */ React),
/* harmony export */   UI: () => (/* binding */ UI),
/* harmony export */   Webpack: () => (/* binding */ Webpack),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useState: () => (/* binding */ useState)
/* harmony export */ });
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config.json */ "./config.json");

var BdApi = new window.BdApi(_config_json__WEBPACK_IMPORTED_MODULE_0__.name);
var UI = BdApi.UI, React = BdApi.React, Patcher = BdApi.Patcher, Webpack = BdApi.Webpack, Data = BdApi.Data;
var useState = BdApi.React.useState;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BdApi);


/***/ }),

/***/ "./src/utils/keycodeMappings.ts":
/*!**************************************!*\
  !*** ./src/utils/keycodeMappings.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bdApi */ "./src/utils/bdApi.ts");

var linuxKeycodeMappings = _bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(function (m) { return m.ctrl === 0x25; }, {
    searchExports: true,
});
var windowsKeycodeMappings = _bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(function (m) { return m.ctrl === 0xa2; }, {
    searchExports: true,
});
var macKeycodeMappings = _bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(function (m) { return m.ctrl === 0xe0; }, {
    searchExports: true,
});
function getKeycodeMappings() {
    return window.DiscordNative.process.platform === 'linux'
        ? linuxKeycodeMappings
        : window.DiscordNative.process.platform === 'win32'
            ? windowsKeycodeMappings
            : macKeycodeMappings;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getKeycodeMappings);


/***/ }),

/***/ "./src/utils/logger.ts":
/*!*****************************!*\
  !*** ./src/utils/logger.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bdApi */ "./src/utils/bdApi.ts");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config.json */ "./config.json");


var Logger = _bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].findModuleByProps('logger').logger;
Logger.name = _config_json__WEBPACK_IMPORTED_MODULE_1__.name;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Logger);


/***/ }),

/***/ "./src/utils/versionChecker.tsx":
/*!**************************************!*\
  !*** ./src/utils/versionChecker.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkIfVersionUpdated)
/* harmony export */ });
/* harmony import */ var _bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bdApi */ "./src/utils/bdApi.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger */ "./src/utils/logger.ts");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config.json */ "./config.json");
/* harmony import */ var _ui_changeLogPopup_ChangeLogPopup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/changeLogPopup/ChangeLogPopup */ "./src/ui/changeLogPopup/ChangeLogPopup.tsx");
/* harmony import */ var _ui_changeLogPopup_ChangeLogTopBanner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/changeLogPopup/ChangeLogTopBanner */ "./src/ui/changeLogPopup/ChangeLogTopBanner.tsx");





function checkIfVersionUpdated() {
    if (_config_json__WEBPACK_IMPORTED_MODULE_2__.version != _bdApi__WEBPACK_IMPORTED_MODULE_0__.Data.load("lastLoadedVersion")) {
        _logger__WEBPACK_IMPORTED_MODULE_1__["default"].info('New version installed!');
        _bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].alert(_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_ui_changeLogPopup_ChangeLogTopBanner__WEBPACK_IMPORTED_MODULE_4__["default"], null), _bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_ui_changeLogPopup_ChangeLogPopup__WEBPACK_IMPORTED_MODULE_3__["default"], { newVersion: _config_json__WEBPACK_IMPORTED_MODULE_2__.version }));
        _bdApi__WEBPACK_IMPORTED_MODULE_0__.Data.save("lastLoadedVersion", _config_json__WEBPACK_IMPORTED_MODULE_2__.version);
    }
}


/***/ }),

/***/ "./changelog.json":
/*!************************!*\
  !*** ./changelog.json ***!
  \************************/
/***/ ((module) => {

module.exports = JSON.parse('{"0.0.6":{"title":"0.0.6","fixed":[],"improved":["Adds changelog back."]},"0.0.5":{"title":"0.0.5","fixed":[],"improved":["New version with new codebase."]},"0.0.4":{"title":"0.0.4","fixed":[],"improved":["Improved toast messages."]},"0.0.3":{"title":"0.0.3","fixed":["Fixed bugs"],"improved":[]},"0.0.2":{"title":"0.0.2","fixed":[],"improved":["Added toast message when bot muted or unmuted with the keybind"]}}');

/***/ }),

/***/ "./config.json":
/*!*********************!*\
  !*** ./config.json ***!
  \*********************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"ZoxMusicBotHelper","description":"zoxMusicBotHelper allows you to control a music bot that\'s in your vc.","author":"NR","version":"0.0.6"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _botController_botController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./botController/botController */ "./src/botController/botController.ts");
/* harmony import */ var _dis_modules_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dis/modules/modules */ "./src/dis/modules/modules.ts");
/* harmony import */ var _dis_modules_stores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dis/modules/stores */ "./src/dis/modules/stores.ts");
/* harmony import */ var _dis_nativeModules_discordUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dis/nativeModules/discordUtils */ "./src/dis/nativeModules/discordUtils.ts");
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/bdApi */ "./src/utils/bdApi.ts");
/* harmony import */ var _utils_keycodeMappings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/keycodeMappings */ "./src/utils/keycodeMappings.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _utils_versionChecker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/versionChecker */ "./src/utils/versionChecker.tsx");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var globalKeyboardShortcutsRegisterIds = [];
(0,_utils_versionChecker__WEBPACK_IMPORTED_MODULE_7__["default"])();
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    default_1.prototype.start = function () {
        var _this = this;
        _utils_logger__WEBPACK_IMPORTED_MODULE_6__["default"].info('Plugin enabled!');
        document.addEventListener('keydown', function () { return _this.keyBindHandler; });
        this.registerGlobalKeyboardShortcuts();
    };
    default_1.prototype.stop = function () {
        var _this = this;
        _utils_logger__WEBPACK_IMPORTED_MODULE_6__["default"].info('Plugin disabled!');
        document.removeEventListener('keydown', function () { return _this.keyBindHandler; });
        this.unregisterAllGlobalKeyboardShortcuts();
    };
    ///-----Audio actions / Bot interactions-----///
    default_1.prototype.toggleMuteClientSide = function () {
        var activeBotId = (0,_botController_botController__WEBPACK_IMPORTED_MODULE_0__.getCurrentlyActiveBotId)();
        if (activeBotId == null)
            return;
        _dis_modules_modules__WEBPACK_IMPORTED_MODULE_1__.DisAudioCtl.toggleLocalMute(activeBotId);
        var botName = _dis_modules_stores__WEBPACK_IMPORTED_MODULE_2__.DisUserStore.getUser(activeBotId).username;
        if (_dis_modules_stores__WEBPACK_IMPORTED_MODULE_2__.DisMediaInfo.isLocalMute(activeBotId)) {
            _utils_bdApi__WEBPACK_IMPORTED_MODULE_4__.UI.showToast("\u23F8\uFE0F ".concat(botName, " PAUSED (Just for you)"), {
                forceShow: true,
            });
        }
        else {
            _utils_bdApi__WEBPACK_IMPORTED_MODULE_4__.UI.showToast("\u25B6\uFE0F ".concat(botName, " RESUMED (Just for you)"), {
                forceShow: true,
            });
        }
    };
    ///-----Misc-----///
    default_1.prototype.keyBindHandler = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!e.ctrlKey || !e.altKey)
                    return [2 /*return*/];
                switch (e.code) {
                    // case 'KeyK':
                    //   this.toggleMuteClientSide();
                    //   break;
                    case 'KeyO':
                        // this.createFakeAudioPlayer();
                        break;
                    case 'KeyL':
                        // await this.openSetupDialog();
                        break;
                    case 'KeyN':
                        // await this.patchPlaybackUi();
                        break;
                    default:
                        return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        });
    };
    default_1.prototype.registerGlobalKeyboardShortcuts = function () {
        var _this = this;
        var keycodeMappings = (0,_utils_keycodeMappings__WEBPACK_IMPORTED_MODULE_5__["default"])();
        var toggleMuteClientSideRegisterId = Math.floor(Math.random() * 100000);
        globalKeyboardShortcutsRegisterIds.push(toggleMuteClientSideRegisterId);
        _dis_nativeModules_discordUtils__WEBPACK_IMPORTED_MODULE_3__["default"].inputEventRegister(toggleMuteClientSideRegisterId, [
            [0, keycodeMappings.ctrl],
            [0, keycodeMappings.alt],
            [0, keycodeMappings.k],
        ], function (isDown) {
            _utils_logger__WEBPACK_IMPORTED_MODULE_6__["default"].log("ctrl+alt+k - isDown ".concat(isDown));
            if (isDown) {
                _this.toggleMuteClientSide();
            }
        }, {
            blurred: true,
            focused: true,
            keydown: true,
            keyup: true,
        });
    };
    default_1.prototype.unregisterAllGlobalKeyboardShortcuts = function () {
        for (var _i = 0, globalKeyboardShortcutsRegisterIds_1 = globalKeyboardShortcutsRegisterIds; _i < globalKeyboardShortcutsRegisterIds_1.length; _i++) {
            var id = globalKeyboardShortcutsRegisterIds_1[_i];
            _dis_nativeModules_discordUtils__WEBPACK_IMPORTED_MODULE_3__["default"].inputEventUnregister(id);
        }
    };
    return default_1;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (default_1);

})();

module.exports = __webpack_exports__["default"];
/******/ })()
;