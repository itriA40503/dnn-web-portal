import React, { Component } from 'react';
// i18n
import { translate } from 'react-i18next';
import { Card, CardTitle } from 'material-ui/Card';
// ICON
import ActionAssignment from 'material-ui/svg-icons/action/assignment';

class ProjectInfo extends Component {
  render() {
    return (
      <Card>
        <CardTitle title={<b><ActionAssignment /> {this.props.project.title}</b>} />
        <div>
          {this.props.project.data}
        </div>
      </Card>
    );
  }
}
export default translate('')(ProjectInfo);
