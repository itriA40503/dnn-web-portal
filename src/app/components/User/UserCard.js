import React, { Component } from 'react';
// GA
import ReactGA from 'react-ga';
// i18n
import { translate } from 'react-i18next';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';

import ExpandTransition from 'material-ui/internal/ExpandTransition';
import { Card, CardTitle } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Row, Col } from 'react-flexbox-grid';
import UserTypeHandler from '../Handler/UserTypeHandler';

import { lightBlueA700, orange500 } from 'material-ui/styles/colors';

// style
import { muiStyle } from '../../myTheme';

import ReviewTransaction from './ReviewTransaction';
import ReviewAvailableResource from './ReviewAvailableResource';

class UserCard extends Component {

  static propTypes = {
    /**
     Token for access authority
    */
    token: React.PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: {},
    button: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      slideIndex: 0,
    };
  }

  handleExpandChange = value => this.setState({ expanded: value });

  handleTabChange = value => this.setState({ slideIndex: value });

  render() {
    const { t, data } = this.props;
    return (
      <div style={this.props.styles}>
        <Card zDepth={2} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardTitle
            actAsExpander={true}
            showExpandableButton={this.props.button}
          >
            <div style={{ margin: '0px 50px 0px 0px' }}>
              <Row center="xs">
                <Col xs>
                  <UserTypeHandler user={data.typeId} />
                </Col>
                <Col xs>
                  {
                    <p style={{ margin: '5px' }}>
                      {data.itriId}
                    </p>
                  }
                </Col>
                <Col xs>
                  {
                    <p style={{ margin: '5px' }}>
                      {data.id}
                    </p>
                  }
                </Col>
              </Row>
            </div>
          </CardTitle>
          <div style={{ margin: '0px 20px' }}>
            <ExpandTransition loading={false} open={this.state.expanded}>
              <div style={{ margin: '0px 10px' }}>
                <Tabs
                  onChang={this.handleTabChange}
                  value={this.state.slideIndex}
                  tabItemContainerStyle={{ backgroundColor: 'white' }}
                >
                  <Tab
                    label={t('common:transaction.name')}
                    value={0}
                    style={{ color: muiStyle.palette.primary1Color, fontWeight: 'bold' }}
                  >
                    <ReviewTransaction
                      token={this.props.token}
                      data={this.props.data.transactions}
                      refresh={this.props.refresh}
                    />
                  </Tab>
                  <Tab
                    label={t('common:availableRes.name')}
                    value={1}
                    style={{ color: muiStyle.palette.primary1Color, fontWeight: 'bold'}}
                  >
                    <ReviewAvailableResource
                      token={this.props.token}
                      list={this.props.list}
                      data={this.props.data.availableRes}
                      refresh={this.props.refresh}
                    />
                  </Tab>
                </Tabs>
                <br />
              </div>
            </ExpandTransition>
          </div>
        </Card>
      </div>
    );
  }
}

export default translate('')(UserCard);
