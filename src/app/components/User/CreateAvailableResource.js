import React from 'react';
// i18n
import { translate } from 'react-i18next';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';
// GA
import ReactGA from 'react-ga';
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
import MenuItem from 'material-ui/MenuItem';
import ResourceSelector from '../ResourceSelector';

import { gpuAmountList } from '../../resource';

// ICON
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionLabel from 'material-ui/svg-icons/action/label';

// theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiStyle, muiTheme } from '../../myTheme';

import { ApiCreateAvailableResource } from '../../resource';

class CreateAvailableResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      loading: false,
      open: false,
      resId: null,
      amount: null,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
    // GA
    ReactGA.event({
      category: 'CreateAvailableResource',
      action: 'open',
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      resId: null,
      amount: null,
    });
    // GA
    ReactGA.event({
      category: 'CreateAvailableResource',
      action: 'close',
    });
  };

  createAvailableResourceApi = () => {
    const { amount, resId } = this.state;
    const api = ApiCreateAvailableResource(this.props.who);
    fetch(api, {
      method: 'post',
      headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        userId: this.props.who.toString(),
        amount: amount,
        resId: resId,
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
            amount: null,
            resId: null,
          });
          this.props.someActions.errorNotify('ERROR : Create Available Resource');
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
          amount: null,
          resId: null,
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
        this.props.someActions.errorNotify('ERROR : Create Available Resource');
        this.setState({
          open: false,
          loading: false,
          confirm: false,
          amount: null,
          resId: null,
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
      this.createAvailableResourceApi();
    } else {
      // console.log('refresh')
      this.setState({
        open: false,
        loading: false,
        confirm: false,
        amount: null,
        resId: null,
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

  resourceSelect = (event, index, value) => this.setState({ resId: value })

  gpuAmountSelect = (event, index, value) => this.setState({ amount: value })

  renderGpuAmount = () => {
    const { t } = this.props;
    return (
      <SelectField
        floatingLabelText={t('common:machine.gpuAmount')}
        onChange={this.gpuAmountSelect}
        value={this.state.amount}
      >
        {gpuAmountList.map(type => (
          <MenuItem
            key={type}
            value={type.toString()}
            primaryText={type}
          />
        ))}
      </SelectField>
    );
  }

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
                    <ResourceSelector
                      list={this.props.list}
                      init={this.state.resId}
                      store={this.resourceSelect}
                    />
                    <div style={{ margin: '0px auto' }}>
                      <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
                        <Animated animationIn="rollIn" isVisible={true}>
                          <ActionLabel color={muiStyle.palette.primary1Color} />
                        </Animated>
                      </div>
                      <div style={{ display: 'inline-block' }}>
                        {this.renderGpuAmount()}
                      </div>
                    </div>
                    <ReactTooltip id="click" place="right" effect="solid">
                      <span>{t('common:clickEdit')}</span>
                    </ReactTooltip>
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

export default connect(null, matchDispatchToProps)(translate('')(CreateAvailableResource));
