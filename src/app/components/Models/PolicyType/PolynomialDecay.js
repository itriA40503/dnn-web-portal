
import React from 'react';
// i18n
import { translate } from 'react-i18next';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';
import ActionLabel from 'material-ui/svg-icons/action/label';
// COLOR
import { muiStyle } from '../../../myTheme';

import TextField from 'material-ui/TextField';
import { Line } from 'react-chartjs-2';
import { Row, Col } from 'react-flexbox-grid';

import ChartOpt from './ChartOptions';


class PolynomialDecay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //type: 'Polynomial Decay',
      power: '3',
    };
    this.props.store({ ...this.state });
  }
  handleChange = (event, value) => {
    let param = { ...this.state };
    param[event.target.name] = value;
    this.setState({ [event.target.name]: value });
    this.props.store(param);
  }
  labelGenerator = () => [...Array(100).keys()].map(value => (parseInt(value, 10) + 1));
  dataGenerator = () => [...Array(100).fill(this.props.lr)].map((value, index) => {
    let ratio = (1 - ((index) / 100.0));
    return value * (ratio ** parseFloat(this.state.power));
  });
  chartData = () => ChartOpt.dataTemplate(this.labelGenerator(), this.dataGenerator());
  chartOptions = () => ChartOpt.optionsTemplate();
  render() {
    return (
      <div>
        <Row>
          <Col xs={5} style={{ marginRight: '-30px' }}>
            <div style={{ margin: '0px 3px' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div
                style={{ display: 'inline-block', marginLeft: '3px' }}
              >
                <TextField
                  name="power"
                  floatingLabelText={'Power'}
                  onChange={this.handleChange}
                  value={this.state.power}
                  underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
                />
              </div>
            </div>
          </Col>
          <Col xs={7} style={{ marginTop: '-50px' }}>
            <div>
              <Line
                data={this.chartData()}
                options={this.chartOptions()}
              />
            </div>
          </Col>
        </Row>
        <br />
      </div>
    );
  }
}

export default translate('')(PolynomialDecay);
