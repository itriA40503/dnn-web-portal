import React, { Component } from 'react';

// i18n
import { translate } from 'react-i18next';

import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';
import ActionLabel from 'material-ui/svg-icons/action/label';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiStyle, muiTheme } from '../myTheme';

import MachineHandler from './MachineHandler';
import GpuHandler from './GpuHandler';
import { valueUnitTypeList } from '../resource';
/**
  Present the resource select field
  Example:
  ```
  <ResourceSelector list={} init={} store={}/>
  ```
 */
class ResourceSelector extends Component {
  static propTypes = {
    /**
     list of the resource
    */
    list: React.PropTypes.string.isRequired,
  };
  static defaultProps = {
    styles: { '': '' },
    init: null,
  };

  getResourceValue = (resId) => {
    if (this.props.list.length !== 0) {
      return this.props.list.filter(res => res.id === resId)[0].value;
    }
    return '';
  }

  getResourceValueUnit = (resId) => {
    if (this.props.list.length !== 0) {
      let unit = this.props.list.filter(res => res.id === resId)[0].valueUnit;
      return valueUnitTypeList.filter(elem => elem.abbr === unit)[0].locale;
    }
    return '';
  }

  renderResourceList = () => {
    const { t } = this.props;
    return (
      <SelectField
        floatingLabelText={t('common:machine.resInfo')}
        floatingLabelStyle={{ top: '35px' }}
        onChange={this.props.store}
        value={this.props.init}
      >
        {this.props.list.map(res => (
          <MenuItem
            key={res.id}
            value={res.id}
            primaryText={
              res.id !== this.props.init ? (
                <div  style={{ opacity: '0.5' }}>
                  <GpuHandler
                    styles={{ padding: '0px 5px', float: 'left' }}
                    gpu={res.gpuType}
                  />
                  <MachineHandler
                    styles={{ padding: '0px 5px', float: 'left' }}
                    machine={res.machineType}
                  />
                </div>
              ) : (
                <div>
                  <GpuHandler
                    styles={{ padding: '0px 5px', float: 'left' }}
                    gpu={res.gpuType}
                  />
                  <MachineHandler
                    styles={{ padding: '0px 5px', float: 'left' }}
                    machine={res.machineType}
                  />
                </div>
              )
            }
          />
        ))}
      </SelectField>
    );
  }

  render() {
    const { t } = this.props;
    return (
      <div style={this.props.styles}>
        <div style={{ margin: '0px auto' }}>
          <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
            <Animated animationIn="rollIn" isVisible={true}>
              <ActionLabel color={muiStyle.palette.primary1Color} />
            </Animated>
          </div>
          <div style={{ display: 'inline-block' }}>
            {this.renderResourceList()}
          </div>
        </div>
        {this.props.init !== null ? (
          <div>
            <p style={{
                padding: '0px 0px 0px 30px',
                margin: '5px 0px',
                fontWeight: 'bold',
              }}
            >
              {`${t('common:resource.count')}: ${this.getResourceValue(this.props.init)} /
                ${t(this.getResourceValueUnit(this.props.init))}`}
            </p>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
export default translate('')(ResourceSelector);
