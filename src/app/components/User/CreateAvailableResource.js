import React from 'react';
// i18n
import { translate } from 'react-i18next';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';
// GA
import ReactGA from 'react-ga';

import ReactTooltip from 'react-tooltip';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';

// ICON
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionLabel from 'material-ui/svg-icons/action/label';

// theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiStyle, muiTheme } from '../../myTheme';


class CreateAvailableResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      loading: false,
      open: false,
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
          this.state.confirm ? (
            { color: 'white' }
          ) : (
            { color: muiStyle.palette.primary1Color }
          )
        }
        disabled={this.state.confirm || this.state.loading}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={this.state.confirm ? 'OK' : t('common:submit')}
        secondary={true}
        disabled={!this.state.confirm && this.state.loading}
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
            data-for="availableResCreate"
            icon={<ContentAdd />}
            onTouchTap={this.handleOpen}
          />
          <ReactTooltip id="availableResCreate" place="bottom" effect="solid">
            <span>{t('common:availableRes.create')}</span>
          </ReactTooltip>
          <Dialog
            title={
              <div>
                <b>
                  {t('common:availableRes.create')}
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

export default translate('')(CreateAvailableResource);
