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

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { errorNotify } from '../../redux/Notify/actionNotify';

// ICON
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionLabel from 'material-ui/svg-icons/action/label';

// theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiStyle, muiTheme } from '../../myTheme';

import { gpuAmountList, ApiPutAvailableResource } from '../../resource';

/**
  Edit endDate of the instance
  Example:
  ```
  <EditModal
    token={this.props.token}
    data = {data}
    refresh={this.getData}
    {...this.props}
  />
  ```
 */
class EditAvailableResource extends React.Component {

  static propTypes = {
    /**
      The user token for call api
    */
    token: React.PropTypes.string.isRequired,
    /**
      Will refresh ReviewUser after edit
    */
    refresh: React.PropTypes.func.isRequired,
    /**
      the resource information
    */
    data: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      confirm: false,
      amount: null,
      resId: null,
    };
  }

  editAvailableResourceApi = () => {
    const userId = this.props.who;
    const availResId = this.props.data.id;
    const api = ApiPutAvailableResource(userId, availResId);
    fetch(api, {
      method: 'put',
      headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        availResId: availResId,
        userId: userId,
        resId: this.props.data.resId,
        amount: this.state.amount,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          this.dummyAsync(() => this.setState({ confirm: true }));
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.code !== undefined) {
          this.setState({ open: false, loading: false, confirm: false });
          this.props.someActions.errorNotify('ERROR : ' + data.message);
        }
        // this.setState({
        //   loading: false,
        // })
      })
      .catch((err) => {
        console.log('err:' + err);
        // GA
        ReactGA.event({
          category: 'Notify',
          action: 'ERROR',
          label: 'ERROR : Edit Date',
        });
        this.props.someActions.errorNotify('ERROR : Edit machine');
      });
  };

  dummyAsync = (cb) => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 800);
    });
  };

  handleOpen = () => {
    this.setState({
      open: true,
      amount: this.props.data.amount.toString(),
      resId: this.props.data.resId,
    });
    // GA
    ReactGA.event({
      category: 'EditResource',
      action: 'open',
      label: this.props.data.label,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      amount: null,
      resId: null,
    });
    // GA
    ReactGA.event({
      category: 'EditResource',
      action: 'close',
      label: this.props.data.label,
    });
  };

  handleSubmit = () => {
    // console.log(moment(this.state.endTime).format('YYYY-MM-DD'))
    if (!this.state.confirm) {
      this.setState({
        loading: true,
      });
      this.editAvailableResourceApi();
    } else {
      // console.log('refresh')
      this.setState({
        open: false,
        loading: false,
        confirm: false,
        amount: null,
        resId: null,
      });
      this.props.refresh();
      // GA
      ReactGA.event({
        category: 'EditModal',
        action: 'edited',
      });
    }
  };

  handleChange = (event, value) => this.setState({ [event.target.name]: value });

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
    const optionsStyle = {
      marginRight: 'auto',
    };
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <FlatButton
            style={{
              color: muiStyle.palette.primary1Color,
            }}
            data-tip
            data-for="availableResEdit"
            icon={<EditorModeEdit />}
            onTouchTap={this.handleOpen}
          />
          <Dialog
            title={
              <div>
                <b>
                  {t('common:availableRes.update')}
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
              <div style={optionsStyle}>
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
                      <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
                        <Animated animationIn="rollIn" isVisible={true}>
                          <ActionLabel color={muiStyle.palette.primary1Color} />
                        </Animated>
                      </div>
                      <div style={{ display: 'inline-block' }}>
                        {this.renderGpuAmount()}
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

export default connect(null, matchDispatchToProps)(translate('')(EditAvailableResource));
