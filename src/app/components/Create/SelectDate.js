import React from 'react';
import moment from 'moment';
// i18n
import { translate } from 'react-i18next';
// GA
import ReactGA from 'react-ga';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { errorNotify } from '../../redux/Notify/actionNotify';
import { getCreateStartDateData, getCreateEndDateData } from '../../redux/CreateData/actionCreateData';
// ICON
import ActionLabel from 'material-ui/svg-icons/action/label';
// COLOR
import { muiStyle } from '../../myTheme';

import DatePicker from 'material-ui/DatePicker';
import ReviewCalendar from '../ReviewCalendar/ReviewCalendar';
import ReactTooltip from 'react-tooltip';
import Hints from '../CreatePage/Hints';

class SelectDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(moment().format('YYYY-MM-DD')),
      endDate: null,
    };
    this.props.someActions.getCreateStartDateData(new Date(moment().format('YYYY-MM-DD')));
  }
  disableStartDate = date => moment(date).isBefore(moment().add(-1, 'days'));
  disableEndDate = date =>
    moment(date).isBefore(moment(this.state.startDate).add(-1, 'days')) ||
    moment(date).isAfter(moment(this.state.startDate).add(1, 'month'));
  handleChangeStartDate = (event, date) => {
    this.setState({
      startDate: date,
      increaseDay: moment(this.state.endDate).diff(moment(date), 'days'),
    });
    this.props.someActions.getCreateStartDateData(new Date(moment(date).format('YYYY-MM-DD')));
    //  GA
    ReactGA.event({
      category: 'CreatePage',
      action: 'selectStartDate',
      label: moment(date).format('YYYY-MM-DD'),
    });
  };
  handleChangeEndDate = (event, date) => {
    const startDate = moment(this.state.startDate).format('YYYY-MM-DD');
    const endDate = moment(date).format('YYYY-MM-DD');
    this.setState({
      endDate: date,
      increaseDay: moment(endDate).diff(moment(startDate), 'days'),
    });
    this.props.someActions.getCreateEndDateData(new Date(moment(date).format('YYYY-MM-DD')));
    // GA
    ReactGA.event({
      category: 'CreatePage',
      action: 'selectEndDate',
      label: endDate,
    });

    if (this.props.createData.machineId) this.props.blocking(false);
  };
  render() {
    const { t } = this.props;
    return (
      <div>
        <div style={{ margin: '0px auto' }}>
          <div style={{ display: 'inline-block' }}>
            <div>
              <div style={{ margin: '0px auto' }}>
                <div style={{ display: 'inline-block' }}>
                  <Animated animationInDelay={0.8} animationIn="rollIn" isVisible={true}>
                    <ActionLabel color={muiStyle.palette.primary1Color} />
                  </Animated>
                </div>
                <div style={{ display: 'inline-block', marginLeft: '3px' }}>
                  <DatePicker
                    autoOk={true}
                    floatingLabelText={t('common:startDate')}
                    shouldDisableDate={this.disableStartDate}
                    onChange={this.handleChangeStartDate}
                    value={this.state.startDate}
                    data-tip
                    data-for="click"
                  />
                  <ReactTooltip id="click" place="left" effect="solid">
                    <span>{t('common:clickEdit')}</span>
                  </ReactTooltip>
                </div>
              </div>
              <div style={{ margin: '0px auto' }}>
                <div style={{ display: 'inline-block' }}>
                  <Animated animationInDelay={0.8} animationIn="rollIn" isVisible={true}>
                    <ActionLabel color={muiStyle.palette.primary1Color} />
                  </Animated>
                </div>
                <div style={{ display: 'inline-block', marginLeft: '3px' }}>
                  <Animated animationInDelay={0.8} animationIn="flash" isVisible={true}>
                    <DatePicker
                      autoOk={true}
                      floatingLabelText={t('common:endDate')}
                      onChange={this.handleChangeEndDate}
                      value={this.state.endDate}
                      shouldDisableDate={this.disableEndDate}
                      data-tip
                      data-for="click"
                    />
                  </Animated>
                  <ReactTooltip id="click" place="left" effect="solid">
                    <span>{t('common:clickEdit')}</span>
                  </ReactTooltip>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'inline-block' }}>
            <Hints
              increaseDay={this.state.increaseDay}
            />
          </div>
        </div>
        <ReviewCalendar />
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return {
    dispatch,
    someActions: bindActionCreators({
      errorNotify,
      getCreateStartDateData,
      getCreateEndDateData,
    }, dispatch) };
}

function mapStateToProps(state) {
  return {
    createData: state.createData,
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(translate('')(SelectDate));
