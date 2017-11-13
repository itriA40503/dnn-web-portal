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

class Segmentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Segmentation',
      featureImageFolder: null,
      labelImageFolder: null,
      percentValid: null,
      validChecked: false,
      classLabels: null,
      colorMapSpec: 'From Label Image',
      colorMapFile: null,
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
  handleColorMapSpecChange = (event, index, value) => {
    this.setState({ colorMapSpec: value });
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
          <ReactTooltip id="percentValid" place="right" effect="solid">
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
          <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <Animated animationIn="rollIn" isVisible={true}>
              <ActionLabel color={muiStyle.palette.primary1Color} />
            </Animated>
          </div>
          <div
            style={{ display: 'inline-block', marginLeft: '3px' }}
            data-tip
            data-for="classLabels"
          >
            <TextField
              name="classLabels"
              floatingLabelText={'Class Labels (optional)'}
              onChange={this.handleChange}
              value={this.state.classLabels}
              underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
            />
            <ReactTooltip id="classLabels" place="right" effect="solid">
              <p style={styles.tooltip}>{'The "i"th line of the file should be give the string label associated'}</p>
              <p style={styles.tooltip}>{'with the "(i - 1)"th numeric label. (E.g. the string label for the numeric'}</p>
              <p style={styles.tooltip}>{'label 0 is supposed to be on line 1.)'}</p>
            </ReactTooltip>
          </div>
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
            data-for="colorMapSpec"
          >
            <SelectField
              name="colorMapSpec"
              floatingLabelText={'Color Map Specification'}
              onChange={this.handleColorMapSpecChange}
              value={this.state.colorMapSpec}
            >
              <MenuItem
                key={'From Label Image'}
                value={'From Label Image'}
                primaryText={'From Label Image'}
              />
              <MenuItem
                key={'From Text File'}
                value={'From Text File'}
                primaryText={'From Text File'}
              />
            </SelectField>
            <ReactTooltip id="colorMapSpec" place="right" effect="solid">
              <p style={styles.tooltip}>{'Specify how to map class IDs to colors. Select "From Label Image"'}</p>
              <p style={styles.tooltip}>{'to use palette or grayscale from label images. For RGB image labels,'}</p>
              <p style={styles.tooltip}>{'select "From Text File" and provide color map in separate text file.'}</p>
            </ReactTooltip>
          </div>
        </div>
        <div style={{ margin: '0px auto' }}>
          <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <Animated animationIn="rollIn" isVisible={true}>
              <ActionLabel color={this.state.colorMapSpec === 'From Label Image' ?
                muiStyle.palette.accent2Color : muiStyle.palette.primary1Color}
              />
            </Animated>
          </div>
          <div
            style={{ display: 'inline-block', marginLeft: '3px' }}
            data-tip
            data-for="colorMapFile"
          >
            <TextField
              name="colorMapFile"
              floatingLabelText={'Color Map File'}
              onChange={this.handleChange}
              value={this.state.colorMapFile}
              disabled={this.state.colorMapSpec === 'From Label Image'}
              underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
            />
            <ReactTooltip id="colorMapFile" place="right" effect="solid">
              <p style={styles.tooltip}>{'Specify color/class mappings through a text file. Each line in the file should'}</p>
              <p style={styles.tooltip}>{'contain three space-separated integer values, one for each of the Red, Green,'}</p>
              <p style={styles.tooltip}>{'Blue channels. The "i"the line of the file should give the color associated'}</p>
              <p style={styles.tooltip}>{'with the "(i - 1)"th class. (E.g. the color for class #0 is supposed to be on line 1.)'}</p>
            </ReactTooltip>
          </div>
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
              <p style={styles.tooltip}>{'Perform selected channel conversion. Label images are single'}</p>
              <p style={styles.tooltip}>{'channel and not affected by this parameter.'}</p>
            </ReactTooltip>
          </div>
        </div>
        <p style={{ fontSize: '14px' }}>{'Note: the recommended label encoding is PNG.'}</p>
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

export default translate('')(Segmentation);
