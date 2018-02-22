
import React from 'react';

// i18n
import { translate } from 'react-i18next';

// GA
import ReactGA from 'react-ga';

// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';

// Theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiStyle, muiTheme } from '../../myTheme';

// Material UI
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// Material UI Color
import { red500 } from 'material-ui/styles/colors';

// Material UI ICON
import ActionLabel from 'material-ui/svg-icons/action/label';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { errorNotify } from '../../redux/Notify/actionNotify';
import { getCreateResData, getCreateAmountData } from '../../redux/CreateData/actionCreateData';

// API
import { ApiGetUserResources, ApiGetUserResourceRemind } from '../../resource';

import ResourceSelector from '../ResourceSelector';

class SelectResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resId: null,
      amountIdx: null,
      availRes: [],
      amountList: [],
      remindDays: null,
    };
  }

  componentDidMount() {
    this.getUserResourcesApi();
  }

  getUserResourceRemind = async () => {
    const { amountList, amountIdx, resId } = this.state;
    if (amountList === null || resId === null) { return; }

    let params = new URLSearchParams();
    params.append('amount', amountList[amountIdx]);
    params.append('resId', resId);
    this.props.someActions.getCreateAmountData(amountList[amountIdx]);
    this.props.someActions.getCreateResData(resId);
    const api = `${ApiGetUserResourceRemind}?${params.toString()}`;
    fetch(api, {
      method: 'get',
      headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then((data) => {
        if (data.code !== undefined) {
          this.props.blocking(true);
          this.props.someActions.errorNotify(`ERROR : ${data.message}`);
        } else {
          this.props.blocking(false);
          this.setState({ remindDays: data.match(/\d/g).join('') });
        }
      })
      .catch((err) => {
        console.log('err:' + err);
        // GA
        ReactGA.event({
          category: 'Notify',
          action: 'ERROR',
          label: 'ERROR : Get User Resource Data Remind',
        });
        this.props.someActions.errorNotify('ERROR : Get User Resource');
      });
  }

  getUserResourcesApi = async () => {
    const api = ApiGetUserResources;
    fetch(api, {
      method: 'get',
      headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then((data) => {
        if (data.code !== undefined) {
          this.props.someActions.errorNotify(`ERROR : ${data.message}`);
        } else {
          let noData = (data.length === 0);
          this.props.blocking(noData);
          this.setState({
            availRes: data,
            resId: noData ? null : data[0].resId,
            amountIdx: noData ? null : 0,
          }, () => {
            this.setState(
              { amountList: this.resourceMapAvailableAmount() },
              () => this.getUserResourceRemind(),
            );
          });
        }
      })
      .catch((err) => {
        console.log('err:' + err);
        // GA
        ReactGA.event({
          category: 'Notify',
          action: 'ERROR',
          label: 'ERROR : Get User Resource',
        });
        this.props.someActions.errorNotify('ERROR : Get User Resource');
      });
  }

  gpuAmountSelect = (event, index, value) =>
    this.setState({ amountIdx: value }, () => this.getUserResourceRemind());
  // Utility Functions
  resourceMapAvailableAmount = () =>
    this.state.availRes.filter(ar => this.state.resId === ar.resId)
      .map(ar => ar.amount).sort((a, b) => a > b);

  uniqueAvailableResource = () =>
    this.state.availRes.map(ar => ar.resInfo)
      .filter((o, i, self) =>
        i === self.findIndex(a =>
          a.gpuType === o.gpuType && a.machineType === o.machineType));

  resourceSelect = (event, index, value) => {
    this.setState({
      resId: value,
      amountIdx: 0,
    }, () => this.setState(
      { amountList: this.resourceMapAvailableAmount() },
      () => this.getUserResourceRemind(),
    ));

  }

  renderGpuAmount = () => {
    const { t } = this.props;
    return (
      <SelectField
        floatingLabelText={t('common:machine.gpuAmount')}
        onChange={this.gpuAmountSelect}
        value={this.state.amountIdx}
      >
        {this.state.amountList.length !== 0 &&
          this.state.amountList.map((num, idx) => (
            <MenuItem
              key={num}
              value={idx}
              primaryText={num.toString()}
            />
        ))}
      </SelectField>
    );
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <div style={{ margin: '0px 25%' }}>
          <div style={{ display: 'inline-block' }}>
            <div>
              <p>
                {t('common:createProc.availRsrc')}
              </p>
            </div>
            <ResourceSelector
              list={this.uniqueAvailableResource()}
              init={this.state.resId}
              store={this.resourceSelect}
              showMachine={false}
            />
            <br />
            <div>
              <p>
                {t('common:createProc.availAmnt')}
              </p>
            </div>
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
            <br />
            { this.state.remindDays !== null &&
              <div>
                <p>
                  {`${t('common:createProc.availDays')}: `}
                  <span style={{ color: red500 }}>
                    {`${this.state.remindDays}`}
                  </span>
                </p>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return {
    dispatch,
    someActions: bindActionCreators({
      errorNotify,
      getCreateResData,
      getCreateAmountData,
    }, dispatch) };
}

export default connect(null, matchDispatchToProps)(translate('')(SelectResource));

