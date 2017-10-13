import React from 'react';
import ReactTooltip from 'react-tooltip';
// GA
import ReactGA from 'react-ga';
// COLOR
import { redA700, greenA700 } from 'material-ui/styles/colors';
// i18n
import { translate } from 'react-i18next';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMachineData } from '../../redux/MachineData/actionMachineData';
import { errorNotify } from '../../redux/Notify/actionNotify';
// ICON
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

// style
import { muiStyle } from '../../myTheme';

import { ApiPutMachine, getMachines } from '../../resource';


/**
  Delete the instance
  Example:
  ```
  <DeleteModal
    data = {data}
    refresh={this.getData}
    token={this.props.token}
  />
  ```
 */
class EnableMachine extends React.Component {
  static propTypes = {
    /**
      The user token for call api
    */
    token: React.PropTypes.string.isRequired,
    /**
      the instance information
    */
    data: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    data: {
      id: '1',
      label: 'm1',
      name: 'm1',
      description: null,
      gpuAmount: 1,
      gpuType: 'v100',
      statusId: 1,
    },
  };
  constructor(props) {
    super(props);
    let action = '';
    if (this.props.data.statusId === 1) {
      action = 'disable';
    } else {
      action = 'enable';
    }
    this.state = {
      open: false,
      loading: false,
      comfirm: false,
      action,
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
    // GA
    ReactGA.event({
      category: 'enable/disable Machine',
      action: 'open',
      label: this.props.data.label,
    });
  };
  handleClose = () => {
    this.setState({ open: false });
    // GA
    ReactGA.event({
      category: 'enable/disable Machine',
      action: 'close',
      label: this.props.data.label,
    });
  };
  dummyAsync = (cb) => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 1300);
    });
  };
  handleSubmit = () => {
    if (!this.state.comfirm) {
      this.setState({
        loading: true,
      });
      const api = `${ApiPutMachine}${this.props.data.id}qwer/${this.state.action}`;
      fetch(api, {
        method: 'put',
        headers: {
          'x-access-token': this.props.token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        // body:data
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            this.dummyAsync(() => this.setState({ loading: false, comfirm: true }));
          } else {
            this.setState({ open: false, loading: false, comfirm: false });
            this.props.someActions.errorNotify(`ERROR : ${this.state.action} machine`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('data:' + data);
        })
        .catch((err) => {
          console.log('err:' + err);
          this.props.someActions.errorNotify(`ERROR : ${this.state.action} machine`);
          this.setState({ open: false, comfirm: false });
          getMachines(this.props.dispatch, this.props.token);
          // GA
          ReactGA.event({
            category: 'DeleteMachine',
            action: `${this.state.action} false`,
            label: this.props.data.label,
          });
        });
    } else {
      console.log('refresh');
      this.setState({ open: false, comfirm: false });
      getMachines(this.props.dispatch, this.props.token);
      // GA
      ReactGA.event({
        category: 'enable/disable Machine',
        action: 'deleted',
        label: this.props.data.label,
      });
    }
  };

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
        label={t('common:submit')}
        secondary={true}
        disabled={this.state.loading}
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <FlatButton
          label=""
          style={this.state.action !== 'disable' ? { color: redA700 } : { color: greenA700 }}
          fullWidth={true}
          data-tip
          data-for="machineEnable"
          onTouchTap={this.handleOpen}
          icon={<ActionPowerSettingsNew />}
        />
        <ReactTooltip id="machineEnable" place="bottom" effect="solid">
          <span>{t('common:machine.enable')}</span>
        </ReactTooltip>
        <Dialog
          title={
            <div>
              <b>{t('common:machine.comfirm')}</b>
              <font color={this.state.action === 'disable' ? redA700 : greenA700}><b>{' ' + t(`common:${this.state.action}`)}</b></font>
              <font color={muiStyle.palette.primary1Color}><b>{` ${this.props.data.label} ?`}</b></font>
            </div>
          }
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          {this.state.comfirm ? (
            <div>
              <b>{t('common:deletedSuccess')}</b>
            </div>
          ) : (
            <div>
              {this.state.loading ? (
                <div style={{ textAlign: 'center' }}>
                  <CircularProgress
                    size={80}
                    color={muiStyle.palette.primary1Color}
                    thickness={5}
                  />
                </div>
              ) : (
                <div>{}</div>
              )}
            </div>
          )}
        </Dialog>
      </div>
    );
  }
}
function matchDispatchToProps(dispatch) {
  return { dispatch, someActions: bindActionCreators({ errorNotify, getMachineData }, dispatch) };
}
export default connect(null, matchDispatchToProps)(translate('')(EnableMachine));
