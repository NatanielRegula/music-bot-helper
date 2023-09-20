/**
 * @name ZoxMusicBotHelper
 * @description zoxMusicBotHelper allows you to control a music bot that's in your vc.
 * @author NR
 * @version 0.0.7
 * @donate paypal.me/NatanielRegula
 * @source https://github.com/NatanielRegula/music-bot-helper/
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Data: () => (/* binding */ Data),
/* harmony export */   Patcher: () => (/* binding */ Patcher),
/* harmony export */   React: () => (/* binding */ React),
/* harmony export */   UI: () => (/* binding */ UI),
/* harmony export */   Webpack: () => (/* binding */ Webpack),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useCallback: () => (/* binding */ useCallback),
/* harmony export */   useContext: () => (/* binding */ useContext),
/* harmony export */   useDebugValue: () => (/* binding */ useDebugValue),
/* harmony export */   useDeferredValue: () => (/* binding */ useDeferredValue),
/* harmony export */   useEffect: () => (/* binding */ useEffect),
/* harmony export */   useId: () => (/* binding */ useId),
/* harmony export */   useImperativeHandle: () => (/* binding */ useImperativeHandle),
/* harmony export */   useInsertionEffect: () => (/* binding */ useInsertionEffect),
/* harmony export */   useLayoutEffect: () => (/* binding */ useLayoutEffect),
/* harmony export */   useMemo: () => (/* binding */ useMemo),
/* harmony export */   useReducer: () => (/* binding */ useReducer),
/* harmony export */   useRef: () => (/* binding */ useRef),
/* harmony export */   useState: () => (/* binding */ useState),
/* harmony export */   useSyncExternalStore: () => (/* binding */ useSyncExternalStore),
/* harmony export */   useTransition: () => (/* binding */ useTransition)
/* harmony export */ });
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

var BdApi = new window.BdApi(_config_json__WEBPACK_IMPORTED_MODULE_0__.name);
var UI = BdApi.UI, Patcher = BdApi.Patcher, Webpack = BdApi.Webpack, Data = BdApi.Data;
var React = BdApi.React;
var useState = React.useState, useEffect = React.useEffect, useMemo = React.useMemo, useCallback = React.useCallback, useContext = React.useContext, useDebugValue = React.useDebugValue, useDeferredValue = React.useDeferredValue, useId = React.useId, useImperativeHandle = React.useImperativeHandle, useInsertionEffect = React.useInsertionEffect, useLayoutEffect = React.useLayoutEffect, useReducer = React.useReducer, useRef = React.useRef, useSyncExternalStore = React.useSyncExternalStore, useTransition = React.useTransition;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BdApi);


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = JSON.parse('{"name":"ZoxMusicBotHelper","description":"zoxMusicBotHelper allows you to control a music bot that\'s in your vc.","author":"NR","version":"0.0.7","donate":"paypal.me/NatanielRegula","source":"https://github.com/NatanielRegula/music-bot-helper/"}');

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SettingsPopup)
/* harmony export */ });
/* harmony import */ var _dis_modules_uiComponents_DisHeading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _dis_modules_uiComponents_DisKeybindRecorder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _dis_modules_uiComponents_DisSettingToggle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _hooks_useSetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _lib_globalKeyboardShortcuts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);
/* harmony import */ var _utils_settingUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8);
/* harmony import */ var _components_EnablePluginPrompt__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(17);









