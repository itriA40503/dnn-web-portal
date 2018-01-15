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
import { getMachineData } from '../../redux/MachineData/actionMachineData';
import { errorNotify } from '../../redux/Notify/actionNotify';

import ReactTooltip from 'react-tooltip';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// ICON
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionLabel from 'material-ui/svg-icons/action/label';

// theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiStyle, muiTheme } from '../../myTheme';

import { gpuAmountList, ApiPutMachine } from '../../resource';

import ResourceSelector from '../ResourceSelector';

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
class EditMachine extends React.Component {

  static propTypes = {
    /**
      The user token for call api
    */
    token: React.PropTypes.string.isRequired,
    /**
      Will refresh reviewTable after edit
    */
    refresh: React.PropTypes.func.isRequired,
    /**
      the instance information
    */
    data: React.PropTypes.object.isRequired,
  };
  static defaultProps = {
    data: {
      id: '2',
      statusId: 1,
      projectCode: null,
      username: 'mochatest',
      password: 'k7xrtjep',
      startedAt: '2018-12-31T16:00:00.000Z',
      endedAt: '2019-01-15T15:59:59.000Z',
      createdAt: '2017-09-12T07:35:30.973Z',
      updatedAt: '2017-09-12T07:35:31.753Z',
      userId: '99999999',
      machine: {
        id: '3',
        label: 'm3',
        name: 'm3',
        description: null,
        gpuAmount: 1,
        gpuType: 'v100',
        statusId: 1,
      },
      container: {
        id: '2',
        serviceIp: '5.5.6.6',
        podIp: '8.7.8.7',
        sshPort: '9527',
        ports: [],
      },
      image: {
        id: '30',
        label: '201707v001',
        name: 'tensorflow',
        path: null,
        description: null,
      },
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      comfirm: false,
      resId: null,
      gpuAmount: null,
    };
  }

  editMachineApi = () => {
    const api = ApiPutMachine + this.props.data.id;
    // console.log(moment(this.state.endTime).format('YYYY-MM-DD'))
    fetch(api, {
      method: 'put',
      headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        resId: this.state.resId,
        gpuAmount: Number(this.state.gpuAmount),
      }),
      // body:data
    })
      .then((response) => {
        // console.log(response)
        if (response.ok) {
          this.dummyAsync(() => this.setState({ comfirm: true }));
        } else {
          this.setState({ open: false, loading: false, comfirm: false });
          this.props.someActions.errorNotify('ERROR : Edit machine');
        }
        return response.json();
      })
      .then((data) => {
        console.log('data:' + data);
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
      resId: this.props.data.resId,
      gpuAmount: this.props.data.gpuAmount.toString(),
    });
    // GA
    ReactGA.event({
      category: 'EditMachine',
      action: 'open',
      label: this.props.data.label,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
      resId: null,
      gpuAmount: null,
    });
    // GA
    ReactGA.event({
      category: 'EditMachine',
      action: 'close',
      label: this.props.data.label,
    });
  };
  handleSubmit = () => {
    // console.log(moment(this.state.endTime).format('YYYY-MM-DD'))
    if (!this.state.comfirm) {
      this.setState({
        loading: true,
      });
      this.editMachineApi();
    } else {
      // console.log('refresh')
      this.setState({
        open: false,
        loading: false,
        comfirm: false,
        resId: null,
        gpuAmount: null,
      });
      this.props.refresh();
      // GA
      ReactGA.event({
        category: 'EditModal',
        action: 'edited',
        label: this.props.data.id,
      });
    }
  };

  resourceSelect = (event, index, value) => this.setState({ resId: value })

  gpuAmountSelect = (event, index, value) => this.setState({ gpuAmount: value })

  renderGpuAmount = () => {
    const { t } = this.props;
    return (
      <SelectField
        key={this.props.data.id}
        floatingLabelText={t('common:machine.gpuAmount')}
        onChange={this.gpuAmountSelect}
        value={this.state.gpuAmount}
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
    const optionsStyle = {
      marginRight: 'auto',
    };
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <FlatButton
            style={{ color: muiStyle.palette.primary1Color }}
            data-tip
            data-for="machineEdit"
            icon={<EditorModeEdit />}
            onTouchTap={this.handleOpen}
          />
          <ReactTooltip id="machineEdit" place="bottom" effect="solid">
            <span>{t('common:machine.edit')}</span>
          </ReactTooltip>
          <Dialog
            title={
              <div>
                <b>
                  {t('common:machine.label') + ': ' + this.props.data.label}
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
  return { dispatch, someActions: bindActionCreators({ errorNotify, getMachineData }, dispatch) };
}
export default connect(null, matchDispatchToProps)(translate('')(EditMachine));
