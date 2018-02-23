
import React from 'react';

// Datatime Format
import moment from 'moment';

// i18n
import { translate } from 'react-i18next';

// GA
import ReactGA from 'react-ga';

// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';

// Theme
import { muiStyle, muiTheme } from '../../myTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Tooltip
import ReactTooltip from 'react-tooltip';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { errorNotify, copyNotify } from '../../redux/Notify/actionNotify';
// Material UI
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardTitle, CardText, CardActions } from 'material-ui/Card';
// Material UI Color
import { white } from 'material-ui/styles/colors';
// Material UI Internal
import ExpandTransition from 'material-ui/internal/ExpandTransition';
// Material UI ICON
import ImageViewComfy from 'material-ui/svg-icons/image/view-comfy';
import CommunicationContactMail from 'material-ui/svg-icons/communication/contact-mail';
// Resource & API
import { serviceEmail } from '../../resource';
// Other Components
import SelectResource from './SelectResource';
import SelectDate from './SelectDate';
import SelectImage from './SelectImage';
import ConfirmPage from './ConfirmPage';

// Never be Changed
const prevBoundary = 0;

class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      loadingCreate: false,
      loading: false,
      nextBlocking: false,  // next button
      startDate: null,
      endDate: null,
      imageId: null,
      machineId: null,
    };
  }

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <SelectResource
              token={this.props.token}
              blocking={flag => this.setState({ nextBlocking: flag })}
            />
          </div>
        );
      case 1:
        return (
          <div>
            <SelectDate />
          </div>
        );
      case 2:
        return (
          <div>
            <SelectImage />
          </div>
        );
      case 3:
        return (
          <div>
            <ConfirmPage />
          </div>
        );
      default:
        return (
          <span>
            {'You\'re a long way from home sonny jim!'}
          </span>
        );
    }
  }

  dummyAsync = (cb) => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 450);
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() =>
        this.setState({
          loading: false,
          stepIndex: stepIndex - 1,
        }));
    }
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    if (!this.state.loading) {
      if (stepIndex === 3) {
        this.setState({ loadingCreate: true });
      } else {
        this.dummyAsync(() =>
          this.setState({
            loading: false,
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 3,
          }));
      }
    }
  }

  renderContent = () => {
    const { stepIndex } = this.state;
    const contentStyle = { margin: '0 16px', overflow: 'hidden' };
    const { t } = this.props;

    return (
      <div style={contentStyle}>
        <div>
          {this.getStepContent(stepIndex)}
        </div>
        <div style={{ marginTop: 24, marginBottom: 12, textAlign: 'right' }}>
          <FlatButton
            label={t('common:createProc.back')}
            disabled={stepIndex === prevBoundary || this.state.loadingCreate}
            onTouchTap={this.handlePrev}
            style={{ marginRight: 12 }}
          />
          <RaisedButton
            label={stepIndex === 3 ? (t('common:createProc.create')) : (t('common:createProc.next'))}
            backgroundColor={muiStyle.palette.primary1Color}
            labelColor={white}
            disabled={this.state.nextBlocking || this.state.loadingCreate}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    );
  }

  render() {
    const {
      loading,
      loadingCreate,
      finished,
      stepIndex,
    } = this.state;
    const { t } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Animated animationIn="slideInDown" animationOut="slideOutUp" isVisible={true}>
          <Card>
            <CardActions
              style={{
                zIndex: 2,
                display: 'inline-block',
                float: 'right',
                right: '10px',
              }}
            >
              <FlatButton
                label={t('common:specialOrder')}
                style={
                  finished ? (
                    { color: 'white' }
                  ) : (
                    { color: muiStyle.palette.primary1Color }
                  )
                }
                icon={<CommunicationContactMail />}
                disabled={finished}
                href={`mailto:${serviceEmail}`}
                data-tip
                data-for="mailto"
              />
              <ReactTooltip id="mailto" place="bottom" effect="solid">
                <span>{t('common:mailto')}</span>
              </ReactTooltip>
              <FlatButton
                label={t('common:backReview')}
                style={loadingCreate ? ({ color: 'white' }) : ({ color: muiStyle.palette.primary1Color })}
                icon={<ImageViewComfy />}
                disabled={loadingCreate}
                onTouchTap={this.props.switchReview}
              />
              <FlatButton
                label={t('common:backReview')}
                style={!finished ? ({ display: 'none' }) : ({ color: muiStyle.palette.primary1Color })}
                icon={<ImageViewComfy />}
                disabled={!finished}
                onTouchTap={this.CreateDone}
              />
            </CardActions>
            <CardTitle title={t('common:create')} />
            <div style={{ width: '100%', maxWidth: '55%', margin: 'auto' }}>
              <Stepper activeStep={stepIndex}>
                <Step>
                  <StepLabel>{t('common:createProc.proc1')}</StepLabel>
                </Step>
                <Step>
                  <StepLabel>{t('common:createProc.proc2')}</StepLabel>
                </Step>
                <Step>
                  <StepLabel>{t('common:createProc.proc3')}</StepLabel>
                </Step>
                <Step>
                  <StepLabel>{t('common:createProc.proc4')}</StepLabel>
                </Step>
              </Stepper>
              <ExpandTransition loading={loading} open={true}>
                {this.renderContent()}
              </ExpandTransition>
            </div>
          </Card>
        </Animated>
      </MuiThemeProvider>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ errorNotify, copyNotify }, dispatch);
}

export default connect(null, matchDispatchToProps)(translate('')(CreatePage));

