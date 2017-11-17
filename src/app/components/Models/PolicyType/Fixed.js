import React from 'react';
// i18n
import { translate } from 'react-i18next';
import { Line } from 'react-chartjs-2';
import { Row, Col } from 'react-flexbox-grid';

import ChartOpt from './ChartOptions';

class Fixed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Fixed',
    };
  }
  labelGenerator = () => {
    return [...Array(100).keys()];
  }
  dataGenerator = () => {
    return [...Array(100).fill(this.props.lr)];
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
          <Col xs={12}>
            <Row center="xs">
              <Col xs={6}>
                <Line
                  data={this.chartData()}
                  options={this.chartOptions()}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
      </div>
    );
  }
}

export default translate('')(Fixed);
