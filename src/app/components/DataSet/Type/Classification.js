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
import { isNonEmpty, isLessThan, all, isPositive } from '../../../utils/Validation';

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
  step: {
    textAlign: 'right',
    margin: 0,
    paddingTop: '5px',
    color: muiStyle.palette.primary1Color,
    fontWeight: 'bold',
    fontSize: '20px',
  },
  errorMessage: {
    color: muiStyle.palette.accent2Color,
    margin: '10px 30px',
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
    // const appendToReviewTable = this.props.toFakeData();
    const newData = {
      name: this.props.name,
      refs: '0',
      status: 1,
      createAt: new Date().toISOString(),
    };
    this.props.toFakeData(newData);
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
    const isAllNonEmpty = all(isNonEmpty);
    const maxLessThanMin = (a, b) => isAllNonEmpty(a, b) && isLessThan(a, b);
    const isNonPositive = v => (isNonEmpty(v) ? (!isPositive(v)) : false);
    const mutexTest = this.state.testChecked ?
      isNonEmpty(this.state.testPath) : isNonEmpty(this.state.percentTest);
    const mutexValid = this.state.validChecked ?
      isNonEmpty(this.state.validPath) : isNonEmpty(this.state.percentValid);
    return (
      <div>
        <p style={styles.step}>{'step - 2'}</p>
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
              <div style={
                  {
                    display: 'inline-block',
                    verticalAlign: 'super',
                    position: 'relative',
                    top: '-10px',
                  }
                }
              >
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
          Object.values(img).every(isNonEmpty) &&
          <div>
            <p style={styles.step}>{'step - 3'}</p>
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
                      <ActionLabel
                        color={
                          maxLessThanMin(this.state.miniClass, this.state.maxClass) ||
                            isNonPositive(this.state.miniClass) ?
                            muiStyle.palette.accent2Color : muiStyle.palette.primary1Color
                        }
                      />
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
                      errorText={
                        maxLessThanMin(this.state.miniClass, this.state.maxClass) ||
                          isNonPositive(this.state.miniClass) ? ' ' : null
                      }
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
                      <ActionLabel
                        color={
                          maxLessThanMin(this.state.miniClass, this.state.maxClass) ||
                            isNonPositive(this.state.maxClass) ?
                            muiStyle.palette.accent2Color : muiStyle.palette.primary1Color
                        }
                      />
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
                      errorText={
                        maxLessThanMin(this.state.miniClass, this.state.maxClass) ||
                          isNonPositive(this.state.maxClass) ? ' ' : null
                      }
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
              {
                maxLessThanMin(this.state.miniClass, this.state.maxClass) &&
                <p style={styles.errorMessage}>
                  {'"Maximum Samples Per Class" field must be greater than or equal to "Minimum Samples Per Class"'}
                </p>
              }
              {
                (isNonPositive(this.state.miniClass) || isNonPositive(this.state.maxClass)) &&
                <p style={styles.errorMessage}>
                  {'We only support the value which must be at least 1'}
                </p>
              }
            </Row>
            <Row style={{ margin: '2px' }}>
              <Col>
                <div style={{ margin: '0px auto' }}>
                  <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <Animated animationIn="rollIn" isVisible={true}>
                      <ActionLabel
                        color={muiStyle.palette.primary1Color}
                        style={
                          this.state.validChecked ? { opacity: 0.5 } : { opacity: 1 }
                        }
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
                      value={this.state.validChecked ? '' : this.state.percentValid}
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
                      <ActionLabel
                        color={muiStyle.palette.primary1Color}
                        style={
                          this.state.testChecked ? { opacity: 0.5 } : { opacity: 1 }
                        }
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
                      value={this.state.testChecked ? '' : this.state.percentTest}
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
                            <ActionLabel
                              color={
                                maxLessThanMin(this.state.testMiniClass, this.state.testMaxClass) ||
                                  isNonPositive(this.state.testMiniClass) ?
                                  muiStyle.palette.accent2Color : muiStyle.palette.primary1Color
                              }
                            />
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
                            errorText={
                              maxLessThanMin(this.state.testMiniClass, this.state.testMaxClass) ||
                                isNonPositive(this.state.testMiniClass) ? ' ' : null
                            }
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
                            <ActionLabel
                              color={
                                maxLessThanMin(this.state.testMiniClass, this.state.testMaxClass) ||
                                  isNonPositive(this.state.testMaxClass) ?
                                  muiStyle.palette.accent2Color : muiStyle.palette.primary1Color
                              }
                            />
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
                            errorText={
                              maxLessThanMin(this.state.testMiniClass, this.state.testMaxClass) ||
                                isNonPositive(this.state.testMaxClass) ? ' ' : null
                            }
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
                    {
                      maxLessThanMin(this.state.testMiniClass, this.state.testMaxClass) &&
                      <p style={styles.errorMessage}>
                        {'"Maximum Samples Per Class" field must be greater than or equal to "Minimum Samples Per Class"'}
                      </p>
                    }
                    {
                      (isNonPositive(this.state.testMiniClass) || isNonPositive(this.state.testMaxClass)) &&
                      <p style={styles.errorMessage}>
                        {'We only support the value which must be at least 1'}
                      </p>
                    }
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
                            <ActionLabel
                              color={
                                maxLessThanMin(this.state.validMiniClass, this.state.validMaxClass) ||
                                  isNonPositive(this.state.validMiniClass) ?
                                  muiStyle.palette.accent2Color : muiStyle.palette.primary1Color
                              }
                            />
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
                            errorText={
                              maxLessThanMin(this.state.validMiniClass, this.state.validMaxClass) ||
                                isNonPositive(this.state.validMiniClass) ? ' ' : null
                            }
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
                            <ActionLabel
                              color={
                                maxLessThanMin(this.state.validMiniClass, this.state.validMaxClass) ||
                                  isNonPositive(this.state.validMaxClass) ?
                                  muiStyle.palette.accent2Color : muiStyle.palette.primary1Color
                              }
                            />
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
                            errorText={
                              maxLessThanMin(this.state.validMiniClass, this.state.validMaxClass) ||
                                isNonPositive(this.state.validMaxClass) ? ' ' : null
                            }
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
                    {
                      maxLessThanMin(this.state.validMiniClass, this.state.validMaxClass) &&
                      <p style={styles.errorMessage}>
                        {'"Maximum Samples Per Class" field must be greater than or equal to "Minimum Samples Per Class"'}
                      </p>
                    }
                    {
                      (isNonPositive(this.state.validMiniClass) || isNonPositive(this.state.validMaxClass)) &&
                      <p style={styles.errorMessage}>
                        {'We only support the value which must be at least 1'}
                      </p>
                    }
                  </Row>
                </div>
              }
            </Card>
            <br />
            <br />
            <Divider />
            <br />
            {
              <div style={styles.actions}>
                <RaisedButton
                  label={'create dataset'}
                  backgroundColor={muiStyle.palette.primary1Color}
                  labelColor={'white'}
                  disabled={
                    !(
                      isNonEmpty(this.state.trainPath) &&
                      mutexTest &&
                      mutexValid
                    ) ||
                    maxLessThanMin(this.state.miniClass, this.state.maxClass) ||
                    isNonPositive(this.state.miniClass) ||
                    isNonPositive(this.state.maxClass) ||
                    this.state.loadingCreate
                  }
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
