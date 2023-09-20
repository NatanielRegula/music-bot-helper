import NativeDisUtils from '../dis/nativeModules/discordUtils';
import Logger from '../utils/logger';
import { SETTINGS_KEYS, readSettingRaw } from '../utils/settingUtils';
import { botActions } from './botController/actions';

class GlobalShortcuts {
  registeredKeyboardShortcutsRegisterIds: number[] = [];

  registerGlobalKeyboardShortcuts() {
    this.unregisterAllGlobalKeyboardShortcuts();
    const toggleMuteClientSideRegisterId = Math.floor(Math.random() * 100000);

    this.registeredKeyboardShortcutsRegisterIds.push(
      toggleMuteClientSideRegisterId
    );

    NativeDisUtils.inputEventRegister(
      toggleMuteClientSideRegisterId,
      readSettingRaw(SETTINGS_KEYS.keybindMuteAudioBotLocal),
      (isDown: boolean) => {
        Logger.log(`ctrl+alt+k - isDown ${isDown}`);
        if (isDown) {
          botActions.toggleMuteClientSide();
        }
      },
      {
        blurred: true,
        focused: true,
        keydown: true,
        keyup: true,
      }
    );
  }

  unregisterAllGlobalKeyboardShortcuts(): void {
    for (const id of this.registeredKeyboardShortcutsRegisterIds) {
      NativeDisUtils.inputEventUnregister(id);
    }
  }
}

export const globalShortcuts = new GlobalShortcuts();
