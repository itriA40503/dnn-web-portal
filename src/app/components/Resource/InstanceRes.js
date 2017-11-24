import React from 'react';
// i18n
import { translate } from 'react-i18next';

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';

class InstanceRes extends React.Component {
  render() {
    return (
      <Card>
        <CardTitle title={'Instance used resouce'} />
        <CardText>
          {'Instance Resouce'}
        </CardText>
      </Card>
    );
  }
}

export default translate('')(InstanceRes);
