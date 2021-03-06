import React from 'react';
import FtpInfoModal from '../FtpInfoModal';
// i18n
import { translate } from 'react-i18next';

import { muiStyle } from '../../myTheme';

class FinishAutoPage extends React.Component {
  static propTypes = {
    /**
      Will refresh reviewTable after count
    */
    CreateDone: React.PropTypes.func.isRequired,
    /**
      the instance information
    */
    // data: React.PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0,
    };
  }
  componentDidMount() {
    this.timer = setInterval(this.tick, 50);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  tick = () => {
    this.setState({
      elapsed: this.state.elapsed + 50,
    });
    let elapsed = Math.round(this.state.elapsed / 100);
    let seconds = (elapsed / 10).toFixed(0);
    if (5 - seconds <= 0) {
      this.props.CreateDone();
    }
  };
  render() {
    const { t } = this.props;
    let elapsed = Math.round(this.state.elapsed / 100);
    let seconds = (elapsed / 10).toFixed(0);
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          <b>
            <font color={muiStyle.palette.primary1Color}>
              {t('common:createStep.success')}
            </font>
          </b>
        </h1>
        {t('common:pdfLang') === 'tc' ? (
          <h2 style={{ textAlign: 'center' }}>
            <br />
            <b>
              {5 - seconds}s {t('common:createStep.refreshHint')}
            </b>
          </h2>
        ) : (
          <h2 style={{ textAlign: 'center' }}>
            <br />
            <b>
              {t('common:createStep.refreshHint')} {5 - seconds}s
            </b>
          </h2>
        )}
        <div style={{ margin: '0px auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <h2 style={{ color: muiStyle.palette.primary1Color }}>
              {'Remember upload your '}
            </h2>
          </div>
          <div style={{ display: 'inline-block' }}>
            <FtpInfoModal iconColor={'#E65100'} />
          </div>
        </div>
      </div>
    );
  }
}
export default translate('')(FinishAutoPage);
