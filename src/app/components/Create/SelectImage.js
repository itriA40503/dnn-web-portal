import React from 'react';
// i18n
import { translate } from 'react-i18next';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { errorNotify } from '../../redux/Notify/actionNotify';
import { getCreateImagesData, getCreateImageIdData } from '../../redux/CreateData/actionCreateData';
// Material UI ICON
import ActionLabel from 'material-ui/svg-icons/action/label';
// API
import { getImages } from '../../resource';
// COLOR
import { muiStyle } from '../../myTheme';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class selectImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    getImages(this.props.dispatch, localStorage.getItem('token'));
    this.props.someActions.getCreateImageIdData(this.props.createData.images[0].id);
  }
  imageSelect = (event, index, value) => {
    this.setState({ value });
    this.props.someActions.getCreateImageIdData(this.props.createData.images[value].id);
  }
  render() {
    const { t } = this.props;
    return (
      <div>
        <div style={{ margin: '0px auto' }}>
          <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
            <Animated animationIn="rollIn" isVisible={true}>
              <ActionLabel color={muiStyle.palette.primary1Color} />
            </Animated>
          </div>
          <div style={{ display: 'inline-block' }}>
            <SelectField
              floatingLabelText={'Image'}
              onChange={this.imageSelect}
              value={this.state.value}
            >
              {this.props.createData.images.map((image, index) => (
                <MenuItem
                  key={image.id}
                  value={index}
                  primaryText={image.name}
                />
              ))}
            </SelectField>
          </div>
        </div>
        <br />
        <div style={{ margin: '5px' }}>
          <Card>
            <CardHeader
              subtitle={
                <p>
                  {this.props.createData.images[this.state.value].name}
                  {'    ' + t('common:imageDesc')}
                </p>
              }
            />
            <CardText>{
              this.props.createData.images[this.state.value].description ?
                this.props.createData.images[this.state.value].description : 'No description'
            }</CardText>
          </Card>
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return {
    dispatch,
    someActions: bindActionCreators({
      errorNotify,
      getCreateImagesData,
      getCreateImageIdData,
    }, dispatch) };
}

function mapStateToProps(state) {
  return {
    createData: state.createData,
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(translate('')(selectImage));
