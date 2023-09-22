import { KeyCode } from '../dis/modules/uiComponents/DisKeybindRecorder';
import NativeDisUtils from '../dis/nativeModules/discordUtils';
import Logger from '../utils/logger';
import { SETTINGS_KEYS, readSettingRaw } from '../utils/settingUtils';
import { botActions } from './botController/actions';

class GlobalShortcuts {
  registeredKeyboardShortcutsRegisterIds: number[] = [];

  registerKeyboardShortcut(keybind: KeyCode[], action: () => void) {
    const keybindId = Math.floor(Math.random() * 100000);

    this.registeredKeyboardShortcutsRegisterIds.push(keybindId);

    NativeDisUtils.inputEventRegister(
      keybindId,
      keybind,
      (isDown: boolean) => {
        if (isDown) {
          action();
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

  registerGlobalKeyboardShortcuts() {
    this.unregisterAllGlobalKeyboardShortcuts();

    this.registerKeyboardShortcut(
      readSettingRaw<KeyCode[]>(SETTINGS_KEYS.keybindMuteAudioBotLocal)!,
      () => botActions.toggleMuteClientSide()
    );

    this.registerKeyboardShortcut(
      readSettingRaw<KeyCode[]>(SETTINGS_KEYS.keybindIncreaseVolume)!,
      () => botActions.increaseVolumeBy(10)
    );

    this.registerKeyboardShortcut(
      readSettingRaw<KeyCode[]>(SETTINGS_KEYS.keybindDecreaseVolume)!,
      () => botActions.decreaseVolumeBy(10)
    );
  }

  unregisterAllGlobalKeyboardShortcuts(): void {
    for (const id of this.registeredKeyboardShortcutsRegisterIds) {
      NativeDisUtils.inputEventUnregister(id);
    }
  }
}

export const globalShortcuts = new GlobalShortcuts();
