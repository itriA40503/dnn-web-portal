import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';
import 'semantic-ui-css/components/label.min.css';
// i18n
import { translate } from 'react-i18next';
/**
  Show Status
  Example:
  ```
  <StatusHandler
      start={new Date()}
      refresh={this.getData}
      statusId={data.statusId}
  />
  ```
 */
class StatusHandler extends Component {
  // static propTypes = {
  //     statusId: React.PropTypes.number,
  // }
  static propTypes = {
    //  /**
    //   The start count time
    // */
    // start: React.PropTypes.string.isRequired,
     /**
      Will refresh reviewTable after count
    */
    machineStatus: React.PropTypes.bool,
    /**
        the statusId of the instance
      */
    statusId: React.PropTypes.string.isRequired,
  };
  static defaultProps = {
    machineStatus: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0,
      // refreshTimes: 0
    };
  }
  setIncetanceStatus = (status) => {
    const { t } = this.props;
    let obj;
    // console.log('StatusHandler:'+status)
    switch (status) {
      case 1:
      case '1':
        obj = <Label color={'yellow'}>{t('common:status.waiting')}</Label>;
        // obj = <font color ={amber900}><b>{t('common:status.waiting')}</b></font>
        break;
      case 2:
      case '2':
        obj = <Label color={'olive'}>{t('common:status.loading')}</Label>;
        // obj = <font color ={green700}><b>{t('common:status.loading')}</b></font>
        break;
      case 3:
      case '3':
        obj = <Label color={'green'}>{t('common:status.running')}</Label>;
        // obj = <font color ={greenA700}><b>{t('common:status.running')}</b></font>
        break;
      case 4:
      case '4':
        obj = <Label color={'purple'}>{t('common:status.deleting')}</Label>;
        // obj = <font color ={deepOrangeA400}><b>{t('common:status.deleting')}</b></font>
        break;
      case 5:
      case '5':
        obj = <Label color={'pink'}>{t('common:status.deleted')}</Label>;
        // obj = <font color ={deepOrangeA700}><b>{t('common:status.deleted')}</b></font>
        break;
      case 6:
      case '6':
        obj = <Label color={'teal'}>{t('common:status.canceled')}</Label>;
        // obj = <font color ={blue800}><b>{t('common:status.canceled')}</b></font>
        break;
      case 7:
      case '7':
        obj = <Label color={'red'}>{t('common:status.error')}</Label>;
        // obj = <font color ={redA700}><b>{t('common:status.error')}</b></font>
        break;
      case 8:
      case '8':
        obj = <Label color={'orange'}>{t('common:status.creatings')}</Label>;
        // obj = <font color ={redA700}><b>{t('common:status.error')}</b></font>
        break;
      default:
        obj = <Label color={'red'}>{t('common:status.error')}</Label>;
    }
    return obj;
  };

  setMachineStatus = (status) => {
    const { t } = this.props;
    let obj;
    // console.log('StatusHandler:'+status)
    switch (status) {
      case 1:
      case '1':
        obj = <Label color={'green'}>{t('common:status.running')}</Label>;
        // obj = <font color ={amber900}><b>{t('common:status.waiting')}</b></font>
        break;
      case 2:
      case '2':
        obj = <Label color={'red'}>{t('common:status.error')}</Label>;
        // obj = <font color ={green700}><b>{t('common:status.loading')}</b></font>
        break;
      case 3:
      case '3':
        obj = <Label color={'teal'}>{t('common:status.disable')}</Label>;
        // obj = <font color ={greenA700}><b>{t('common:status.running')}</b></font>
        break;
      case 4:
      case '4':
        obj = <Label color={'purple'}>{t('common:status.destoryed')}</Label>;
        // obj = <font color ={deepOrangeA400}><b>{t('common:status.deleting')}</b></font>
        break;      
      default:
        obj = <Label color={'red'}>{t('common:status.error')}</Label>;
    }
    return obj;
  };

  render() {
    const { statusId, machineStatus } = this.props;
    // console.log(this.props.machineStatus, statusId);
    return (
      <div>
        <div style={{ margin: '0px auto' }}>
          <div style={{ display: 'inline-block' }}>
            {machineStatus ? this.setMachineStatus(statusId)
               : this.setIncetanceStatus(statusId) }
          </div>
        </div>
      </div>
    );
  }
}
export default translate('')(StatusHandler);
