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
import { Row, Col } from 'react-flexbox-grid';

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

class Other extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Other', // type of dataset
      trainImagesLMDB: null,
      trainLablesLMDB: null,
      validImagesLMDB: null,
      validLablesLMDB: null,
      enforceSameShape: null,
      meanImage: null,
    };
  }

  handleChange = (event, value) => this.setState({ [event.target.name]: value });

  handleEnforceSameShapeChange = (event, index, value) => {
    this.setState({
      enforceSameShape: value,
    });
  }

  createApi = () => {
    console.log(this.state);
    this.props.backReview();
  }
  render() {
    return (
      <div>
        <Row style={{ margin: '0px auto' }}>
          <Col>
            <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <Animated animationIn="rollIn" isVisible={true}>
                <ActionLabel color={muiStyle.palette.primary1Color} />
              </Animated>
            </div>
            <div style={{ display: 'inline-block', marginLeft: '3px' }} >
              <TextField
                name="trainImagesLMDB"
                floatingLabelText={'Training Images LMDB'}
                onChange={this.handleChange}
                value={this.state.trainImagesLMDB}
                underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
              />
            </div>
          </Col>
          <Col>
            <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <Animated animationIn="rollIn" isVisible={true}>
                <ActionLabel color={muiStyle.palette.primary1Color} />
              </Animated>
            </div>
            <div style={{ display: 'inline-block', marginLeft: '3px' }} >
              <TextField
                name="trainLablesLMDB"
                floatingLabelText={'Training Labels LMDB'}
                onChange={this.handleChange}
                value={this.state.trainLablesLMDB}
                underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
              />
            </div>
          </Col>
        </Row>
        <Row style={{ margin: '0px auto' }}>
          <Col>
            <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <Animated animationIn="rollIn" isVisible={true}>
                <ActionLabel color={muiStyle.palette.primary1Color} />
              </Animated>
            </div>
            <div style={{ display: 'inline-block', marginLeft: '3px' }} >
              <TextField
                name="validImagesLMDB"
                floatingLabelText={'Validation Images LMDB'}
                onChange={this.handleChange}
                value={this.state.validImagesLMDB}
                underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
              />
            </div>
          </Col>
          <Col>
            <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <Animated animationIn="rollIn" isVisible={true}>
                <ActionLabel color={muiStyle.palette.primary1Color} />
              </Animated>
            </div>
            <div style={{ display: 'inline-block', marginLeft: '3px' }} >
              <TextField
                name="validLablesLMDB"
                floatingLabelText={'Validation Labels LMDB'}
                onChange={this.handleChange}
                value={this.state.validLablesLMDB}
                underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
              />
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
            data-for="enforceSameShape"
          >
            <SelectField
              name="enforceSameShape"
              floatingLabelText={'Enforce Same Shape'}
              onChange={this.handleEnforceSameShapeChange}
              value={this.state.enforceSameShape}
            >
              <MenuItem
                key={'Yes'}
                value={'Yes'}
                primaryText={'Yes'}
              />
              <MenuItem
                key={'No'}
                value={'No'}
                primaryText={'No'}
              />
            </SelectField>
            <ReactTooltip id="enforceSameShape" place="right" effect="solid">
              <p style={styles.tooltip}>{'Check that each entry in the database has the same'}</p>
              <p style={styles.tooltip}>{'shape (can be time-consuming)'}</p>
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
            data-for="meanImage"
          >
            <TextField
              name="meanImage"
              floatingLabelText={'Mean Image'}
              onChange={this.handleChange}
              value={this.state.meanImage}
              underlineFocusStyle={{ borderColor: muiStyle.palette.primary1Color }}
            />
            <ReactTooltip id="meanImage" place="right" effect="solid">
              <p style={styles.tooltip}>{'Path to a .binaryproto file on the server'}</p>
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

export default translate('')(Other);
