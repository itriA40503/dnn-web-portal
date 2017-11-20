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


class ExponentialDecay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Exponential Decay',
      gamma: '0.95',
    };
  }
  handleChange = (event, value) => this.setState({ [event.target.name]: value });
  labelGenerator = () => {
    return [...Array(100).keys()].map((value) => { return parseInt(value, 10) + 1; });
  }
  dataGenerator = () => {
    return [...Array(100).fill(this.props.lr)].map((value, index) => {
      return value * (this.state.gamma ** (index));
    });
  }
  chartData = () => {
    return ChartOpt.dataTemplate(this.labelGenerator(), this.dataGenerator());
  }
  chartOptions = () => {
    return ChartOpt.optionsTemplate();
  }
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
                  name="gamma"
                  floatingLabelText={'Gamma'}
                  onChange={this.handleChange}
                  value={this.state.gamma}
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

export default translate('')(ExponentialDecay);
