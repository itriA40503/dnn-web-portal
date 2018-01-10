import React, { Component } from 'react';
import { Friend } from 'react-line-social';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
// i18n
import { translate } from 'react-i18next';
// GA
import ReactGA from 'react-ga';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AdminIncrease, AdminDecrease } from '../redux/Admin/actionAdmin';

import { lineBar, DnnLogo } from '../image';
import pjson from '../../../package.json';
import { lineId, lineQR } from '../resource';

/**
  Footer
  Example:
  ```
  <Footer />
  ```
 */
class Footer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
    // GA
    ReactGA.event({
      category: 'Information',
      action: !this.state.open ? 'open' : 'close',
    });
  };

  switchLineLang = (lang) => {
    switch (lang) {
      case 'eng':
        return (<Friend lineid={lineId} locale="en" count home />);
      case 'tc':
        return (<Friend lineid={lineId} count home />);
      default:
        return (<Friend lineid={lineId} count home />);
    }
  }

  render() {
    const { t } = this.props;
    // console.log(window.location.href)
    return (
      <Paper zDepth={1}>
        <Drawer
          width={300}
          openSecondary={true}
          open={this.state.open}
          containerStyle={{ overflow: 'hidden' }}
        >
          <div style={{ textAlign: 'center' }}>
            <img width="100%" src={lineBar} alt="Line Code" />
            <img width="75%" src={lineQR} onClick={this.props.AdminIncrease} alt="Line Code" />          
            <Avatar src={DnnLogo} size={100} onTouchTap={this.props.AdminDecrease} />
            <br />
            {'v ' + pjson.version }
            <br />
            {'© 2017 Industrial Technology Research Institute.'}
          </div>
        </Drawer>
        <BottomNavigation>
          <BottomNavigationItem icon={<div></div>} />
          <BottomNavigationItem
            icon={<img src={window.location.href + t('common:logoSrc')} alt="DNNLogo" />}
            onTouchTap={this.handleToggle}
          />
          <BottomNavigationItem
            icon={this.switchLineLang(t('common:pdfLang'))}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ AdminIncrease, AdminDecrease }, dispatch);
}

export default connect(null, matchDispatchToProps)(translate('')(Footer));
