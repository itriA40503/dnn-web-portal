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
import { muiStyle } from '../../../myTheme';

import ExpandTransition from 'material-ui/internal/ExpandTransition';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ReactTooltip from 'react-tooltip';
import { sampleCrop, sampleFill, sampleSquash, sampleHalf } from '../../../image/imageBase64';
import { Row, Col } from 'react-flexbox-grid';
import Checkbox from 'material-ui/Checkbox';

const Resize = [
  {
    trans: 'Crop',
    img: sampleCrop,
  },
  {
    trans: 'Squash',
    img: sampleSquash,
  },
  {
    trans: 'Fill',
    img: sampleFill,
  },
  {
    trans: 'Half Crop, half fill',
    img: sampleHalf,
  },
];
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

class Classification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Classification',  // type of dataset
      imgType: null,           // type of image
      resize: null,            // resize transformation of image
      trainPath: null,         // training images path
      miniClass: null,         // Minimum samples per class (train)
      maxClass: null,          // Maximum samples per class (train)
      percentVaild: null,      // % for validation
      percentTest: null,       // % for testing
      vaildPath: null,         // validation images path
      vaildMiniClass: null,    // Minimum samples per class (validation)
      vaildMaxClass: null,     // Maximum samples per class (validation)
      vaildChecked: false,     // check Separate validation images folder
      testPath: null,          // validation images path
      testMiniClass: null,     // Minimum samples per class (testing)
      testMaxClass: null,      // Maximum samples per class (testing)
      testChecked: false,      // check Separate test images folder
      loadingCreate: false,    // loading when create
    };
  }
  handleChange = (event, value) => this.setState({ [event.target.name]: value });
  createApi = () => {
    console.log(this.state);
    this.props.backReview();
  }
  checkSeparateTest = () => {
    this.setState({
      testChecked: !this.state.testChecked,
    });
  }
  checkSeparateVaild = () => {
    this.setState({
      vaildChecked: !this.state.vaildChecked,
    });
  }
  handleImgTypeChange = (event, index, value) => {
    // console.log(event, index, value);
    this.setState({
      imgType: value,
    });
  }
  handleResizeChange = (event, index, value) => {
    console.log(event, index, value);
    this.setState({
      resize: value,
    });
  }
  renderSelectResize = () => {
    return (
      <div>
        <SelectField
          floatingLabelText={'DataSet Resize'}
          onChange={this.handleResizeChange}
          value={this.state.resize}
        >
          {Resize.map(data => (
            <MenuItem
              key={data.trans}
              value={data}
              primaryText={data.trans}
            />
          ))}
        </SelectField>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Row style={{ margin: '0px auto' }}>
          <Col>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'super', position: 'relative', top: '-10px' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div
                style={{ display: 'inline-block', verticalAlign: 'super', marginLeft: '3px' }}
                data-tip
                data-for="imgType"
              >
                <SelectField
                  name="imgType"
                  floatingLabelText={'Image Type'}
                  onChange={this.handleImgTypeChange}
                  value={this.state.imgType}
                >
                  <MenuItem
                    key={'Grayscale'}
                    value={'Grayscale'}
                    primaryText={'Grayscale'}
                  />
                  <MenuItem
                    key={'Color'}
                    value={'Color'}
                    primaryText={'Color'}
                  />
                </SelectField>
                <ReactTooltip id="imgType" place="right" effect="solid">
                  <p style={styles.tooltip}>{'Color is 3-channel RGB'}</p>
                  <p style={styles.tooltip}>{'Grapscale is single channel monochrome'}</p>
                </ReactTooltip>
              </div>
            </div>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'bottom', position: 'relative', top: '-7px' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div
                style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '3px' }}
                data-tip
                data-for="size"
              >
                <TextField
                  style={{ width: 50, marginRight: '3px' }}
                  floatingLabelText={'Width'}
                  inputStyle={{ textAlign: 'center' }}
                  underlineFocusStyle={{
                    borderColor: muiStyle.palette.primary1Color,
                  }}
                />
                {' X '}
                <TextField
                  style={{ width: 50, marginLeft: '3px' }}
                  floatingLabelText={'Height'}
                  inputStyle={{ textAlign: 'center' }}
                  underlineFocusStyle={{
                    borderColor: muiStyle.palette.primary1Color,
                  }}
                />
              </div>
              <ReactTooltip id="size" place="right" effect="solid">
                <p style={styles.tooltip}>{'Input images will be resized to fit.'}</p>
              </ReactTooltip>
            </div>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'super', position: 'relative', top: '-10px' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div
                style={{ display: 'inline-block', verticalAlign: 'super', marginLeft: '3px' }}
                data-tip
                data-for="resize"
              >
                {this.renderSelectResize()}
              </div>
              <ReactTooltip id="resize" place="bottom" effect="solid">
                <p style={styles.tooltip}>{'Options for dealing with aspect ratio changes during resize.'}</p>
                <p style={styles.tooltip}>{'See examples beside.'}</p>
              </ReactTooltip>
            </div>
          </Col>
          <Col>
            { this.state.resize &&
              <div>
                {'Resize Example (color 256*256)'}
                <br />
                <img src={this.state.resize.img} alt={this.state.resize.trans} />
              </div>
            }
          </Col>
        </Row>
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
            data-for="trainPath"
          >
            <TextField
              name="trainPath"
              floatingLabelText={'Training Images path'}
              onChange={this.handleChange}
              value={this.state.trainPath}
              underlineFocusStyle={{
                borderColor: muiStyle.palette.primary1Color,
              }}
            />
            <ReactTooltip id="trainPath" place="right" effect="solid">
              <p style={styles.tooltip}>{'Indicate a folder which holds subfolders full of images. Each'}</p>
              <p style={styles.tooltip}>{'subfolder should be named according to the desired label for '}</p>
              <p style={styles.tooltip}>{'the images that it holds. Can also be URL for an apache/nginx'}</p>
              <p style={styles.tooltip}>{'auto-indexed folder.'}</p>
            </ReactTooltip>
          </div>
        </div>
        <Row style={{ margin: '2px' }}>
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
                data-for="miniClass"
              >
                <TextField
                  name="miniClass"
                  floatingLabelText={'Minimum samples per class'}
                  onChange={this.handleChange}
                  value={this.state.miniClass}
                  underlineFocusStyle={{
                    borderColor: muiStyle.palette.primary1Color,
                  }}
                />
              </div>
              <ReactTooltip id="miniClass" place="bottom" effect="solid">
                <p style={styles.tooltip}>{'You can choose to specify a minimum number of samples per class.'}</p>
                <p style={styles.tooltip}>{'If a class has fewer samples than the specified amount it will be ignored.'}</p>
                <p style={styles.tooltip}>{'Leave blank to ignore this feature'}</p>
              </ReactTooltip>
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
                data-for="maxClass"
              >
                <TextField
                  name="maxClass"
                  floatingLabelText={'Maximum samples per class'}
                  onChange={this.handleChange}
                  value={this.state.maxClass}
                  underlineFocusStyle={{
                    borderColor: muiStyle.palette.primary1Color,
                  }}
                />
              </div>
              <ReactTooltip id="maxClass" place="bottom" effect="solid">
                <p style={styles.tooltip}>{'You can choose to specify a maximum number of samples per class.'}</p>
                <p style={styles.tooltip}>{'If a class has more samples than the specified amount extra samples will be ignored.'}</p>
                <p style={styles.tooltip}>{'Leave blank to ignore this feature'}</p>
              </ReactTooltip>
            </div>
          </Col>
        </Row>
        <Row style={{ margin: '2px' }}>
          <Col>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={this.state.vaildChecked ?
                    muiStyle.palette.accent2Color : muiStyle.palette.primary1Color}
                  />
                </Animated>
              </div>
              <div
                style={{ display: 'inline-block', marginLeft: '3px' }}
                data-tip
                data-for="percentVaild"
              >
                <TextField
                  name="percentVaild"
                  disabled={this.state.vaildChecked}
                  floatingLabelText={'% for validation'}
                  onChange={this.handleChange}
                  value={this.state.percentVaild}
                  underlineFocusStyle={{
                    borderColor: muiStyle.palette.primary1Color,
                  }}
                />
              </div>
              <ReactTooltip id="percentVaild" place="bottom" effect="solid">
                <p style={styles.tooltip}>{'You can choose to set apart a certain percentage of images'}</p>
                <p style={styles.tooltip}>{'from the training images for the validation set.'}</p>
              </ReactTooltip>
            </div>
          </Col>
          <Col>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={this.state.testChecked ?
                    muiStyle.palette.accent2Color : muiStyle.palette.primary1Color}
                  />
                </Animated>
              </div>
              <div
                style={{ display: 'inline-block', marginLeft: '3px' }}
                data-tip
                data-for="percentTest"
              >
                <TextField
                  name="percentTest"
                  disabled={this.state.testChecked}
                  floatingLabelText={'% for testing'}
                  onChange={this.handleChange}
                  value={this.state.percentTest}
                  underlineFocusStyle={{
                    borderColor: muiStyle.palette.primary1Color,
                  }}
                />
              </div>
              <ReactTooltip id="percentTest" place="bottom" effect="solid">
                <p style={styles.tooltip}>{'You can choose to set apart a certain percentage of images'}</p>
                <p style={styles.tooltip}>{'from the training images for the test set.'}</p>
              </ReactTooltip>
            </div>
          </Col>
        </Row>
        <Divider />
        <br />
        <Card>
          <Checkbox
            label="Separate testing images folder (option)"
            labelStyle={{ fontSize: '16px' }}
            style={{ padding: '10px 10px' }}
            onCheck={() => this.checkSeparateTest()}
            checked={this.state.testChecked}
          />
          { this.state.testChecked &&
            <div style={{ margin: '20px' }}>
              <div style={{ margin: '0px 2px' }}>
                <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  <Animated animationIn="rollIn" isVisible={true}>
                    <ActionLabel color={muiStyle.palette.primary1Color} />
                  </Animated>
                </div>
                <div style={{ display: 'inline-block', marginLeft: '3px' }}>
                  <TextField
                    name="testPath"
                    floatingLabelText={'Test Images path'}
                    onChange={this.handleChange}
                    value={this.state.testPath}
                    underlineFocusStyle={{
                      borderColor: muiStyle.palette.primary1Color,
                    }}
                  />
                </div>
              </div>
              <Row style={{ margin: '2px' }}>
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
                      data-for="testMiniClass"
                    >
                      <TextField
                        name="testMiniClass"
                        floatingLabelText={'Minimum samples per class'}
                        onChange={this.handleChange}
                        value={this.state.testMiniClass}
                        underlineFocusStyle={{
                          borderColor: muiStyle.palette.primary1Color,
                        }}
                      />
                    </div>
                    <ReactTooltip id="testMiniClass" place="bottom" effect="solid">
                      <p style={styles.tooltip}>{'You can choose to specify a minimum number of samples per class.'}</p>
                      <p style={styles.tooltip}>{'If a class has fewer samples than the specified amount it will be ignored.'}</p>
                      <p style={styles.tooltip}>{'Leave blank to ignore this feature'}</p>
                    </ReactTooltip>
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
                      data-for="testMaxClass"
                    >
                      <TextField
                        name="testMaxClass"
                        floatingLabelText={'Maximum samples per class'}
                        onChange={this.handleChange}
                        value={this.state.testMaxClass}
                        underlineFocusStyle={{
                          borderColor: muiStyle.palette.primary1Color,
                        }}
                      />
                    </div>
                    <ReactTooltip id="testMaxClass" place="bottom" effect="solid">
                      <p style={styles.tooltip}>{'You can choose to specify a maximum number of samples per class.'}</p>
                      <p style={styles.tooltip}>{'If a class has more samples than the specified amount extra samples will be ignored.'}</p>
                      <p style={styles.tooltip}>{'Leave blank to ignore this feature'}</p>
                    </ReactTooltip>
                  </div>
                </Col>
              </Row>
            </div>
          }
        </Card>
        <br />
        <Card>
          <Checkbox
            label="Separate validation images folder (option)"
            labelStyle={{ fontSize: '16px' }}
            style={{ padding: '10px 10px' }}
            onCheck={() => this.checkSeparateVaild()}
            checked={this.state.vaildChecked}
          />
          { this.state.vaildChecked &&
            <div style={{ margin: '20px' }}>
              <div style={{ margin: '0px 2px' }}>
                <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  <Animated animationIn="rollIn" isVisible={true}>
                    <ActionLabel color={muiStyle.palette.primary1Color} />
                  </Animated>
                </div>
                <div style={{ display: 'inline-block', marginLeft: '3px' }}>
                  <TextField
                    name="vaildPath"
                    floatingLabelText={'Validation Images path'}
                    onChange={this.handleChange}
                    value={this.state.vaildPath}
                    underlineFocusStyle={{
                      borderColor: muiStyle.palette.primary1Color,
                    }}
                  />
                </div>
              </div>
              <Row style={{ margin: '2px' }}>
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
                      data-for="vaildMiniClass"
                    >
                      <TextField
                        name="vaildMiniClass"
                        floatingLabelText={'Minimum samples per class'}
                        onChange={this.handleChange}
                        value={this.state.vaildMiniClass}
                        underlineFocusStyle={{
                          borderColor: muiStyle.palette.primary1Color,
                        }}
                      />
                    </div>
                    <ReactTooltip id="vaildMiniClass" place="bottom" effect="solid">
                      <p style={styles.tooltip}>{'You can choose to specify a minimum number of samples per class.'}</p>
                      <p style={styles.tooltip}>{'If a class has fewer samples than the specified amount it will be ignored.'}</p>
                      <p style={styles.tooltip}>{'Leave blank to ignore this feature'}</p>
                    </ReactTooltip>
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
                      data-for="vaildMaxClass"
                    >
                      <TextField
                        name="vaildMaxClass"
                        floatingLabelText={'Maximum samples per class'}
                        onChange={this.handleChange}
                        value={this.state.vaildMaxClass}
                        underlineFocusStyle={{
                          borderColor: muiStyle.palette.primary1Color,
                        }}
                      />
                    </div>
                    <ReactTooltip id="vaildMaxClass" place="bottom" effect="solid">
                      <p style={styles.tooltip}>{'You can choose to specify a maximum number of samples per class.'}</p>
                      <p style={styles.tooltip}>{'If a class has more samples than the specified amount extra samples will be ignored.'}</p>
                      <p style={styles.tooltip}>{'Leave blank to ignore this feature'}</p>
                    </ReactTooltip>
                  </div>
                </Col>
              </Row>
            </div>
          }
        </Card>
        <br />
        <Divider />
        <br />
        <div style={styles.actions}>
          <RaisedButton
            label={'create dataset'}
            backgroundColor={muiStyle.palette.primary1Color}
            labelColor={'white'}
            disabled={this.state.loadingCreate}
            onTouchTap={() => this.createApi()}
          />
        </div>
      </div>
    );
  }
}

export default translate('')(Classification);
