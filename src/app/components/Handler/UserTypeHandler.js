import React, { Component } from 'react';
import Label from './Label';

import { cyan800, lightBlue800, deepPurple800 } from 'material-ui/styles/colors';

/**
  Show User Type
  Example:
  ```
  <UserTypeHandler user={typeId} />
  ```
 */
class UserTypeHandler extends Component {
  static propTypes = {
    /**
     GPUType of the instance
    */
    user: React.PropTypes.string.isRequired,
  };

  static defaultProps = {
    user: '1',
    styles: {},
  };

  userConfig = (id) => {
    let config = { text: '', color: '' };
    switch (id) {
      case 1:
        config.text = 'Normal';
        config.color = lightBlue800;
        break;
      case 2:
        config.text = 'Admin';
        config.color = cyan800;
        break;
      default:
        config.text = 'Unknow';
        config.color = deepPurple800;
    }
    return config;
  }

  render() {
    let config = this.userConfig(this.props.user);
    return (
      <div style={this.props.styles}>
        <Label
          color={config.color}
          text={config.text}
        />
      </div>
    );
  }
}
export default UserTypeHandler;
