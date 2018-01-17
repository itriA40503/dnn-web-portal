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
          <div style={{ margin: '5px 20px' }}>
            <ExpandTransition loading={false} open={this.state.expanded}>
              <br />
              <div>
                <Tabs
                  onChang={this.handleTabChange}
                  value={this.state.slideIndex}
                  tabItemContainerStyle={{ backgroundColor: 'white' }}
                >
                  <Tab
                    label="Transaction"
                    value={0}
                    style={{ color: '#000', fontWeight: 'bold' }}
                  >
                    <div>
                      <h2>
                        {'Tabs with slide effect'}
                      </h2>
                    </div>
                  </Tab>
                  <Tab
                    label="Available Resource"
                    value={1}
                    style={{ color: '#000', fontWeight: 'bold' }}
                  >
                    <h2>
                      {'Tabs with slide effect'}
                    </h2>
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
