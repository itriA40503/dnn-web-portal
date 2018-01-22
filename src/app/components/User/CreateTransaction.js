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

import { errorNotify } from '../../redux/Notify/actionNotify';
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

import { ApiCreateTransaction } from '../../resource';

class CreateTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      loading: false,
      open: false,
      addValue: null,
      info: null,
    };
  }

  handleOpen = () => {
    this.setState({
      open: true,
      info: 'add value',
    });
    // GA
    ReactGA.event({
      category: 'CreateMachine',
      action: 'open',
      // label: this.props.data.label,
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
      // label: this.props.data.label,
    });
  };

  createTransactionApi = () => {
    const api = ApiCreateTransaction(this.props.who);
    const { addValue, info } = this.state;
    fetch(api, {
      method: 'post',
      headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        userId: this.props.who.toString(),
        addValue: addValue,
        info: info, 
      }),
      // body:data
    })
      .then((response) => {
        // console.log(response)
        if (response.ok) {
          this.dummyAsync(() => this.setState({ confirm: true }));
        } else {
          this.setState({
            open: false,
            loading: false,
            confirm: false,
            addValue: null,
            info: null,
          });
          this.props.someActions.errorNotify('ERROR : Create Transaction');
        }
        return response.json();
      })
      .then((data) => {
        console.log('data:' + data);
        if (data.code !== undefined) {
          this.setState({ open: false, loading: false, confirm: false });
          this.props.someActions.errorNotify(`ERROR : ${data.message}`);
        }
        this.setState({
          addValue: null,
          info: null,
        });
      })
      .catch((err) => {
        console.log('err:' + err);
        // GA
        ReactGA.event({
          category: 'Notify',
          action: 'ERROR',
          label: 'ERROR : Create Transaction',
        });
        this.props.someActions.errorNotify('ERROR : Create Transaction');
        this.setState({
          open: false,
          loading: false,
          confirm: false,
          addValue: null,
          info: null,
        });
      });
  }

  dummyAsync = (cb) => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 800);
    });
  };

  handleSubmit = () => {
    if (!this.state.confirm) {
      this.setState({
        loading: true,
      });
      this.createTransactionApi();
    } else {
      // console.log('refresh')
      this.setState({
        open: false,
        loading: false,
        confirm: false,
        addValue: null,
        info: null,
      });
      // refresh
      this.props.refresh();
      // GA
      ReactGA.event({
        category: 'CreateModal',
        action: 'created',
        // label: this.props.data.id,
      });
    }
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
            {this.state.confirm ? (
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
                          name="addValue"
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
                          name="info"
                          floatingLabelText={t('common:transaction.info')}
                          onChange={this.handleChange}
                          value={this.state.info}
                          defaultValue={'add value'}
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

function matchDispatchToProps(dispatch) {
  return { dispatch, someActions: bindActionCreators({ errorNotify }, dispatch) };
}

export default connect(null, matchDispatchToProps)(translate('')(CreateTransaction));
