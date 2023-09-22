import { DisAudioCtl } from '../../dis/modules/modules';
import { DisMediaEngineStore, DisUserStore } from '../../dis/modules/stores';
import { UI } from '../../utils/bdApi';
import { getCurrentlyActiveBotId } from './botController';

class BotActions {
  ///-----Audio actions / Bot interactions-----///
  toggleMuteClientSide() {
    const activeBotId = getCurrentlyActiveBotId();

    if (activeBotId == null) return;

    DisAudioCtl.toggleLocalMute(activeBotId);

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
}

export const botActions = new BotActions();
