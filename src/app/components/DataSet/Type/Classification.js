import React from 'react';
// i18n
import { translate } from 'react-i18next';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';
// ICON
import ActionLabel from 'material-ui/svg-icons/action/label';
// COLOR
import { muiStyle } from '../../../myTheme';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import { Card } from 'material-ui/Card';
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
      imgType: 'Color',        // type of image
      imgWidth: 256,           // width size of image
      imgHeight: 256,          // height size of image
      resize: null,            // resize transformation of image
      trainPath: null,         // training images path
      miniClass: 2,            // Minimum samples per class (train)
      maxClass: null,          // Maximum samples per class (train)
      percentValid: 25,        // % for validation
      percentTest: 0,          // % for testing
      validPath: null,         // validation images path
      validMiniClass: null,    // Minimum samples per class (validation)
      validMaxClass: null,     // Maximum samples per class (validation)
      validChecked: false,     // check Separate validation images folder
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
    const appendToReviewTable = this.props.toFakeData();
    appendToReviewTable({
      name: this.props.name,
      refs: '0',
      status: 1,
      createAt: new Date().toISOString(),
    });
    this.props.backReview();
  }
  checkSeparateTest = () => {
    this.setState({
      testChecked: !this.state.testChecked,
    });
  }
  checkSeparateValid = () => {
    this.setState({
      validChecked: !this.state.validChecked,
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
    const { imgType, imgWidth, imgHeight, resize } = this.state;
    const img = { imgType, imgWidth, imgHeight, resize };  
    const {
      trainPath,
      percentTest,
      percentValid,
      testChecked,
      validChecked,
      testPath,
      validPath,
    } = this.state;

    const examine = val => (val !== null && val !== '');
    const mutexTest = testChecked ? examine(testPath) : examine(percentTest);
    const mutexValid = validChecked ? examine(validPath) : examine(percentValid);

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
                  name={'imgWidth'}
                  onChange={this.handleChange}
                  value={this.state.imgWidth}
                  underlineFocusStyle={{
                    borderColor: muiStyle.palette.primary1Color,
                  }}
                />
                {' X '}
                <TextField
                  style={{ width: 50, marginLeft: '3px' }}
                  floatingLabelText={'Height'}
                  inputStyle={{ textAlign: 'center' }}
                  name={'imgHeight'}
                  onChange={this.handleChange}
                  value={this.state.imgHeight}
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
        {
          Object.values(img).every(examine) &&
          <div>
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
                  floatingLabelText={'Training Images Path'}
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
                      floatingLabelText={'Minimum Samples Per Class'}
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
                      floatingLabelText={'Maximum Samples Per Class'}
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
                      <ActionLabel color={this.state.validChecked ?
                        muiStyle.palette.accent2Color : muiStyle.palette.primary1Color}
                      />
                    </Animated>
                  </div>
                  <div
                    style={{ display: 'inline-block', marginLeft: '3px' }}
                    data-tip
                    data-for="percentValid"
                  >
                    <TextField
                      name="percentValid"
                      disabled={this.state.validChecked}
                      floatingLabelText={'% For Validation'}
                      onChange={this.handleChange}
                      value={this.state.checkSeparateValid ? null : this.state.percentValid}
                      underlineFocusStyle={{
                        borderColor: muiStyle.palette.primary1Color,
                      }}
                    />
                  </div>
                  <ReactTooltip id="percentValid" place="bottom" effect="solid">
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
                      floatingLabelText={'% For Testing'}
                      onChange={this.handleChange}
                      value={this.state.checkSeparateTest ? null : this.state.percentTest}
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
                label="Separate Testing Images Folder (option)"
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
                        floatingLabelText={'Test Images Path'}
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
                            floatingLabelText={'Minimum Samples Per Class'}
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
                            floatingLabelText={'Maximum Samples Per Class'}
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
                label="Separate Validation Images Folder (option)"
                labelStyle={{ fontSize: '16px' }}
                style={{ padding: '10px 10px' }}
                onCheck={() => this.checkSeparateValid()}
                checked={this.state.validChecked}
              />
              { this.state.validChecked &&
                <div style={{ margin: '20px' }}>
                  <div style={{ margin: '0px 2px' }}>
                    <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                      <Animated animationIn="rollIn" isVisible={true}>
                        <ActionLabel color={muiStyle.palette.primary1Color} />
                      </Animated>
                    </div>
                    <div style={{ display: 'inline-block', marginLeft: '3px' }}>
                      <TextField
                        name="validPath"
                        floatingLabelText={'Validation Images Path'}
                        onChange={this.handleChange}
                        value={this.state.validPath}
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
                          data-for="validMiniClass"
                        >
                          <TextField
                            name="validMiniClass"
                            floatingLabelText={'Minimum Samples Per Class'}
                            onChange={this.handleChange}
                            value={this.state.validMiniClass}
                            underlineFocusStyle={{
                              borderColor: muiStyle.palette.primary1Color,
                            }}
                          />
                        </div>
                        <ReactTooltip id="validMiniClass" place="bottom" effect="solid">
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
                          data-for="validMaxClass"
                        >
                          <TextField
                            name="validMaxClass"
                            floatingLabelText={'Maximum Samples Per Class'}
                            onChange={this.handleChange}
                            value={this.state.validMaxClass}
                            underlineFocusStyle={{
                              borderColor: muiStyle.palette.primary1Color,
                            }}
                          />
                        </div>
                        <ReactTooltip id="validMaxClass" place="bottom" effect="solid">
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
            {
              examine(trainPath) && mutexTest && mutexValid &&
              <div style={styles.actions}>
                <RaisedButton
                  label={'create dataset'}
                  backgroundColor={muiStyle.palette.primary1Color}
                  labelColor={'white'}
                  disabled={this.state.loadingCreate}
                  onTouchTap={() => this.createApi()}
                />
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

export default translate('')(Classification);
