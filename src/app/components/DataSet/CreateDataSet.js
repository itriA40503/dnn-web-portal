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
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { sampleCrop, sampleFill, sampleSquash, sampleHalf } from '../../image/imageBase64';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Checkbox from 'material-ui/Checkbox';

const types = ['Classification', 'Object Detection', 'Processing', 'Segmentation', 'Other'];
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
};

class CreateDataSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,              // type of dataset
      name: null,              // name of dataset
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
  createApi = () => {
    console.log(this.state);
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
  handleTypeChange = (event, index, value) => {
    // console.log(event, index, value);
    this.setState({
      type: value,
    });
  }
  handleChange = (event, value) => this.setState({ [event.target.name]: value });
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
  renderSelectType = () => {
    return (
      <div>
        <SelectField
          floatingLabelText={'DataSet Type'}
          onChange={this.handleTypeChange}
          value={this.state.type}
        >
          {types.map(type => (
            <MenuItem
              key={type}
              value={type}
              primaryText={type}
            />
          ))}
        </SelectField>
      </div>
    );
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
  renderByType = (type) => {
    switch (type) {
      case 'Classification':
        return (<div>{this.renderCl()}</div>);
      case 'Object Detection':
        return (<div>{'Object Detection'}</div>);
      case 'Processing':
        return (<div>{'Processing'}</div>);
      case 'Segmentation':
        return (<div>{'Segmentation'}</div>);
      case 'Other':
        return (<div>{'Other'}</div>);
      default:
        return null;
    }
  }
  // render classification setting
  renderCl = () => {
    return (
      <div>
        <Row style={{ margin: '2px' }}>
          <Col>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
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
              </div>
            </div>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <TextField
                  style={{ width: 80 }}
                  underlineFocusStyle={{
                    borderColor: muiStyle.palette.primary1Color,
                  }}
                />
                {'X'}
                <TextField
                  style={{ width: 80 }}
                  underlineFocusStyle={{
                    borderColor: muiStyle.palette.primary1Color,
                  }}
                />
              </div>
            </div>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
                {this.renderSelectResize()}
              </div>
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
          <div style={{ display: 'inline-block', marginLeft: '3px' }}>
            <TextField
              name="trainPath"
              floatingLabelText={'Training Images path'}
              onChange={this.handleChange}
              value={this.state.trainPath}
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
              <div style={{ display: 'inline-block', marginLeft: '3px' }}>
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
            </div>
          </Col>
          <Col>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div style={{ display: 'inline-block', marginLeft: '3px' }}>
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
            </div>
          </Col>
        </Row>
        <Row style={{ margin: '2px' }}>
          { !this.state.vaildChecked &&
          <Col>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div style={{ display: 'inline-block', marginLeft: '3px' }}>
                <TextField
                  name="percentVaild"
                  floatingLabelText={'% for validation'}
                  onChange={this.handleChange}
                  value={this.state.percentVaild}
                  underlineFocusStyle={{
                    borderColor: muiStyle.palette.primary1Color,
                  }}
                />
              </div>
            </div>
          </Col>
          }
          { !this.state.testChecked &&
          <Col>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div style={{ display: 'inline-block', marginLeft: '3px' }}>
                <TextField
                  name="percentTest"
                  floatingLabelText={'% for testing'}
                  onChange={this.handleChange}
                  value={this.state.percentTest}
                  underlineFocusStyle={{
                    borderColor: muiStyle.palette.primary1Color,
                  }}
                />
              </div>
            </div>
          </Col>
          }
        </Row>
        <Divider />
        <Card>
          <Checkbox
            label="Separate testing images folder (option)"
            onCheck={() => this.checkSeparateTest()}
            checked={this.state.testChecked}
          />
          { this.state.testChecked &&
            <div>
              <div style={{ margin: '0px auto' }}>
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
                    <div style={{ display: 'inline-block', marginLeft: '3px' }}>
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
                  </div>
                </Col>
                <Col>
                  <div style={{ margin: '0px auto' }}>
                    <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                      <Animated animationIn="rollIn" isVisible={true}>
                        <ActionLabel color={muiStyle.palette.primary1Color} />
                      </Animated>
                    </div>
                    <div style={{ display: 'inline-block', marginLeft: '3px' }}>
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
            onCheck={() => this.checkSeparateVaild()}
            checked={this.state.vaildChecked}
          />
          { this.state.vaildChecked &&
            <div>
              <div style={{ margin: '0px auto' }}>
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
                    <div style={{ display: 'inline-block', marginLeft: '3px' }}>
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
                  </div>
                </Col>
                <Col>
                  <div style={{ margin: '0px auto' }}>
                    <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                      <Animated animationIn="rollIn" isVisible={true}>
                        <ActionLabel color={muiStyle.palette.primary1Color} />
                      </Animated>
                    </div>
                    <div style={{ display: 'inline-block', marginLeft: '3px' }}>
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
                  </div>
                </Col>
              </Row>
            </div>
          }
        </Card>
        <br />
      </div>
    );
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
        <CardTitle title={'CreateDataSet'} />
        <ExpandTransition open={true} >
          <div style={{ marginLeft: 50, marginRight: 50 }}>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div style={{ display: 'inline-block', marginLeft: '3px' }}>
                <TextField
                  name="name"
                  floatingLabelText={'DataSet Name'}
                  onChange={this.handleChange}
                  value={this.state.name}
                  underlineFocusStyle={{
                    borderColor: muiStyle.palette.primary1Color,
                  }}
                />
              </div>
            </div>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div style={{ display: 'inline-block', marginLeft: '3px' }}>
                {this.renderSelectType()}
              </div>
            </div>
            <Divider />
            {this.renderByType(this.state.type)}
          </div>
          <br />
          <CardActions style={styles.actions}>
            {
              this.state.type !== null &&
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

export default translate('')(CreateDataSet);
