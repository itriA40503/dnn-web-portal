import React, { Component } from 'react';
// GA
import ReactGA from 'react-ga';
// i18n
import { translate } from 'react-i18next';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';

import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { Row, Col } from 'react-flexbox-grid';

// style
import { muiStyle } from '../../myTheme';

import UserCard from './UserCard';
import { ApiGetAllResources, ApiGetAllUsersDetail } from '../../resource';

// fake data
let fakeData = [
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

const styles = {
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
  actions: {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
    right: '10px',
    margin: '0px auto',
  },
};

class ReviewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resourceList: [],
      userList: [],
    };
  }

  componentDidMount() {
    this.getResourcesApi();
    this.getUsersListApi();
  }

  getResourcesApi = () => {
    const api = ApiGetAllResources;
    fetch(api, {
      method: 'get',
      headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then((data) => {
        if (data.code !== undefined) {
          // this.props.someActions.errorNotify('ERROR : Get Resource Failed');
        } else {
          this.setState({
            resourceList: data.sort((a, b) => Number(a.id) - Number(b.id)),
          });
        }
      })
      .catch((err) => {
        console.log('err:' + err);
        // GA
        ReactGA.event({
          category: 'Notify',
          action: 'ERROR',
          label: 'ERROR : Get Resources',
        });
        // this.props.someActions.errorNotify('ERROR : Review machine');
      });
  }

  getUsersListApi = () => {
    const api = ApiGetAllUsersDetail;
    fetch(api, {
      method: 'get',
      headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then((data) => {
        if (data.code !== undefined) {
          // this.props.someActions.errorNotify('ERROR : Get Resource Failed');
        } else {
          this.setState({
            userList: data,
          });
        }
      })
      .catch((err) => {
        console.log('err:' + err);
        // GA
        ReactGA.event({
          category: 'Notify',
          action: 'ERROR',
          label: 'ERROR : Get Users',
        });
        // this.props.someActions.errorNotify('ERROR : Review machine');
      });
  }

  refresh = () => {

  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <Card>
          <CardActions style={styles.actions}>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block' }}>
                <FlatButton
                  label={t('common:refresh')}
                  style={{ color: muiStyle.palette.primary1Color }}
                  icon={<NavigationRefresh />}
                  onTouchTap={() => {}}
                />
              </div>
            </div>
          </CardActions>
          <CardTitle title={t('common:user.review')} />
          <ExpandTransition loading={false} open={true}>
            <Animated animationIn="fadeIn" isVisible={true}>
              <div style={{ margin: 'auto' }}>
                <div style={{ margin: '0px calc(8% + 66px) 0px calc(8% + 16px)' }}>
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
                {this.state.userList.map(user => (
                  <UserCard
                    styles={{ margin: '20px 8% 20px 8%' }}
                    token={this.props.token}
                    data={user}
                    list={this.state.resourceList}
                    refresh={this.refresh}
                  />
                ))}
              </div>
            </Animated>
          </ExpandTransition>
          <br />
          <br />
        </Card>
      </div>
    );
  }
}

export default translate('')(ReviewUser);
