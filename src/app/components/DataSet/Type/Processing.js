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
import { Row, Col } from 'react-flexbox-grid';
import ReactTooltip from 'react-tooltip';
import Checkbox from 'material-ui/Checkbox';

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

class Processing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Processing',
      featureImageFolder: null,
      labelImageFolder: null,
      percentValid: null,
      validChecked: false,
      channelCvt: null,
    };
  }
  handleChange = (event, value) => this.setState({ [event.target.name]: value });
  createApi = () => {
    console.log(this.state);
    this.props.backReview();
  }
  checkSeparateValid = () => {
    this.setState({
      validChecked: !this.state.validChecked,
    });
  }
  handleImgTypeChange = (event, index, value) => {
    // console.log(event, index, value);
    this.setState({ channelCvt: value });
  }
  render() {
    return (
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
            data-for="featureImageFolder"
          >
            <TextField
              name="featureImageFolder"
              floatingLabelText={'Feature Image Folder'}
              onChange={this.handleChange}
              value={this.state.featureImageFolder}
              underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
            />
            <ReactTooltip id="featureImageFolder" place="right" effect="solid">
              <p style={styles.tooltip}>{'Indicate a folder full of images.'}</p>
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
            data-for="labelImageFolder"
          >
            <TextField
              name="labelImageFolder"
              floatingLabelText={'Label Image Folder'}
              onChange={this.handleChange}
              value={this.state.labelImageFolder}
              underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
            />
            <ReactTooltip id="labelImageFolder" place="right" effect="solid">
              <p style={styles.tooltip}>{'Indicate a foldr full of images. For each image in the feature image'}</p>
              <p style={styles.tooltip}>{'folder there must be one corresponding image in the label image'}</p>
              <p style={styles.tooltip}>{'folder. The label image must have the same filename except for'}</p>
              <p style={styles.tooltip}>{'the extension, which may differ.'}</p>
            </ReactTooltip>
          </div>
        </div>
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
              value={this.state.percentValid}
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

        <br />
        <Card>
          <Checkbox
            label="Separate Validation Images"
            labelStyle={{ fontSize: '16px' }}
            style={{ padding: '10px 10px' }}
            onCheck={() => this.checkSeparateValid()}
            checked={this.state.validChecked}
          />
          { this.state.validChecked &&
            <div style={{ margin: '10px 20px' }}>
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
                        floatingLabelText={'Validation Feature Image Folder'}
                        onChange={this.handleChange}
                        value={this.state.testMiniClass}
                        underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
                      />
                    </div>
                    <ReactTooltip id="testMiniClass" place="bottom" effect="solid">
                      <p style={styles.tooltip}>{'Indicate a folder full of images.'}</p>
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
                        floatingLabelText={'Validation Label Image Folder'}
                        onChange={this.handleChange}
                        value={this.state.testMaxClass}
                        underlineFocusStyle={{
                          borderColor: muiStyle.palette.primary1Color,
                        }}
                      />
                    </div>
                    <ReactTooltip id="testMaxClass" place="bottom" effect="solid">
                      <p style={styles.tooltip}>{'Indicate a folder full of images. For each image in the feature image'}</p>
                      <p style={styles.tooltip}>{'folder there must be one corresponding image in the label image folder.'}</p>
                      <p style={styles.tooltip}>{'The label image must have the same filename except for the extension,'}</p>
                      <p style={styles.tooltip}>{'which may differ.'}</p>
                    </ReactTooltip>
                  </div>
                </Col>
              </Row>
            </div>
          }
        </Card>

        <div style={{ margin: '0px auto' }}>
          <div style={{ display: 'inline-block', verticalAlign: 'super', position: 'relative', top: '-10px' }}>
            <Animated animationIn="rollIn" isVisible={true}>
              <ActionLabel color={muiStyle.palette.primary1Color} />
            </Animated>
          </div>
          <div
            style={{ display: 'inline-block', verticalAlign: 'super', marginLeft: '3px' }}
            data-tip
            data-for="channelCvt"
          >
            <SelectField
              name="channelCvt"
              floatingLabelText={'Channel Conversion'}
              onChange={this.handleImgTypeChange}
              value={this.state.channelCvt}
            >
              <MenuItem
                key={'RGB'}
                value={'RGB'}
                primaryText={'RGB'}
              />
              <MenuItem
                key={'Grayscale'}
                value={'Grayscale'}
                primaryText={'Grayscale'}
              />
              <MenuItem
                key={'None'}
                value={'None'}
                primaryText={'None'}
              />
            </SelectField>
            <ReactTooltip id="channelCvt" place="right" effect="solid">
              <p style={styles.tooltip}>{'Perform selected channel conversion.'}</p>
            </ReactTooltip>
          </div>
        </div>

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

export default translate('')(Processing);
