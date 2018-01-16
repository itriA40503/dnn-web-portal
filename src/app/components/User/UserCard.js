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
import UserTypeHandler from '../UserTypeHandler';

// style
import { muiStyle } from '../../myTheme';

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
    };
  }

  handleExpandChange = value => this.setState({ expanded: value });

  render() {
    const { t, data } = this.props;
    return (
      <div style={this.props.styles}>
        <Card zDepth={2} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardTitle
            actAsExpander={true}
            showExpandableButton={this.props.button}
          >
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
          </CardTitle>
          <ExpandTransition loading={false} open={this.state.expanded}>
            <CardText expandable={true}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
          </ExpandTransition>
        </Card>
      </div>
    );
  }
}

export default translate('')(UserCard);
