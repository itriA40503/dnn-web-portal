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

import { gpuTypeList, machineTypeList, valueUnitTypeList, ApiCreateResource } from '../../resource';

class CreateResource extends React.Component {

  static propTypes = {
    /**
      The user token for call api
    */
    token: React.PropTypes.string.isRequired,
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
      gpuType: null,
      machineType: null,
      value: null,
      valueUnit: null,
    };
  }

  createDateApi = () => {
    const api = ApiCreateResource;
    const { gpuType, machineType, value, valueUnit } = this.state;
    console.log(gpuType, machineType, value, valueUnit);
    // console.log(moment(this.state.endTime).format('YYYY-MM-DD'))
    fetch(api, {
      method: 'post',
      headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        gpuType,
        machineType,
        value,
        valueUnit,
      }),
      // body:data
    })
      .then((response) => {
        // console.log(response)
        if (response.ok) {
          this.dummyAsync(() => this.setState({ comfirm: true }));
        } else {
          this.setState({
            open: false,
            loading: false,
            comfirm: false,
            gpuType: null,
            machineType: null,
            value: null,
            valueUnit: null,
          });
          this.props.someActions.errorNotify('ERROR : Create resource');
        }
        return response.json();
      })
      .then((data) => {
        console.log('data:' + data);
        this.setState({
          gpuType: null,
          machineType: null,
          value: null,
          valueUnit: null,
        });
      })
      .catch((err) => {
        console.log('err:' + err);
        // GA
        ReactGA.event({
          category: 'Notify',
          action: 'ERROR',
          label: 'ERROR : Edit Date',
        });
        this.props.someActions.errorNotify('ERROR : Create resource');
        this.setState({
          open: false,
          loading: false,
          comfirm: false,
          gpuType: null,
          machineType: null,
          value: null,
          valueUnit: null,
        });
      });
  };

  dummyAsync = (cb) => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 800);
    });
  };

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
      gpuType: null,
      machineType: null,
      value: null,
      valueUnit: null,
    });
    // GA
    ReactGA.event({
      category: 'CreateMachine',
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
      this.createDateApi();
    } else {
      // console.log('refresh')
      this.setState({
        open: false,
        loading: false,
        comfirm: false,
        gpuType: null,
        machineType: null,
        value: null,
        valueUnit: null,
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

  handleChange = (event, value) => this.setState({ [event.target.name]: value });

  gpuTypeSelect = (event, index, value) => this.setState({ gpuType: value });

  machineTypeSelect = (event, index, value) => this.setState({ machineType: value });

  valueUnitTypeSelect = (event, index, value) => this.setState({ valueUnit: value });

  renderGpuType = () => {
    const { t } = this.props;
    return (
      <SelectField
        floatingLabelText={t('common:resource.gpu')}
        onChange={this.gpuTypeSelect}
        value={this.state.gpuType}
      >
        {gpuTypeList.map(type => (
          <MenuItem
            key={type}
            value={type}
            primaryText={type}
          />
        ))}
      </SelectField>
    );
  }

  renderMachineType = () => {
    const { t } = this.props;
    return (
      <SelectField
        floatingLabelText={t('common:resource.machine')}
        onChange={this.machineTypeSelect}
        value={this.state.machineType}
      >
        {machineTypeList.map(type => (
          <MenuItem
            key={type}
            value={type}
            primaryText={type}
          />
        ))}
      </SelectField>
    );
  }

  renderValueUnitType = () => {
    const { t } = this.props;
    return (
      <SelectField
        floatingLabelText={t('common:resource.valueUnit')}
        onChange={this.valueUnitTypeSelect}
        value={this.state.valueUnit}
      >
        {valueUnitTypeList.map(type => (
          <MenuItem
            key={type.abbr}
            value={type.abbr}
            primaryText={t(type.locale)}
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
            label={t('common:create')}
            data-tip
            data-for="resourceCreate"
            icon={<ContentAdd />}
            onTouchTap={this.handleOpen}
          />
          <ReactTooltip id="resourceCreate" place="bottom" effect="solid">
            <span>{t('common:resource.create')}</span>
          </ReactTooltip>
          <Dialog
            title={
              <div>
                <b>
                  {t('common:resource.create')}
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
                    <div style={{ margin: '0px auto' }}>
                      <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
                        <Animated animationIn="rollIn" isVisible={true}>
                          <ActionLabel color={muiStyle.palette.primary1Color} />
                        </Animated>
                      </div>
                      <div style={{ display: 'inline-block' }}>
                        {this.renderGpuType()}
                      </div>
                    </div>
                    <br />
                    <div style={{ margin: '0px auto' }}>
                      <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
                        <Animated animationIn="rollIn" isVisible={true}>
                          <ActionLabel color={muiStyle.palette.primary1Color} />
                        </Animated>
                      </div>
                      <div style={{ display: 'inline-block' }}>
                        {this.renderMachineType()}
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
                          floatingLabelText={t('common:resource.value')}
                          onChange={this.handleChange}
                          value={this.state.value}
                          underlineFocusStyle={{
                            borderColor: muiStyle.palette.primary1Color,
                          }}
                        />
                      </div>
                    </div>
                    <br />
                    <div style={{ margin: '0px auto' }}>
                      <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
                        <Animated animationIn="rollIn" isVisible={true}>
                          <ActionLabel color={muiStyle.palette.primary1Color} />
                        </Animated>
                      </div>
                      <div style={{ display: 'inline-block' }}>
                        {this.renderValueUnitType()}
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

export default translate('')(CreateResource);
