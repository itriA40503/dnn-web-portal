import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  lightBlue500,
  lightBlue900,
  blueGrey50,
  redA700,
  deepOrangeA400,
  pink500,
  white,
  darkBlack,
} from 'material-ui/styles/colors';

export const muiStyle = {
  palette: {
    primary1Color: lightBlue900,
    primary2Color: lightBlue500,
    accent1Color: pink500,
    accent2Color: redA700,
    remind1Color: deepOrangeA400,
    textColor: darkBlack,
  },
};

export const muiTheme = getMuiTheme({
  tabs: {
    backgroundColor: 'white',
    selectedTextColor: muiStyle.palette.primary1Color,
    textColor: '#757575',
  },
  inkBar: {
    backgroundColor: muiStyle.palette.primary1Color,
  },
  datePicker: {
    selectColor: muiStyle.palette.primary1Color,
    selectTextColor: white,
  },
  stepper: {
    backgroundColor: 'transparent',
    iconColor: muiStyle.palette.primary1Color,
  },
  slider: {
    selectionColor: muiStyle.palette.primary1Color,
    handleFillColor: muiStyle.palette.primary1Color,
  },
});

export const StripedStyle = index => ({ background: index % 2 ? blueGrey50 : 'white' });
