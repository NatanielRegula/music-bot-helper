import {
  DisSelectedChannelStore,
  DisUserStore,
  DisVoiceStateStore,
} from '../../dis/modules/stores';

export function getCurrentVoiceChannelUsersIds(): Array<string> {
  const voiceStatesForCurrentVoiceChannelObject =
    DisVoiceStateStore.getVoiceStatesForChannel(
      DisSelectedChannelStore.getVoiceChannelId()
    );

  const currentVoiceChannelUsersIds = Object.keys(
    voiceStatesForCurrentVoiceChannelObject
  ).map((key) => voiceStatesForCurrentVoiceChannelObject[key].userId);

  return currentVoiceChannelUsersIds;
}

export function getCurrentlyActiveBotId(): string | null {
  //this will in the future allow to switch between multiple bots in vc
  //for now it just gives the first form the list
  const selectedBots = getMusicBotsInCurrentVoiceChat();

  if (selectedBots.length == 0) return null;

  return selectedBots[0];
}

export function getMusicBotsInCurrentVoiceChat(): Array<string> {
  const currentVoiceChannelUsersIds = getCurrentVoiceChannelUsersIds();

  const detectedBotsIds: Array<string> = currentVoiceChannelUsersIds.filter(
    (userId) => DisUserStore.getUser(userId).bot
  );

  return detectedBotsIds;
}
