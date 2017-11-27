import React, { Component } from 'react';
// i18n
import { translate } from 'react-i18next';

import { Card, CardTitle, CardActions } from 'material-ui/Card';

// ICON
import ActionAssignment from 'material-ui/svg-icons/action/assignment';

import CreateJob from './CreateJob';

class ProjectInfo extends Component {
  render() {
    return (
      <Card>
        <CardActions style={{
          zIndex: 2,
          display: 'inline-block',
          float: 'right',
          right: '10px',
        }}
        >
          <CreateJob />
        </CardActions>
        <CardTitle title={<b><ActionAssignment /> {this.props.project.title}</b>} />
        <div>
          {this.props.project.data}
        </div>
      </Card>
    );
  }
}
export default translate('')(ProjectInfo);