function SettingsPopup(props) {
    var _a = (0,_hooks_useSetting__WEBPACK_IMPORTED_MODULE_3__["default"])(_utils_settingUtils__WEBPACK_IMPORTED_MODULE_7__.SETTINGS_KEYS.keybindMuteAudioBotLocal, {
        onChange: function () {
            _lib_globalKeyboardShortcuts__WEBPACK_IMPORTED_MODULE_4__.globalShortcuts.registerGlobalKeyboardShortcuts();
        },
    }), keyCodesValue = _a[0], setKeyCodesValue = _a[1];
    var _b = (0,_utils_bdApi__WEBPACK_IMPORTED_MODULE_5__.useState)(false), value = _b[0], setValue = _b[1];
    return (_utils_bdApi__WEBPACK_IMPORTED_MODULE_5__.React.createElement("div", { className: "colorStandard-1Xxp1s size12-12FL_s" },
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_5__.React.createElement(_components_EnablePluginPrompt__WEBPACK_IMPORTED_MODULE_8__["default"], null),
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_5__.React.createElement(_dis_modules_uiComponents_DisSettingToggle__WEBPACK_IMPORTED_MODULE_2__.DisSettingToggle, { note: 'trying to write a note is hard', onChange: function (newValue) {
                setValue(newValue);
            }, value: value }, "Im a label"),
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_5__.React.createElement(_dis_modules_uiComponents_DisHeading__WEBPACK_IMPORTED_MODULE_0__.DisHeading, null, "Keybinds"),
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_5__.React.createElement(_dis_modules_uiComponents_DisHeading__WEBPACK_IMPORTED_MODULE_0__.DisHeading, { tag: "label" }, "Mute the audio bot"),
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_5__.React.createElement(_dis_modules_uiComponents_DisKeybindRecorder__WEBPACK_IMPORTED_MODULE_1__.DisKeybindRecorder, { defaultValue: keyCodesValue, onChange: function (newValues) {
                _utils_logger__WEBPACK_IMPORTED_MODULE_6__["default"].info(newValues);
                setKeyCodesValue(newValues);
            } })));
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DisHeading: () => (/* binding */ DisHeading)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

var DisHeading = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(function (m) {
    var _a;
    var asString = (_a = m === null || m === void 0 ? void 0 : m.toString) === null || _a === void 0 ? void 0 : _a.call(m);
    return ((asString === null || asString === void 0 ? void 0 : asString.includes('LEGEND')) &&
        (asString === null || asString === void 0 ? void 0 : asString.includes('errorId')) &&
        (asString === null || asString === void 0 ? void 0 : asString.includes('h5')) &&
        (asString === null || asString === void 0 ? void 0 : asString.includes('LABEL')));
}, { searchExports: true });


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DisKeybindRecorder: () => (/* binding */ DisKeybindRecorder)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
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

/**
 * This module is not available before the user opens the settings page.
 *  This is not ideal for performance, but also means that this is only usable inside of settings.
 */
var DisKeybindRecorder = function () {
    return (_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", null, "Module not loaded, you have to navigate here through settings ;/"));
};
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.waitForModule(function (m) {
                        var _a;
                        var asString = (_a = m === null || m === void 0 ? void 0 : m.toString) === null || _a === void 0 ? void 0 : _a.call(m);
                        return ((asString === null || asString === void 0 ? void 0 : asString.includes('RECORDING')) &&
                            (asString === null || asString === void 0 ? void 0 : asString.includes('recordStart')) &&
                            (asString === null || asString === void 0 ? void 0 : asString.includes('handleComboKeys')));
                    }, { searchExports: true })];
                case 1:
                    module = _a.sent();
                    DisKeybindRecorder = module;
                    return [2 /*return*/];
            }
        });
    });
})();


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DisSettingToggle: () => (/* binding */ DisSettingToggle)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

var DisSettingToggle = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(function (m) {
    var _a;
    var asString = (_a = m === null || m === void 0 ? void 0 : m.toString) === null || _a === void 0 ? void 0 : _a.call(m);
    return ((asString === null || asString === void 0 ? void 0 : asString.includes('note')) &&
        (asString === null || asString === void 0 ? void 0 : asString.includes('onChange')) &&
        (asString === null || asString === void 0 ? void 0 : asString.includes('value')) &&
        !(asString === null || asString === void 0 ? void 0 : asString.includes('hideDeviceSelector')));
}, { searchExports: true });


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useSetting)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_settingUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);


