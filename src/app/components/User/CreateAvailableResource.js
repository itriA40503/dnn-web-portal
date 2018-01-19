import React from 'react';
// i18n
import { translate } from 'react-i18next';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';
// GA
import ReactGA from 'react-ga';

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


class CreateAvailableResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      loading: false,
      open: false,
      resId: null,
      gpuAmount: null,
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
      gpuAmount: null,
    });
    // GA
    ReactGA.event({
      category: 'CreateAvailableResource',
      action: 'close',
    });
  };

  handleSubmit = () => {

  }

  handleChange = (event, value) => this.setState({ [event.target.name]: value });

  resourceSelect = (event, index, value) => this.setState({ resId: value })

  gpuAmountSelect = (event, index, value) => this.setState({ gpuAmount: value })

  renderGpuAmount = () => {
    const { t } = this.props;
    return (
      <SelectField
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

export default translate('')(CreateAvailableResource);
