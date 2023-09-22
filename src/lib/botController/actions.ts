import { DisMediaEngineController } from '../../dis/modules/modules';
import { DisMediaEngineStore, DisUserStore } from '../../dis/modules/stores';
import { UI } from '../../utils/bdApi';
import { getCurrentlyActiveBotId } from './botController';

class BotActions {
  ///-----Audio actions / Bot interactions-----///
  toggleMuteClientSide() {
    const activeBotId = getCurrentlyActiveBotId();

    if (activeBotId == null) return;

    DisMediaEngineController.toggleLocalMute(activeBotId);

    const botName: string = DisUserStore.getUser(activeBotId).username;

    if (DisMediaEngineStore.isLocalMute(activeBotId)) {
      UI.showToast(`⏸️ ${botName} PAUSED (Just for you)`, {
        forceShow: true,
      });
    } else {
      UI.showToast(`▶️ ${botName} RESUMED (Just for you)`, {
        forceShow: true,
      });
    }
  }

  private getEmojiSpeakerVolume(volume: number): string {
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

  private changeVolumeBy(difference: number) {
    const activeBotId = getCurrentlyActiveBotId();

    if (activeBotId == null) return;

    const currentVolume = DisMediaEngineStore.getLocalVolume(activeBotId);

    // clamped value max 200, min 0
    const newVolume = Math.min(Math.max(currentVolume + difference, 0), 200);

    DisMediaEngineController.setLocalVolume(activeBotId, newVolume);

    const botName: string = DisUserStore.getUser(activeBotId).username;

    UI.showToast(
      `${this.getEmojiSpeakerVolume(
        newVolume
      )} ${botName} VOLUME ${newVolume}%`,
      {
        forceShow: true,
      }
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