function useSetting(key, _a) {
    var defaultValue = _a.defaultValue, onChange = _a.onChange;
    if (key.length === 0)
        throw new Error('Setting key cannot be empty!');
    var state = (0,_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.useState)((0,_utils_settingUtils__WEBPACK_IMPORTED_MODULE_1__.readSetting)(key, defaultValue));
    var settingCurrentValue = state[0];
    var isFirstRender = (0,_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
    (0,_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        (0,_utils_settingUtils__WEBPACK_IMPORTED_MODULE_1__.saveSetting)(key, settingCurrentValue);
        onChange === null || onChange === void 0 ? void 0 : onChange();
    }, [settingCurrentValue]);
    return state;
}


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SETTINGS_KEYS: () => (/* binding */ SETTINGS_KEYS),
/* harmony export */   readSetting: () => (/* binding */ readSetting),
/* harmony export */   readSettingRaw: () => (/* binding */ readSettingRaw),
/* harmony export */   saveSetting: () => (/* binding */ saveSetting),
/* harmony export */   setDefaultValuesSettings: () => (/* binding */ setDefaultValuesSettings)
/* harmony export */ });
/* harmony import */ var _bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _keycodeMappings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);


var SETTINGS_KEYS = {
    keybindMuteAudioBotLocal: 'keybindMuteAudioBotLocal',
};
function readSettingRaw(key) {
    var keyWithPrefix = "settings_".concat(key);
    var settingValueFromData = _bdApi__WEBPACK_IMPORTED_MODULE_0__.Data.load(keyWithPrefix);
    var settingParsed = settingValueFromData != undefined
        ? JSON.parse(settingValueFromData)
        : undefined;
    return settingParsed;
}
function readSetting(key, defaultValue) {
    return readSettingRaw(key) || defaultValue;
}
function saveSetting(key, value) {
    var keyWithPrefix = "settings_".concat(key);
    _bdApi__WEBPACK_IMPORTED_MODULE_0__.Data.save(keyWithPrefix, JSON.stringify(value));
}
function setDefaultValuesSettings(onlyIfNull) {
    if (onlyIfNull === void 0) { onlyIfNull = true; }
    Object.entries(SETTINGS_KEYS).forEach(function (_a) {
        var _ = _a[0], settingKey = _a[1];
        var currentValue = readSettingRaw(settingKey);
        if (currentValue === undefined || onlyIfNull === false) {
            switch (settingKey) {
                case SETTINGS_KEYS.keybindMuteAudioBotLocal:
                    var keycodeMappings = (0,_keycodeMappings__WEBPACK_IMPORTED_MODULE_1__["default"])();
                    saveSetting(settingKey, [
                        [0, keycodeMappings.ctrl, '0:0'],
                        [0, keycodeMappings.alt, '0:0'],
                        [0, keycodeMappings.k, '0:0'],
                    ]);
                    break;
                default:
                    break;
            }
        }
    });
}


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

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
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   globalShortcuts: () => (/* binding */ globalShortcuts)
/* harmony export */ });
/* harmony import */ var _dis_nativeModules_discordUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _utils_settingUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _botController_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);




var GlobalShortcuts = /** @class */ (function () {
    function GlobalShortcuts() {
        this.registeredKeyboardShortcutsRegisterIds = [];
    }
    GlobalShortcuts.prototype.registerGlobalKeyboardShortcuts = function () {
        this.unregisterAllGlobalKeyboardShortcuts();
        var toggleMuteClientSideRegisterId = Math.floor(Math.random() * 100000);
        this.registeredKeyboardShortcutsRegisterIds.push(toggleMuteClientSideRegisterId);
        _dis_nativeModules_discordUtils__WEBPACK_IMPORTED_MODULE_0__["default"].inputEventRegister(toggleMuteClientSideRegisterId, (0,_utils_settingUtils__WEBPACK_IMPORTED_MODULE_2__.readSettingRaw)(_utils_settingUtils__WEBPACK_IMPORTED_MODULE_2__.SETTINGS_KEYS.keybindMuteAudioBotLocal), function (isDown) {
            _utils_logger__WEBPACK_IMPORTED_MODULE_1__["default"].log("ctrl+alt+k - isDown ".concat(isDown));
            if (isDown) {
                _botController_actions__WEBPACK_IMPORTED_MODULE_3__.botActions.toggleMuteClientSide();
            }
        }, {
            blurred: true,
            focused: true,
            keydown: true,
            keyup: true,
        });
    };
    GlobalShortcuts.prototype.unregisterAllGlobalKeyboardShortcuts = function () {
        for (var _i = 0, _a = this.registeredKeyboardShortcutsRegisterIds; _i < _a.length; _i++) {
            var id = _a[_i];
            _dis_nativeModules_discordUtils__WEBPACK_IMPORTED_MODULE_0__["default"].inputEventUnregister(id);
        }
    };
    return GlobalShortcuts;
}());
var globalShortcuts = new GlobalShortcuts();


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var NativeDisUtils = window.DiscordNative.nativeModules.requireModule('discord_utils');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NativeDisUtils);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


