function SettingTextInputWrapper(props) {
  return React.createElement(
    'div',
    {
      class: `settingGroup`,
    },
    React.createElement(
      DisComponents.FormLabel,
      {
        disabled: false,
      },
      props.label
    ),
    React.createElement(DisComponents.TextInput, {
      placeholder: props.placeholder,
      clearable: true,
      value: props.value,
      onChange: props.onChange,
    }),
    FormInputDescription({
      value: props.description,
    })
  );
}
