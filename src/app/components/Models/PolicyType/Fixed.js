import React from 'react';
// i18n
import { translate } from 'react-i18next';
import ChartOpt from './ChartOptions';
import { Row, Col } from 'react-flexbox-grid';
import { Line } from 'react-chartjs-2';

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
          <Col xs={5} style={{ marginRight: '-30px' }} />
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

export default translate('')(Fixed);