var Logger = _bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.Filters.byProps('logger')).logger;
Logger.name = _config_json__WEBPACK_IMPORTED_MODULE_1__.name;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Logger);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   botActions: () => (/* binding */ botActions)
/* harmony export */ });
/* harmony import */ var _dis_modules_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _dis_modules_stores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _botController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);




var BotActions = /** @class */ (function () {
    function BotActions() {
        this.toggleMuteClientSide = this.toggleMuteClientSide.bind(this);
    }
    ///-----Audio actions / Bot interactions-----///
    BotActions.prototype.toggleMuteClientSide = function () {
        var activeBotId = (0,_botController__WEBPACK_IMPORTED_MODULE_3__.getCurrentlyActiveBotId)();
        if (activeBotId == null)
            return;
        _dis_modules_modules__WEBPACK_IMPORTED_MODULE_0__.DisAudioCtl.toggleLocalMute(activeBotId);
        var botName = _dis_modules_stores__WEBPACK_IMPORTED_MODULE_1__.DisUserStore.getUser(activeBotId).username;
        if (_dis_modules_stores__WEBPACK_IMPORTED_MODULE_1__.DisMediaInfo.isLocalMute(activeBotId)) {
            _utils_bdApi__WEBPACK_IMPORTED_MODULE_2__.UI.showToast("\u23F8\uFE0F ".concat(botName, " PAUSED (Just for you)"), {
                forceShow: true,
            });
        }
        else {
            _utils_bdApi__WEBPACK_IMPORTED_MODULE_2__.UI.showToast("\u25B6\uFE0F ".concat(botName, " RESUMED (Just for you)"), {
                forceShow: true,
            });
        }
    };
    return BotActions;
}());
var botActions = new BotActions();


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DisAudioCtl: () => (/* binding */ DisAudioCtl)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

//audio info
var DisAudioCtl = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.Filters.byProps('toggleLocalMute', 'setLocalVolume'));


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DisMediaInfo: () => (/* binding */ DisMediaInfo),
/* harmony export */   DisSelectedChannelStore: () => (/* binding */ DisSelectedChannelStore),
/* harmony export */   DisUserStore: () => (/* binding */ DisUserStore),
/* harmony export */   DisVoiceStateStore: () => (/* binding */ DisVoiceStateStore)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

var DisVoiceStateStore = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.Filters.byProps('getVoiceStateForUser', 'getVoiceStatesForChannel'));
var DisSelectedChannelStore = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.Filters.byProps('getLastSelectedChannelId'));
//guild info
var DisUserStore = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.Filters.byProps('getCurrentUser', 'getUser'));
var DisMediaInfo = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.Filters.byProps('getOutputVolume'));


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentVoiceChannelUsersIds: () => (/* binding */ getCurrentVoiceChannelUsersIds),
/* harmony export */   getCurrentlyActiveBotId: () => (/* binding */ getCurrentlyActiveBotId),
/* harmony export */   getMusicBotsInCurrentVoiceChat: () => (/* binding */ getMusicBotsInCurrentVoiceChat)
/* harmony export */ });
/* harmony import */ var _dis_modules_stores__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);

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
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EnablePluginPrompt)
/* harmony export */ });
/* harmony import */ var _dis_modules_uiComponents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);



