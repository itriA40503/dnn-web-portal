import React from 'react';
import ReactTooltip from 'react-tooltip';
// GA
import ReactGA from 'react-ga';
// COLOR
import { redA700 } from 'material-ui/styles/colors';
// i18n
import { translate } from 'react-i18next';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMachineData } from '../../redux/MachineData/actionMachineData';
import { errorNotify } from '../../redux/Notify/actionNotify';
// ICON
import MdDelete from 'react-icons/lib/md/delete';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';

import StatusHandler from '../StatusHandler';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';


// style
import { muiStyle } from '../../myTheme';

import { ApiRemoveMachine, getMachines } from '../../resource';


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
class DeleteMachine extends React.Component {
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
    this.state = {
      open: false,
      loading: false,
      comfirm: false,
    };
    // console.log(this.props.data)
    // console.log(this.props.id)
  }
  handleOpen = () => {
    this.setState({ open: true });
    // GA
    ReactGA.event({
      category: 'DeleteMachine',
      action: 'open',
      label: this.props.data.id,
    });
  };
  handleClose = () => {
    this.setState({ open: false });
    // GA
    ReactGA.event({
      category: 'DeleteMachine',
      action: 'close',
      label: this.props.data.id,
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
      const api = ApiRemoveMachine + this.props.data.id;
      fetch(api, {
        method: 'delete',
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
            this.props.someActions.errorNotify('ERROR : Delete machine');
          }
          return response.json();
        })
        .then((data) => {
          console.log('data:' + data);
        })
        .catch((err) => {
          console.log('err:' + err);
          this.props.someActions.errorNotify('ERROR : Delete machine');
          this.setState({ open: false, comfirm: false });
          getMachines(this.props.dispatch, this.props.token);
          // GA
          ReactGA.event({
            category: 'DeleteMachine',
            action: 'delete false',
            label: this.props.data.label,
          });
        });
    } else {
      console.log('refresh');
      this.setState({ open: false, comfirm: false });
      getMachines(this.props.dispatch, this.props.token);
      // GA
      ReactGA.event({
        category: 'DeleteMachine',
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
    // console.log(this.props.data);
    return (
      <div>
        <FlatButton
          label=""
          style={{ color: redA700 }}
          fullWidth={true}
          data-tip
          data-for="remove"
          onTouchTap={this.handleOpen}
          icon={<ActionDeleteForever />}
        />
        <ReactTooltip id="remove" place="bottom" effect="solid">
          <span>{t('common:remove.remove')}</span>
        </ReactTooltip>
        <Dialog
          title={
            <div>
              <b>{t('common:remove.comfirmRemove')}</b>
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
                <div>
                  <font color={redA700}>
                    <MdDelete />
                    <b> {t('common:remove.warning')}</b>
                  </font>
                  <List>
                    <Divider style={{ color: redA700 }} />
                    <ListItem
                      secondaryText={
                        <StatusHandler statusId={this.props.data.statusId} machineStatus={true} />
                      }
                    />
                    <ListItem
                      primaryText={<b>{t('common:machine.id')}</b>}
                      secondaryText={this.props.data.id}
                    />
                    <ListItem
                      primaryText={<b>{t('common:machine.label')}</b>}
                      secondaryText={this.props.data.label}
                    />
                    <ListItem
                      primaryText={
                        <span>
                          <b>{t('common:machine.gpuType')} </b>
                        </span>
                      }
                      secondaryText={
                        <p>
                          <b>{this.props.data.gpuType}</b>
                        </p>
                      }
                    />
                    <ListItem
                      primaryText={<b>{t('common:machine.gpuAmount')}</b>}
                      secondaryText={this.props.data.gpuAmount}
                    />
                    <Divider style={{ color: redA700 }} />
                  </List>
                </div>
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
export default connect(null, matchDispatchToProps)(translate('')(DeleteMachine));
