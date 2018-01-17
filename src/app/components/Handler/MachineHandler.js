import React, { Component } from 'react';
import Label from './Label';

import { blue500 } from 'material-ui/styles/colors';

// i18n
import { translate } from 'react-i18next';
/**
  Show Machine Type
  Example:
  ```
  <MachineHandler machine={data.original.machineType} />
  ```
 */
class MachineHandler extends Component {
  static propTypes = {
    /**
     MachineType of the instance
    */
    machine: React.PropTypes.string.isRequired,
  };
  static defaultProps = {
    machine: 'i686',
    styles: {},
  };
  render() {
    return (
      <div style={this.props.styles}>
        <Label
          color={blue500}
          text={this.props.machine}
        />
      </div>
    );
  }
}
export default translate('')(MachineHandler);
