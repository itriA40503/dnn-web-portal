import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';
import 'semantic-ui-css/components/label.min.css';
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
    machine: 'Unknown',
    styles: { '': '' },
  };
  render() {
    return (
      <div style={this.props.styles}>
        <Label color={'blue'}>{this.props.machine}</Label>
      </div>
    );
  }
}
export default translate('')(MachineHandler);
