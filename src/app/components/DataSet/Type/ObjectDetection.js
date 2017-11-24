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
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ReactTooltip from 'react-tooltip';

const styles = {
  actions: {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
    right: '10px',
    margin: '0px auto',
  },
  explanation: {
    margin: '0px auto',
    position: 'relative',
    top: '15px',
    paddingBottom: '3px',
    fontSize: '16px',
  },
  tooltip: {
    margin: '0px auto',
    fontSize: '14px',
  },
};

class ObjectDetection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Object Detection', // type of dataset
      trainImageFolder: null,   // training image folder
      trainLabelFolder: null,   // training label folder
      validImageFolder: null,   // validation image folder
      validLabelFolder: null,   // validation label folder
      padImageWidth: null,      // pad image width
      padImageHeight: null,     // pad image height
      resizeImageWidth: null,   // resize image width
      resizeImageHeight: null,  // resize image heigth
      channelCvt: null,         // channel conversion
      minBoxSize: 25,           // minimum box size (in pixels) for validation set
      customClass: null,        // custom classes
    };
  }
  handleChange = (event, value) => this.setState({ [event.target.name]: value });
  createApi = () => {
    console.log(this.state);
    this.props.backReview();
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
          <div style={{ display: 'inline-block', marginLeft: '3px' }}>
            <p style={styles.explanation}>
              {'Images can be stored in any of the supported file formats (png / jpg / jpeg / bmp / ppm).'}
            </p>
            <div
              style={{ display: 'inline-block', marginLeft: '3px' }}
              data-tip
              data-for="trainImageFolder"
            >
              <TextField
                name="trainImageFolder"
                floatingLabelText={'Training Image Folder'}
                onChange={this.handleChange}
                value={this.state.trainImageFolder}
                underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
              />
              <ReactTooltip id="trainImageFolder" place="right" effect="solid">
                <p style={styles.tooltip}>{'Indicate a folder of images to use for training.'}</p>
              </ReactTooltip>
            </div>
          </div>
        </div>
        <div style={{ margin: '0px auto' }}>
          <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <Animated animationIn="rollIn" isVisible={true}>
              <ActionLabel color={muiStyle.palette.primary1Color} />
            </Animated>
          </div>
          <div style={{ display: 'inline-block', marginLeft: '3px' }}>
            <p style={styles.explanation}>
              {'Label files are expected to have the .txt extension. For example if an image file is named'}
            </p>
            <p style={styles.explanation}>
              {'foo.png the corresponding label file should be foo.txt.'}
            </p>
            <div
              style={{ display: 'inline-block', marginLeft: '3px' }}
              data-tip
              data-for="trainLabelFolder"
            >
              <TextField
                name="trainLabelFolder"
                floatingLabelText={'Training Label Folder'}
                onChange={this.handleChange}
                value={this.state.trainLabelFolder}
                underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
              />
              <ReactTooltip id="trainLabelFolder" place="right" effect="solid">
                <p style={styles.tooltip}>{'Indicate a folder of training labels.'}</p>
              </ReactTooltip>
            </div>
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
            data-for="validImageFolder"
          >
            <TextField
              name="validImageFolder"
              floatingLabelText={'Validation Image Folder'}
              onChange={this.handleChange}
              value={this.state.validImageFolder}
              underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
            />
            <ReactTooltip id="validImageFolder" place="right" effect="solid">
              <p style={styles.tooltip}>{'Indicate a folder of images to use for training.'}</p>
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
            data-for="validLabelFolder"
          >
            <TextField
              name="validLabelFolder"
              floatingLabelText={'Validation Label Folder'}
              onChange={this.handleChange}
              value={this.state.validLabelFolder}
              underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
            />
            <ReactTooltip id="validLabelFolder" place="right" effect="solid">
              <p style={styles.tooltip}>{'Indicate a folder of validation labels.'}</p>
            </ReactTooltip>
          </div>
        </div>

        <div style={{ margin: '0px auto' }}>
          <div style={{ display: 'inline-block', verticalAlign: 'bottom', position: 'relative', top: '-6px' }}>
            <Animated animationIn="rollIn" isVisible={true}>
              <ActionLabel color={muiStyle.palette.primary1Color} />
            </Animated>
          </div>
          <div
            style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '3px' }}
            data-tip
            data-for="padImage"
          >
            <TextField
              style={{ width: 140, marginRight: '3px' }}
              floatingLabelText={'Pad Image Width'}
              inputStyle={{ textAlign: 'center' }}
              underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
            />
            {' X '}
            <TextField
              style={{ width: 140, marginLeft: '3px' }}
              floatingLabelText={'Pad Image Height'}
              inputStyle={{ textAlign: 'center' }}
              underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
            />
          </div>
          <ReactTooltip id="padImage" place="right" effect="solid">
            <p style={styles.tooltip}>{'If specified, input images will be padded to that dimension.'}</p>
            <p style={styles.tooltip}>{'Pad dimensions should be greater than those of input images.'}</p>
          </ReactTooltip>
        </div>

        <div style={{ margin: '0px auto' }}>
          <div style={{ display: 'inline-block', verticalAlign: 'bottom', position: 'relative', top: '-6px' }}>
            <Animated animationIn="rollIn" isVisible={true}>
              <ActionLabel color={muiStyle.palette.primary1Color} />
            </Animated>
          </div>
          <div
            style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '3px' }}
            data-tip
            data-for="resizeImage"
          >
            <TextField
              style={{ width: 150, marginRight: '3px' }}
              floatingLabelText={'Resize Image Width'}
              inputStyle={{ textAlign: 'center' }}
              underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
            />
            {' X '}
            <TextField
              style={{ width: 150, marginLeft: '3px' }}
              floatingLabelText={'Resize Image Height'}
              inputStyle={{ textAlign: 'center' }}
              underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
            />
          </div>
          <ReactTooltip id="resizeImage" place="right" effect="solid">
            <p style={styles.tooltip}>{'If specified, input images will be squashed to that'}</p>
            <p style={styles.tooltip}>{'dimension after padding.'}</p>
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

        <div style={{ margin: '0px auto' }}>
          <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <Animated animationIn="rollIn" isVisible={true}>
              <ActionLabel color={muiStyle.palette.primary1Color} />
            </Animated>
          </div>
          <div
            style={{ display: 'inline-block', marginLeft: '3px' }}
            data-tip
            data-for="minBoxSize"
          >
            <TextField
              name="minBoxSize"
              value={this.state.minBoxSize}
              floatingLabelText={'Minimum Box Size'}
              onChange={this.handleChange}
              underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
            />
            <ReactTooltip id="minBoxSize" place="right" effect="solid">
              <p style={styles.tooltip}>{'Retain only the boxes that are larger than the specified value in'}</p>
              <p style={styles.tooltip}>{'both dimensions. This only affects objects in the validation set.'}</p>
              <p style={styles.tooltip}>{'Enter 0 to disable this threshold.'}</p>
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
            data-for="customClass"
          >
            <TextField
              name="customClass"
              value={this.state.customClass}
              floatingLabelText={'Custom Classes'}
              onChange={this.handleChange}
              underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
            />
            <ReactTooltip id="customClass" place="right" effect="solid">
              <p style={styles.tooltip}>{'Enter a comma-separated list of class names. Class IDs are assigned'}</p>
              <p style={styles.tooltip}>{'sequentially,starting from 0. Unmapped class names automatically map'}</p>
              <p style={styles.tooltip}>{'to 0. Leave this field blank to use default calss mappings.'}</p>
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

export default translate('')(ObjectDetection);
