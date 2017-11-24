import React from 'react';
// i18n
import { translate } from 'react-i18next';
// color
import { muiStyle, muiTheme } from '../../myTheme';

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Slider from 'material-ui/Slider';
import Divider from 'material-ui/Divider';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class IdeRes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      res: 5,
    };
  }
  handleOpen = () => this.setState({ open: true });
  handleClose = () => {
    this.setState({ open: false });
  };
  handleSubmit = () => {
    this.setState({ open: false });
  };
  handleSlider = (event, value) => {
    this.setState({ res: value });
  }
  renderSetting() {
    const { t } = this.props;
    const actions = [
      <FlatButton
        label={t('common:cancel')}
        style={{ color: muiStyle.palette.primary1Color }}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={t('common:submit')}
        secondary={true}
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
      <div>
        <RaisedButton
          backgroundColor={muiStyle.palette.primary1Color}
          label={'setting resource'}
          labelColor={'#fff'}
          onTouchTap={() => this.handleOpen()}
        />
        <Dialog
          title={
            <div>
              <b>
                {'Setting IDE resource'}
              </b>
            </div>
          }
          modal={true}
          actions={actions}
          open={this.state.open}
        >
          <div>
            {'setting IDE resource'}
            <h3>{this.state.res}</h3>
            <Divider />
            <Slider
              min={0}
              max={95}
              step={1}
              value={this.state.res}
              onChange={this.handleSlider}
            />
            <Divider />
          </div>
        </Dialog>
      </div>
    );
  }
  render() {
    return (
      <Card>
        <CardActions style={{
          zIndex: 2,
          display: 'inline-block',
          float: 'right',
          right: '10px',
          padding: '14px',
        }}
        >
          <MuiThemeProvider muiTheme={muiTheme}>
            {this.renderSetting()}
          </MuiThemeProvider>
        </CardActions>
        <CardTitle title={'IDE used resouce'} />
        <CardText>
          <h3>{'Used 5'}</h3>
        </CardText>
      </Card>
    );
  }
}

export default translate('')(IdeRes);