function EnablePluginPrompt(props) {
    var _a = (0,_utils_bdApi__WEBPACK_IMPORTED_MODULE_1__.useState)(_utils_bdApi__WEBPACK_IMPORTED_MODULE_1__["default"].Plugins.isEnabled(_config_json__WEBPACK_IMPORTED_MODULE_2__.name)), isChecked = _a[0], setIsChecked = _a[1];
    return (_utils_bdApi__WEBPACK_IMPORTED_MODULE_1__.React.createElement("div", { style: {
            border: '1px solid var(--primary-500)',
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
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfirmModal: () => (/* binding */ ConfirmModal),
/* harmony export */   ConfirmationModal: () => (/* binding */ ConfirmationModal),
/* harmony export */   Dialog: () => (/* binding */ Dialog),
/* harmony export */   DisUiComponents: () => (/* binding */ DisUiComponents),
/* harmony export */   Modal: () => (/* binding */ Modal),
/* harmony export */   Modals: () => (/* binding */ Modals),
/* harmony export */   Switch: () => (/* binding */ Switch),
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

var DisUiComponents = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.Filters.byProps('AnimatedAvatar'));
// type openModalType = (
// child: (props: {
//   onClose?: () => void;
//   transitionState?: number | null;
// }) => React.JSX.Element
// ) => void;
var openModal = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(function (m) {
    return typeof m === 'function' &&
        (m === null || m === void 0 ? void 0 : m.toString().includes('onCloseCallback')) &&
        (m === null || m === void 0 ? void 0 : m.toString().includes('Layer'));
}, { searchExports: true });
var closeModal = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(function (m) {
    return typeof m === 'function' && (m === null || m === void 0 ? void 0 : m.toString().includes('onCloseCallback()'));
}, { searchExports: true });
var ConfirmationModal = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(function (m) { var _a, _b; return (_b = (_a = m === null || m === void 0 ? void 0 : m.toString) === null || _a === void 0 ? void 0 : _a.call(m)) === null || _b === void 0 ? void 0 : _b.includes('.confirmButtonColor'); }, { searchExports: true });
var Modal = _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.getModule(_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Webpack.Filters.byProps('handleCancel', 'handleSubmit'));
var Switch = DisUiComponents.Switch, Dialog = DisUiComponents.Dialog, ConfirmModal = DisUiComponents.ConfirmModal, Modals = DisUiComponents.Modals;
//   const ModalsApi = BdApi.findModuleByProps("useModalsStore", "closeModal");
// function closeLastModal() {
//   const lastModal = ModalsApi.useModalsStore.getState().default[0];
//   if (!lastModal) return;
//   ModalsApi.closeModal(lastModal.key);
// }


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showSettings)
/* harmony export */ });
/* harmony import */ var _bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _dis_modules_uiComponents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);


function showModal() {
    //   openModal(({onClose:() => {}}) => {
    //   openModal(({ onClose }) => {
    //   const {
    //     danger = false,
    //     confirmText = 'Okay',
    //     cancelText = 'Cancel',
    //     onConfirm = () => {},
    //     onCancel = () => {},
    //   } = options;
    (0,_dis_modules_uiComponents__WEBPACK_IMPORTED_MODULE_1__.openModal)(TestChild);
    // openModal((props: any) => {
    //   // return React.createElement(ConfirmationModal, {
    //   //   danger: false,
    //   //   confirmText: 'Okay',
    //   //   confirmButtonColor: 'red',
    //   //   cancelText: 'Cancel',
    //   //   onConfirm: () => {},
    //   //   onCancel: () => {},
    //   // });
    //   return <TestChild />;
    // });
    //   openModal(
    //       React.createElement(ConfirmationModal, {
    //   danger: false,
    //   confirmText: 'Okay',
    //   cancelText: 'Cancel',
    //   onConfirm: () => {},
    //   onCancel: () => {},
    //       })
    //     );
    //   openModal(({ onClose:() => {}, transitionState:1 }) => {
    //   Logger.log(onClose);
    //     return (
    //       <div
    //         style={{
    //           padding: '1rem',
    //           background: 'var(--primary-700)',
    //           borderRadius: '5px',
    //           margin: '0 0 1rem 0',
    //           display: 'flex',
    //           flexDirection: 'column',
    //           gap: '1rem',
    //           height: '200px',
    //           width: '200px',
    //         }}
    //       >
    //         <h1>sss</h1>
    //       </div>
    //     );
    //   });
}
function showSettings() {
    showModal();
    //   openModal();
    //   BdApi.alert('Setting', );
    //   React.createElement(Modal);
    //   return (
    //     <Modal>
    //       <h1>ss</h1>
    //     </Modal>
    //   );
}
function TestChild(props) {
    //   props.onClose.apply(() => {
    //     Logger.log('im closed');
    //   });
    //   Logger.log(props.close.call(1));
    return (_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { style: {
            padding: '1rem',
            background: 'var(--primary-700)',
            borderRadius: '5px',
            margin: '0 0 1rem 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            // height: '200px',
            // width: '200px',
        } },
        _bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("h1", null, "sss")));
}


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkIfVersionUpdated),
/* harmony export */   showVersionUpdatedPopup: () => (/* binding */ showVersionUpdatedPopup)
/* harmony export */ });
/* harmony import */ var _bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _ui_changeLogPopup_ChangeLogPopup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var _ui_changeLogPopup_ChangeLogTopBanner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(25);





