import React from 'react';
// GA
import ReactGA from 'react-ga';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';
// i18n
import { translate } from 'react-i18next';
// API call
import axios from 'axios';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ReactTooltip from 'react-tooltip';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

// ICON
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionLabel from 'material-ui/svg-icons/action/label';

// theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiStyle, muiTheme } from '../../myTheme';

import { ApiCreateResource } from '../../resource';

class CreateTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comfirm: false,
      loading: false,
      open: false,
      addValue: null,
      info: null,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
    // GA
    ReactGA.event({
      category: 'CreateMachine',
      action: 'open',
      label: this.props.data.label,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      addValue: null,
      info: null,
    });
    // GA
    ReactGA.event({
      category: 'CreateMachine',
      action: 'close',
      label: this.props.data.label,
    });
  };

  handleSubmit = () => {

  }

  handleChange = (event, value) => this.setState({ [event.target.name]: value });

  render() {
    const { t } = this.props;
    const actions = [
      <FlatButton
        label={t('common:cancel')}
        style={
          this.state.comfirm ? (
            { color: 'white' }
          ) : (
            { color: muiStyle.palette.primary1Color }
          )
        }
        disabled={this.state.comfirm || this.state.loading}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={this.state.comfirm ? 'OK' : t('common:submit')}
        secondary={true}
        disabled={!this.state.comfirm && this.state.loading}
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <FlatButton
            style={{ color: muiStyle.palette.primary1Color }}
            label={t('common:create')}
            data-tip
            data-for="transactionCreate"
            icon={<ContentAdd />}
            onTouchTap={this.handleOpen}
          />
          <ReactTooltip id="transactionCreate" place="bottom" effect="solid">
            <span>{t('common:transaction.create')}</span>
          </ReactTooltip>
          <Dialog
            title={
              <div>
                <b>
                  {t('common:transaction.create')}
                </b>
              </div>
            }
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            {this.state.comfirm ? (
              <div>
                <b>{t('common:updatedSuccess')}</b>
              </div>
            ) : (
              <div style={{ marginRight: 'auto' }}>
                {this.state.loading ? (
                  <div style={{ textAlign: 'center' }}>
                    <CircularProgress
                      size={80}
                      color={muiStyle.palette.primary1Color}
                      thickness={5}
                    />
                  </div>
                ) : (
                  <div>
                    <Divider />
                    <div style={{ margin: '0px auto' }}>
                      <div style={{ display: 'inline-block', verticalAlign: 'text-top' }}>
                        <Animated animationIn="rollIn" isVisible={true}>
                          <ActionLabel color={muiStyle.palette.primary1Color} />
                        </Animated>
                      </div>
                      <div style={{ display: 'inline-block' }}>
                        <TextField
                          name="value"
                          floatingLabelText={t('common:transaction.addValue')}
                          onChange={this.handleChange}
                          value={this.state.addValue}
                          underlineFocusStyle={{
                            borderColor: muiStyle.palette.primary1Color,
                          }}
                        />
                      </div>
                    </div>
                    <br />
                    <div style={{ margin: '0px auto' }}>
                      <div style={{ display: 'inline-block', verticalAlign: 'text-top' }}>
                        <Animated animationIn="rollIn" isVisible={true}>
                          <ActionLabel color={muiStyle.palette.primary1Color} />
                        </Animated>
                      </div>
                      <div style={{ display: 'inline-block' }}>
                        <TextField
                          name="value"
                          floatingLabelText={t('common:transaction.info')}
                          onChange={this.handleChange}
                          value={this.state.info}
                          underlineFocusStyle={{
                            borderColor: muiStyle.palette.primary1Color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default translate('')(CreateTransaction);
