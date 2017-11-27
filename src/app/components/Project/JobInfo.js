import React, { Component } from 'react';
// i18n
import { translate } from 'react-i18next';
import { Card, CardTitle } from 'material-ui/Card';
// ICON
import FaFlask from 'react-icons/lib/fa/flask';

class JobInfo extends Component {
  render() {
    return (
      <Card>
        <CardTitle title={<b><FaFlask /> {this.props.job.title}</b>} />
        <div>
          {this.props.job.data}
        </div>
      </Card>
    );
  }
}
export default translate('')(JobInfo);
