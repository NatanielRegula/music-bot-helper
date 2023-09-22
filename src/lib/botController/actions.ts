import { DisMediaEngineController } from '../../dis/modules/modules';
import { DisMediaEngineStore, DisUserStore } from '../../dis/modules/stores';
import { UI } from '../../utils/bdApi';
import { getCurrentlyActiveBotId } from './botController';

import config from '../../../config.json';
import { SETTINGS_KEYS, readSettingRaw } from '../../utils/settingUtils';

class BotActions {
  private getEmojiSpeakerVolume(volume: number): string {
    if (volume == 0) {
      return '🔇';
    }

    if (volume <= 20) {
      return '🔈';
    }

    if (volume <= 100) {
      return '🔉';
    }

    if (volume <= 200) {
      return '🔊';
    }
  }

  private showNotification(
    toastIcon: string,
    notificationText: string,
    tag: string,
    botName: string,
    botId: string,
    avatar: string
  ): void {
    UI.showToast(`${toastIcon} ${botName} ${notificationText}`, {
      forceShow: true,
    });

    if (
      readSettingRaw<boolean>(
        SETTINGS_KEYS.shouldShowNativeDesktopNotifications
      )!
    ) {
      new Notification(`${botName} | ZoxMusicBotHelper`, {
        tag: tag,
        silent: true,
        icon: `https://cdn.discordapp.com/avatars/${botId}/${avatar}.webp?size=24`,
        body: `${toastIcon} ${notificationText}`,
      });
    }
  }

  ///-----Audio actions / Bot interactions-----///
  toggleMuteClientSide() {
    const activeBotId = getCurrentlyActiveBotId();

    if (activeBotId == null) return;

    DisMediaEngineController.toggleLocalMute(activeBotId);

    const botUserStore = DisUserStore.getUser(activeBotId);
    const botName: string = botUserStore.username;
    const botAvatar: string = botUserStore.avatar;

    if (DisMediaEngineStore.isLocalMute(activeBotId)) {
      this.showNotification(
        `⏸️`,
        `PAUSED (Just for you)`,
        `bd-${config.name}-audioChange`,
        botName,
        activeBotId,
        botAvatar
      );
    } else {
      this.showNotification(
        `▶️`,
        `RESUMED (Just for you)`,
        `bd-${config.name}-audioChange`,
        botName,
        activeBotId,
        botAvatar
      );
    }
  }

  private changeVolumeBy(difference: number) {
    const activeBotId = getCurrentlyActiveBotId();

    if (activeBotId == null) return;

    const currentVolume = DisMediaEngineStore.getLocalVolume(activeBotId);

    // clamped value max 200, min 0
    const newVolume = Math.min(Math.max(currentVolume + difference, 0), 200);

    DisMediaEngineController.setLocalVolume(activeBotId, newVolume);

    const botUserStore = DisUserStore.getUser(activeBotId);
    const botName: string = botUserStore.username;
    const botAvatar: string = botUserStore.avatar;

    // const notificationText = `${this.getEmojiSpeakerVolume(
    //   newVolume
    // )} ${botName} VOLUME ${Math.floor(newVolume)}%`;

    const notificationText = `VOLUME ${Math.floor(newVolume)}%`;

    this.showNotification(
      this.getEmojiSpeakerVolume(newVolume),
      notificationText,
      `bd-${config.name}-audioChange`,
      botName,
      activeBotId,
      botAvatar
    );
  }

  increaseVolumeBy(difference: number) {
    this.changeVolumeBy(difference);
  }

  decreaseVolumeBy(difference: number) {
    this.changeVolumeBy(difference * -1);
  }
}

export const botActions = new BotActions();
