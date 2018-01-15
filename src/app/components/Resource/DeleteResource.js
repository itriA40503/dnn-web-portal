import React from 'react';
// GA
import ReactGA from 'react-ga';
// COLOR
import { redA700 } from 'material-ui/styles/colors';
// i18n
import { translate } from 'react-i18next';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// ICON
import MdDelete from 'react-icons/lib/md/delete';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';

import { valueUnitTypeList, ApiRemoveResource } from '../../resource';

// style
import { muiStyle } from '../../myTheme';

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
  }

  handleOpen = () => {
    this.setState({ open: true });
    // GA
    // ReactGA.event({
    //   category: 'DeleteResource',
    //   action: 'open',
    //   label: this.props.data.id,
    // });
  };

  handleClose = () => {
    this.setState({ open: false });
    // GA
    // ReactGA.event({
    //   category: 'DeleteResource',
    //   action: 'close',
    //   label: this.props.data.id,
    // });
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
      const api = ApiRemoveResource + this.props.data.id;
      fetch(api, {
        method: 'delete',
        headers: {
          'x-access-token': this.props.token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
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
          // getMachines(this.props.dispatch, this.props.token);
          // GA
          ReactGA.event({
            category: 'DeleteResource',
            action: 'delete false',
            label: this.props.data.label,
          });
        });
    } else {
      console.log('refresh');
      this.setState({ open: false, comfirm: false });
      this.props.refresh();
      // getMachines(this.props.dispatch, this.props.token);
      // GA
      ReactGA.event({
        category: 'DeleteResource',
        action: 'deleted',
        label: this.props.data.label,
      });
    }
  };

  render() {
    const { t, data } = this.props;
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
                    <Divider />
                    <ListItem
                      primaryText={<b>{t('common:resource.id')}</b>}
                      secondaryText={data.id}
                    />
                    <ListItem
                      primaryText={<b>{t('common:resource.gpu')} </b>}
                      secondaryText={data.gpuType}
                    />
                    <ListItem
                      primaryText={<b>{t('common:resource.machine')}</b>}
                      secondaryText={data.machineType}
                    />
                    <ListItem
                      primaryText={<b>{t('common:resource.value')}</b>}
                      secondaryText={data.value}
                    />
                    <ListItem
                      primaryText={<b>{t('common:resource.valueUnit')}</b>}
                      secondaryText={
                        valueUnitTypeList.filter(unit => data.valueUnit === unit.abbr)[0].text
                      }
                    />
                    <Divider />
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

export default translate('')(DeleteMachine);
