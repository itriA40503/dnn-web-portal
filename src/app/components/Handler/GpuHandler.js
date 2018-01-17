import React, { Component } from 'react';
import Label from './Label';

import { indigo500 } from 'material-ui/styles/colors';

// i18n
import { translate } from 'react-i18next';
/**
  Show GPU Type
  Example:
  ```
  <GpuHandler gpu={data.instance.machine.gpuType} />
  ```
 */
class GpuHandler extends Component {
  static propTypes = {
    /**
     GPUType of the instance
    */
    gpu: React.PropTypes.string.isRequired,
  };
  static defaultProps = {
    gpu: 'AyyMD',
    styles: {},
  };
  render() {
    return (
      <div style={this.props.styles}>
        <Label
          color={indigo500}
          text={this.props.gpu}
        />
      </div>
    );
  }
}
export default translate('')(GpuHandler);
