import React, { Component } from 'react';

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// GA
import ReactGA from 'react-ga';
// i18n
import { translate } from 'react-i18next';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';

import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import { Card, CardTitle, CardHeader, CardText, CardActions } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { Row, Col } from 'react-flexbox-grid';

// style
import { muiStyle } from '../../myTheme';

import UserCard from './UserCard';

// fake data
let data = [
  {
    id: '4',
    itriId: 'A30375',
    createdAt: '2017-12-25T02:56:44.890Z',
    updatedAt: '2017-12-25T02:56:44.894Z',
    deletedAt: null,
    typeId: 1,
  },
  {
    id: '2',
    itriId: 'A40503',
    createdAt: '2017-12-25T02:46:49.426Z',
    updatedAt: '2017-12-25T02:46:49.437Z',
    deletedAt: null,
    typeId: 2,
  },
  {
    id: '11',
    itriId: '545455',
    createdAt: '2018-01-12T08:25:04.148Z',
    updatedAt: '2018-01-12T08:25:04.138Z',
    deletedAt: null,
    typeId: 1,
  },
  {
    id: '1',
    itriId: 'a40503',
    createdAt: '2017-12-25T00:57:54.659Z',
    updatedAt: '2017-12-25T00:57:54.665Z',
    deletedAt: null,
    typeId: 1,
  },
  {
    id: '3',
    itriId: 'A60283',
    createdAt: '2017-12-25T02:55:09.988Z',
    updatedAt: '2017-12-25T02:55:09.999Z',
    deletedAt: null,
    typeId: 2,
  },
];

class ReviewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    const { t } = this.props;
    return (
      <div>
        <Card>
          <CardTitle title={t('common:user.review')} />
          <div style={{ margin: 'auto' }}>
            <div style={{ margin: '0px calc(12% + 66px) 0px calc(12% + 16px)' }}>
              <Row center="xs">
                <Col xs>
                  {t('common:user.typeId')}
                </Col>
                <Col xs>
                  {t('common:user.itirID')}
                </Col>
                <Col xs>
                  {t('common:user.id')}
                </Col>
              </Row>
            </div>
            {data.map(user => (
              <UserCard
                styles={{ margin: '20px calc(12% + 50px) 20px 12%' }}
                token={this.props.token}
                data={user}
              />
            ))}
          </div>
          <br />
          <br />
        </Card>
      </div>
    );
  }
}

export default translate('')(ReviewUser);