function checkIfVersionUpdated() {
    if (_config_json__WEBPACK_IMPORTED_MODULE_2__.version !== _bdApi__WEBPACK_IMPORTED_MODULE_0__.Data.load("lastLoadedVersion")) {
        showVersionUpdatedPopup();
    }
}
function showVersionUpdatedPopup() {
    _logger__WEBPACK_IMPORTED_MODULE_1__["default"].info('New version installed!');
    _bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].alert(_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_ui_changeLogPopup_ChangeLogTopBanner__WEBPACK_IMPORTED_MODULE_4__["default"], null), _bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_ui_changeLogPopup_ChangeLogPopup__WEBPACK_IMPORTED_MODULE_3__["default"], { newVersion: _config_json__WEBPACK_IMPORTED_MODULE_2__.version }));
    _bdApi__WEBPACK_IMPORTED_MODULE_0__.Data.save("lastLoadedVersion", _config_json__WEBPACK_IMPORTED_MODULE_2__.version);
}


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _changelog_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _components_ChangesUl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var _components_EnablePluginPrompt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);




function ChangeLogPopup(props) {
    return (_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "colorStandard-1Xxp1s size12-12FL_s" },
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_components_EnablePluginPrompt__WEBPACK_IMPORTED_MODULE_3__["default"], null),
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "content-FDHp32" }, Object.entries(_changelog_json__WEBPACK_IMPORTED_MODULE_1__).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { key: key, style: {
                    padding: '1rem',
                    background: 'var(--primary-700)',
                    borderRadius: '5px',
                    margin: '0 0 1rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                } },
                _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    } },
                    _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", { className: "defaultColor-1EVLSt heading-lg-semibold-14ouVv" }, value.title),
                    value.title === props.newVersion && (_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", { className: "defaultColor-1EVLSt" }, "New"))),
                _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_components_ChangesUl__WEBPACK_IMPORTED_MODULE_2__.ChangesUlFeatures, { changes: value.feature }),
                _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_components_ChangesUl__WEBPACK_IMPORTED_MODULE_2__.ChangesUlBugFixes, { changes: value.fixed })));
        }))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChangeLogPopup);


/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = JSON.parse('{"0.0.7":{"title":"0.0.7","fixed":["Fixed meta data not being included properly."],"feature":["Added source and donate links to meta"]},"0.0.6":{"title":"0.0.6","fixed":[],"feature":["Adds changelog back."]},"0.0.5":{"title":"0.0.5","fixed":[],"feature":["New version with new codebase."]},"0.0.4":{"title":"0.0.4","fixed":[],"feature":["feature toast messages."]},"0.0.3":{"title":"0.0.3","fixed":["Fixed bugs"],"feature":[]},"0.0.2":{"title":"0.0.2","fixed":[],"feature":["Added toast message when bot muted or unmuted with the keybind"]}}');

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChangesUlBugFixes: () => (/* binding */ ChangesUlBugFixes),
/* harmony export */   ChangesUlFeatures: () => (/* binding */ ChangesUlFeatures)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

