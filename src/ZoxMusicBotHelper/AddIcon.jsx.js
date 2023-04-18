function AddIcon(props) {
  return React.createElement(
    'svg',
    {
      ...{
        viewBox: '0 0 24 24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      ...props,
    },

    React.createElement('path', {
      d: 'M10.2857 24V13.7143H0V10.2857H10.2857V0H13.7143V10.2857H24V13.7143H13.7143V24H10.2857Z',
    })
  );
}
