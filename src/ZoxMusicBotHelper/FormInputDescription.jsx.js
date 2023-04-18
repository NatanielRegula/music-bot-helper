function FormInputDescription(props) {
  return React.createElement(
    DisComponents.FormText,
    {
      type: DisComponents.FormTextTypes.DESCRIPTION,
      //   class: `settingsDescriptionText`,
    },
    props.value
  );
}
