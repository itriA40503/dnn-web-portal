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
import Classification from './Type/Classification';


const types = ['Classification', 'Object Detection', 'Processing', 'Segmentation', 'Other'];
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
  renderByType = (type) => {
    switch (type) {
      case 'Classification':
        return (<div><Classification backReview={this.props.backReview} /></div>);
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

export default translate('')(CreateDataSet);