function ChangesUlFeatures(props) {
    return (_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.Fragment, null, props.changes.length != 0 && (_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", null,
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", { style: {
                color: 'var(--text-positive)',
                fontWeight: 600,
                textTransform: 'uppercase',
            } }, "[Features]"),
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("ul", { style: { margin: '.3rem 0px 0 1.5rem' } }, props.changes.map(function (change) {
            return _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("li", { key: change }, change);
        }))))));
}
function ChangesUlBugFixes(props) {
    return (_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.Fragment, null, props.changes.length != 0 && (_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", null,
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", { style: {
                color: 'var(--text-danger)',
                fontWeight: 600,
                textTransform: 'uppercase',
            } }, "[Bug fixes]"),
        _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("ul", { style: { margin: '.3rem 0px 0 1.5rem' } }, props.changes.map(function (change) {
            return _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement("li", { key: change }, change);
        }))))));
}


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EnablePluginPrompt)
/* harmony export */ });
/* harmony import */ var _dis_modules_uiComponents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);



function EnablePluginPrompt(props) {
    var _a = (0,_utils_bdApi__WEBPACK_IMPORTED_MODULE_1__.useState)(_utils_bdApi__WEBPACK_IMPORTED_MODULE_1__["default"].Plugins.isEnabled(_config_json__WEBPACK_IMPORTED_MODULE_2__.name)), isChecked = _a[0], setIsChecked = _a[1];
    return (_utils_bdApi__WEBPACK_IMPORTED_MODULE_1__.React.createElement("div", { style: {
            border: '1px solid var(--primary-500)',
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
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChangeLogTopBanner)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


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


/***/ })
/******/ 	]);
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
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _ui_settingsPopup_SettingsPopup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _utils_showSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _utils_versionChecker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2);
/* harmony import */ var _utils_settingUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _lib_globalKeyboardShortcuts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(10);
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








(0,_utils_versionChecker__WEBPACK_IMPORTED_MODULE_4__["default"])();
if (true) {
    _utils_logger__WEBPACK_IMPORTED_MODULE_2__["default"].warn("Development Mode! | Enabled status: ".concat(_utils_bdApi__WEBPACK_IMPORTED_MODULE_0__["default"].Plugins.isEnabled(_config_json__WEBPACK_IMPORTED_MODULE_5__.name)));
    window.zoxMusicBotHelper = {};
    window.zoxMusicBotHelper.showSettings = _utils_showSettings__WEBPACK_IMPORTED_MODULE_3__["default"];
    window.zoxMusicBotHelper.showVersionUpdatedPopup = _utils_versionChecker__WEBPACK_IMPORTED_MODULE_4__.showVersionUpdatedPopup;
}
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    default_1.prototype.start = function () {
        _utils_logger__WEBPACK_IMPORTED_MODULE_2__["default"].info('Plugin enabled!');
        (0,_utils_settingUtils__WEBPACK_IMPORTED_MODULE_6__.setDefaultValuesSettings)();
        document.addEventListener('keydown', this.keyBindHandler);
        _lib_globalKeyboardShortcuts__WEBPACK_IMPORTED_MODULE_7__.globalShortcuts.registerGlobalKeyboardShortcuts();
    };
    default_1.prototype.stop = function () {
        _utils_logger__WEBPACK_IMPORTED_MODULE_2__["default"].info('Plugin disabled!');
        document.removeEventListener('keydown', this.keyBindHandler);
        _lib_globalKeyboardShortcuts__WEBPACK_IMPORTED_MODULE_7__.globalShortcuts.unregisterAllGlobalKeyboardShortcuts();
    };
    default_1.prototype.getSettingsPanel = function () {
        return _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_ui_settingsPopup_SettingsPopup__WEBPACK_IMPORTED_MODULE_1__["default"], null);
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
                    //   break;l
                    case 'KeyO':
                        _utils_logger__WEBPACK_IMPORTED_MODULE_2__["default"].info('ctrl alt o');
                        _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.UI.alert('Settings', _utils_bdApi__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_ui_settingsPopup_SettingsPopup__WEBPACK_IMPORTED_MODULE_1__["default"], null));
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
    return default_1;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (default_1);

})();

module.exports = __webpack_exports__["default"];
/******/ })()
;