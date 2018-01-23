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
import { errorNotify } from '../../redux/Notify/actionNotify';
import { List, ListItem } from 'material-ui/List';

import { ApiRemoveAvailableResource } from '../../resource';

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
class DeleteAvailableResource extends React.Component {
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

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      confirm: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
    // GA
    ReactGA.event({
      category: 'DeleteAvailableResource',
      action: 'open',
      // label: this.props.data.id,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
    // GA
    ReactGA.event({
      category: 'DeleteAvailableResource',
      action: 'close',
      // label: this.props.data.id,
    });
  };

  dummyAsync = (cb) => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 1300);
    });
  };

  handleSubmit = () => {
    if (!this.state.confirm) {
      this.setState({
        loading: true,
      });
      const userId = this.props.who;
      const availResId = this.props.data.id;
      const api = ApiRemoveAvailableResource(userId, availResId);
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
            this.dummyAsync(() => this.setState({ loading: false, confirm: true }));
          } else {
            this.setState({ open: false, loading: false, confirm: false });
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
          this.setState({ open: false, confirm: false });
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
      this.setState({ open: false, confirm: false });
      this.props.refresh();
      // getMachines(this.props.dispatch, this.props.token);
      // GA
      ReactGA.event({
        category: 'DeleteAvailableResource',
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
              <b>{t('common:remove.confirmRemove')}</b>
            </div>
          }
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          {this.state.confirm ? (
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
                      secondaryText={data.resId}
                    />
                    <ListItem
                      primaryText={<b>{t('common:machine.gpuAmount')} </b>}
                      secondaryText={data.amount}
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


function matchDispatchToProps(dispatch) {
  return { dispatch, someActions: bindActionCreators({ errorNotify }, dispatch) };
}

export default connect(null, matchDispatchToProps)(translate('')(DeleteAvailableResource));
