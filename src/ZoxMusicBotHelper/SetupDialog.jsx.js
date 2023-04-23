function SetupDialog(props) {
  const [selectedTextChannel, setSelectedTextChannel] = React.useState(
    props.initialData.serverData?.selectedTextChannel
  );
  const [playFromLinkCommand, setPlayFromLinkCommand] = React.useState(
    props.initialData.botData?.playFromLinkCommand
  );
  const [playFromSearchCommand, setPlayFromSearchCommand] = React.useState(
    props.initialData.botData?.playFromSearchCommand
  );
  const [pauseCommand, setPauseCommand] = React.useState(
    props.initialData.botData?.pauseCommand
  );
  const [resumeCommand, setResumeCommand] = React.useState(
    props.initialData.botData?.resumeCommand
  );

  React.useEffect(() => {
    props.getUpdate({
      serverData: {
        selectedTextChannel: selectedTextChannel,
      },
      botData: {
        playFromLinkCommand: playFromLinkCommand,
        playFromSearchCommand: playFromSearchCommand,
        pauseCommand: pauseCommand,
        resumeCommand: resumeCommand,
      },
    });
  }, [
    selectedTextChannel,
    playFromLinkCommand,
    playFromSearchCommand,
    pauseCommand,
    resumeCommand,
  ]);

  return React.createElement(
    'div',
    {
      class: `setupDialogContainer`,
    },

    React.createElement(
      DisComponents.FormSection,
      {
        title: `Server specific (${props.serverName})`,
      },
      React.createElement(
        'div',
        { class: 'column' },

        React.createElement(
          'div',
          { class: 'settingGroup' },
          React.createElement(
            DisComponents.FormLabel,
            {
              disabled: false,
            },
            'Select bot text channel'
          ),
          React.createElement(DisComponents.SearchableSelect, {
            value: selectedTextChannel,
            options: props.textChannelsInGuild,

            clearable: true,
            placeholder: 'eg. bot-commands',
            onChange: (/**@type {string?} */ newSelectedOptionValue) => {
              setSelectedTextChannel(newSelectedOptionValue);
            },
          }),
          FormInputDescription({
            value:
              'Select the text channel used by the members of your community to send commands to the bot',
          })
        )
      )
    ),

    React.createElement(
      DisComponents.FormSection,
      {
        title: `Bot specific (${props.botUsername})`,
      },
      React.createElement(
        'div',
        { class: 'column' },
        SettingTextInputWrapper({
          label: 'Command used to play music form a link',
          placeholder: 'eg. -p [url]',
          description:
            'Enter the command followed by [url] where [url] will be replaced by a link to the song',
          value: playFromLinkCommand,
          onChange: (/**@type {string?} */ newValue) =>
            setPlayFromLinkCommand(newValue),
        }),
        SettingTextInputWrapper({
          label: 'Command used to play music form a search',
          placeholder: 'eg. -p [search]',
          description:
            'Enter the command followed by [search] where [search] will be replaced by the search phrase',
          value: playFromSearchCommand,
          onChange: (/**@type {string?} */ newValue) =>
            setPlayFromSearchCommand(newValue),
        }),
        SettingTextInputWrapper({
          label: 'Command used to pause the music',
          placeholder: 'eg. -pause',
          description: 'Enter the command used to pause the music',
          value: pauseCommand,
          onChange: (/**@type {string?} */ newValue) =>
            setPauseCommand(newValue),
        }),
        SettingTextInputWrapper({
          label: 'Command used to resume the music after it was paused',
          placeholder: 'eg. -play',
          description: 'Enter the command used to resume the music',
          value: resumeCommand,
          onChange: (/**@type {string?} */ newValue) =>
            setResumeCommand(newValue),
        })
      )
    )
  );
}
