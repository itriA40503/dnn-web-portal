import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import ReactTooltip from 'react-tooltip';
// GA
import ReactGA from 'react-ga';
// i18n
import { translate } from 'react-i18next';
// ICON
import AvVideoLibrary from 'material-ui/svg-icons/av/video-library';

/**
  Tutorial Button
  Example:
  ```
  <TutorialVedioBtn />
  ```
 */
class TutorialVideoBtn extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <FlatButton
          label={<b>{t('common:tutorialVideo')}</b>}
          style={{ color: '#fff' }}
          icon={<AvVideoLibrary />}
          data-tip
          data-for="vedio"
          href="./res/demo1005v4.mp4"
          target="_blank"
          onTouchTap={() => (ReactGA.event({ category: 'Vedio', action: 'open' }))}
        />
        <ReactTooltip id="vedio" place="bottom" effect="solid">
          <span>{t('common:tutorialVideo')}</span>
        </ReactTooltip>
      </div>
    );
  }
}
export default translate('')(TutorialVideoBtn);
