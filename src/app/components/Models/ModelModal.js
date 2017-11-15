import React from 'react';
// GA
import ReactGA from 'react-ga';
// i18n
import { translate } from 'react-i18next';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ReactTooltip from 'react-tooltip';

// ICON
import ActionToc from 'material-ui/svg-icons/action/toc';

// COLOR
import { muiTheme } from '../../myTheme';

import { copyNotify } from '../../redux/Notify/actionNotify';

class ModelModal extends React.Component {
  static propTypes = {
    /**
    the instance information
    */
    data: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
    // GA
    // ReactGA.event({
    //   category: 'DetailModal',
    //   action: 'open',
    //   label: this.props.data.id,
    // });
  }

  handleClose = () => {
    this.setState({ open: false });
    // GA
    // ReactGA.event({
    //   category: 'DetailModal',
    //   action: 'close',
    //   label: this.props.data.id,
    // });
  }

  render() {
    const { t } = this.props;
    const optionsStyle = {
      marginRight: 'auto',
    };
    return (
      <div>
        <FlatButton
          data-tip
          data-for="detail"
          labelPosition="before"
          icon={<ActionToc />}
          onTouchTap={this.handleOpen}
        />
        <ReactTooltip id="detail" place="bottom" effect="solid">
          <span>{t('common:detail')}</span>
        </ReactTooltip>
        <Dialog
          title={
            <div>
              <b>{this.props.data.name}</b>
            </div>
          }
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent
          contentStyle={{ height: '100%', maxHeight: '100%' }}
        >
          <div style={optionsStyle}>
            {this.props.data.refs}
            <br />
            {this.props.data.framework}
            <br />
            {moment(this.props.data.createAt).format('YYYY-MM-DD')}
          </div>
        </Dialog>
      </div>
    );
  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ copyNotify }, dispatch);
}
export default connect(null, matchDispatchToProps)(translate('')(ModelModal));
