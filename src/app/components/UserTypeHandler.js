import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';
import 'semantic-ui-css/components/label.min.css';


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
        config.color = 'violet';
        break;
      case 2:
        config.text = 'Admin';
        config.color = 'pink';
        break;
      default:
        config.text = 'Unknow';
        config.color = 'teal';
    }
    return config;
  }

  render() {
    let config = this.userConfig(this.props.user);
    return (
      <div style={this.props.styles}>
        <Label color={config.color}>
          {config.text}
        </Label>
      </div>
    );
  }
}
export default UserTypeHandler;
