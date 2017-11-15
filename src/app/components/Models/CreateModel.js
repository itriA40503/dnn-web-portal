import React from 'react';
// i18n
import { translate } from 'react-i18next';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';
// ICON
import ActionLabel from 'material-ui/svg-icons/action/label';
import DeviceStorage from 'material-ui/svg-icons/device/storage';
// COLOR
import { muiStyle } from '../../myTheme';

import ExpandTransition from 'material-ui/internal/ExpandTransition';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import ReactTooltip from 'react-tooltip';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const styles = {
  actions: {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
    right: '10px',
    margin: '0px auto',
  },
  tooltip: {
    margin: '0px auto',
    fontSize: '14px',
  },
};

class CreateModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,              // name of model
      type: null,              // type of model
      epochs: null,            // training epochs
      snapshotInterval: null,  // snapshot interval in epochs
      validInterval: null,     // validation interval in epochs
      randSeed: null,          // random seed
      batchSize: null,         // batch size
      batchAccum: null,        // batch accumulate
      solverType: null,        // optimizer
      learningRate: null,      // base learning rate
      policy: null,            // learning rate decay policy
      stepSize: null,          // step size
      gamma: null,             // gamma
      loadingCreate: false,    // loading when create
    };
  }
  handleTypeChange = (event, index, value) => {
    // console.log(event, index, value);
    this.setState({
      type: value,
    });
  }
  handleChange = (event, value) => this.setState({ [event.target.name]: value });
  handleSolverTypeChange = (event, index, value) => {
    this.setState({
      solverType: value,
    });
  }
  render() {
    const { t } = this.props;
    return (
      <Card>
        <CardActions style={styles.actions}>
          <FlatButton
            label={t('common:backReview')}
            style={{ color: muiStyle.palette.primary1Color }}
            icon={<DeviceStorage />}
            onTouchTap={() => this.props.backReview()}
          />
        </CardActions>
        <CardTitle title={'CreateModel'} />
        <ExpandTransition open={true} >
          <div style={{ marginLeft: 200, marginRight: 200 }}>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div style={{ display: 'inline-block', marginLeft: '3px' }}>
                <TextField
                  name="name"
                  floatingLabelText={'Model Name'}
                  onChange={this.handleChange}
                  value={this.state.name}
                  underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
                />
              </div>
            </div>
            <br />
            <Divider />

            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div
                style={{ display: 'inline-block', marginLeft: '3px' }}
                data-tip
                data-for="epochs"
              >
                <TextField
                  name="epochs"
                  floatingLabelText={'Training Epochs'}
                  onChange={this.handleChange}
                  value={this.state.epochs}
                  underlineFocusStyle={{
                    borderColor: muiStyle.palette.primary1Color,
                  }}
                />
                <ReactTooltip id="epochs" place="right" effect="solid">
                  <p style={styles.tooltip}>{'How many passes through the training data?'}</p>
                </ReactTooltip>
              </div>
            </div>
            
            <Row style={{ margin: '0px auto' }}>
              <Col>
                <div style={{ margin: '0px auto' }}>
                  <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <Animated animationIn="rollIn" isVisible={true}>
                      <ActionLabel color={muiStyle.palette.primary1Color} />
                    </Animated>
                  </div>
                  <div
                    style={{ display: 'inline-block', marginLeft: '3px' }}
                    data-tip
                    data-for="snapshotInterval"
                  >
                    <TextField
                      name="snapshotInterval"
                      floatingLabelText={'Snapshot Interval'}
                      onChange={this.handleChange}
                      value={this.state.snapshotInterval}
                      underlineFocusStyle={{
                        borderColor: muiStyle.palette.primary1Color,
                      }}
                    />
                    <ReactTooltip id="snapshotInterval" place="bottom" effect="solid">
                      <p style={styles.tooltip}>{'How many epochs of training between taking a snapshot?'}</p>
                    </ReactTooltip>
                  </div>
                </div>
              </Col>
              <Col>
                <div style={{ margin: '0px auto' }}>
                  <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <Animated animationIn="rollIn" isVisible={true}>
                      <ActionLabel color={muiStyle.palette.primary1Color} />
                    </Animated>
                  </div>
                  <div
                    style={{ display: 'inline-block', marginLeft: '3px' }}
                    data-tip
                    data-for="validInterval"
                  >
                    <TextField
                      name="validInterval"
                      floatingLabelText={'Validation Interval'}
                      onChange={this.handleChange}
                      value={this.state.validInterval}
                      underlineFocusStyle={{
                        borderColor: muiStyle.palette.primary1Color,
                      }}
                    />
                    <ReactTooltip id="validInterval" place="bottom" effect="solid">
                      <p style={styles.tooltip}>{'How many epochs of training between running through one'}</p>
                      <p style={styles.tooltip}>{'pass of the validation data?'}</p>
                    </ReactTooltip>
                  </div>
                </div>
              </Col>
            </Row>

            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div
                style={{ display: 'inline-block', marginLeft: '3px' }}
                data-tip
                data-for="randSeed"
              >
                <TextField
                  name="randSeed"
                  floatingLabelText={'Random Seed'}
                  onChange={this.handleChange}
                  value={this.state.randSeed}
                  underlineFocusStyle={{
                    borderColor: muiStyle.palette.primary1Color,
                  }}
                />
                <ReactTooltip id="randSeed" place="right" effect="solid">
                  <p style={styles.tooltip}>{'If you provide a random seed, the back-to-back runs'}</p>
                  <p style={styles.tooltip}>{'with the same model and dataset should give identical'}</p>
                  <p style={styles.tooltip}>{'results.'}</p>
                </ReactTooltip>
              </div>
            </div>

            <Row style={{ margin: '0px auto' }}>
              <Col>
                <div style={{ margin: '0px auto' }}>
                  <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <Animated animationIn="rollIn" isVisible={true}>
                      <ActionLabel color={muiStyle.palette.primary1Color} />
                    </Animated>
                  </div>
                  <div
                    style={{ display: 'inline-block', marginLeft: '3px' }}
                    data-tip
                    data-for="batchSize"
                  >
                    <TextField
                      name="batchSize"
                      floatingLabelText={'Batch Size'}
                      onChange={this.handleChange}
                      value={this.state.batchSize}
                      underlineFocusStyle={{
                        borderColor: muiStyle.palette.primary1Color,
                      }}
                    />
                    <ReactTooltip id="batchSize" place="bottom" effect="solid">
                      <p style={styles.tooltip}>{'How many images to process as once. If blank, values'}</p>
                      <p style={styles.tooltip}>{'are used from the network definition. (multiples allowed,'}</p>
                      <p style={styles.tooltip}>{'accepts comma separated list)'}</p>
                    </ReactTooltip>
                  </div>
                </div>
              </Col>
              <Col>
                <div style={{ margin: '0px auto' }}>
                  <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <Animated animationIn="rollIn" isVisible={true}>
                      <ActionLabel color={muiStyle.palette.primary1Color} />
                    </Animated>
                  </div>
                  <div
                    style={{ display: 'inline-block', marginLeft: '3px' }}
                    data-tip
                    data-for="batchAccum"
                  >
                    <TextField
                      name="batchAccum"
                      floatingLabelText={'Batch Accumulation'}
                      onChange={this.handleChange}
                      value={this.state.batchAccum}
                      underlineFocusStyle={{
                        borderColor: muiStyle.palette.primary1Color,
                      }}
                    />
                    <ReactTooltip id="batchAccum" place="bottom" effect="solid">
                      <p style={styles.tooltip}>{'Accumulate gradients over multiple batches (useful when you need'}</p>
                      <p style={styles.tooltip}>{'a bigger batch size fro training but it doesn\'t fit in memory).'}</p>
                    </ReactTooltip>
                  </div>
                </div>
              </Col>
            </Row>

            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'super', position: 'relative', top: '-10px' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div
                style={{ display: 'inline-block', verticalAlign: 'super', marginLeft: '3px' }}
                data-tip
                data-for="solverType"
              >
                <SelectField
                  name="solverType"
                  floatingLabelText={'Solver Type'}
                  onChange={this.handleSolverTypeChange}
                  autoWidth={true}
                  value={this.state.solverType}
                >
                  <MenuItem
                    key={'SGD'}
                    value={'SGD'}
                    primaryText={'Stochastic Gradient Descent'}
                  />
                  <MenuItem
                    key={'Momentum'}
                    value={'Momentum'}
                    primaryText={'Momentum'}
                  />
                  <MenuItem
                    key={'NAG'}
                    value={'NAG'}
                    primaryText={'Nesterov\'s Accelerated Gradient'}
                  />
                  <MenuItem
                    key={'AdaGrad'}
                    value={'AdaGrad'}
                    primaryText={'Adaptive Gradient'}
                  />
                  <MenuItem
                    key={'AdaGradDA'}
                    value={'AdaGradDA'}
                    primaryText={'Adaptive Gradient Dual Averaging'}
                  />
                  <MenuItem
                    key={'AdaDelta'}
                    value={'AdaDelta'}
                    primaryText={'AdaDelta'}
                  />
                  <MenuItem
                    key={'Adam'}
                    value={'Adam'}
                    primaryText={'Adaptive Moment Estimation'}
                  />
                  <MenuItem
                    key={'RMSprop'}
                    value={'RMSprop'}
                    primaryText={'RMSprop'}
                  />
                  <MenuItem
                    key={'FTRL'}
                    value={'FTRL'}
                    primaryText={'Follow-The-Regularized-Leader'}
                  />
                </SelectField>
                <ReactTooltip id="solverType" place="right" effect="solid">
                  <p style={styles.tooltip}>{'What type of solver will be used?'}</p>
                </ReactTooltip>
              </div>
            </div>

            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div
                style={{ display: 'inline-block', marginLeft: '3px' }}
                data-tip
                data-for="learningRate"
              >
                <TextField
                  name="learningRate"
                  floatingLabelText={'Base Learning Rate'}
                  onChange={this.handleChange}
                  value={this.state.learningRate}
                  underlineFocusStyle={{
                    borderColor: muiStyle.palette.primary1Color,
                  }}
                />
                <ReactTooltip id="learningRate" place="right" effect="solid">
                  <p style={styles.tooltip}>{'Affects how quickly the network learns. If you are getting'}</p>
                  <p style={styles.tooltip}>{'NaN for your loss, you probably need to lower this value. '}</p>
                  <p style={styles.tooltip}>{'(multiples allowed, accepts comma separated list)'}</p>
                </ReactTooltip>
              </div>
            </div>

          </div>
          <br />
          <CardActions style={styles.actions}>
            {
              false &&
              <RaisedButton
                label={'create dataset'}
                backgroundColor={muiStyle.palette.primary1Color}
                labelColor={'white'}
                disabled={this.state.loadingCreate}
                onTouchTap={this.createApi}
              />
            }
          </CardActions>
          <Divider />
          <br />
        </ExpandTransition>
      </Card>
    );
  }
}

export default translate('')(CreateModel);
