import React from 'react';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import moment from 'moment';
// i18n
import { translate } from 'react-i18next';
// COLOR
import { green500 } from 'material-ui/styles/colors';
import { muiStyle } from '../../myTheme';

class ConfirmPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instanceArr: this.props.instanceArr,
    };
  }
  render() {
    const {
      t,
      increaseDay,
      startDate,
      endDate,
      imageArr,
      projectNum,
    } = this.props;
    return (
      <div>
        <Divider />
        <h2 style={{ textAlign: 'center' }}>
          <b>
            <font color={muiStyle.palette.primary1Color}>
              {t('common:createStep.confirm')}
            </font>
          </b>
        </h2>
        <List>
          <Divider />
          <ListItem
            primaryText={
              <span>
                <b>{t('common:dateRange')} </b>
                {t('common:interval')} :{' '}
                <font color={green500}>
                  {increaseDay} {t('common:days')}
                </font>
              </span>
            }
            secondaryText={
              <p>
                {moment(startDate).format('YYYY-MM-DD')} ~{' '}
                {moment(endDate).format('YYYY-MM-DD')}
              </p>
            }
          />
          <Divider />
          <ListItem
            primaryText={<b>{t('common:instance')}</b>}
            secondaryText={
              <p>
                {t('common:youCreate')} <b>{this.state.instanceArr.length}</b>{' '}
                {t('common:instance')}.
              </p>
            }
            initiallyOpen={true}
            primaryTogglesNestedList={true}
            nestedItems={this.state.instanceArr.map((instance, index) => (
              <ListItem
                key={index}
                primaryText={<b>Instance - {index}</b>}
                initiallyOpen={true}
                nestedItems={[
                  <ListItem
                    primaryText={<b>Image</b>}
                    secondaryText={
                      <p>
                        <b>{imageArr[instance.image].name}</b>
                      </p>
                    }
                  />,
                  <ListItem
                    primaryText={<b>{t('common:gpuType')}</b>}
                    secondaryText={
                      <p>
                        <b>{instance.machineObj.gpuType}</b>
                      </p>
                    }
                  />,
                ]}
              />
            ))}
          />
          <Divider />
          <ListItem
            style={{ display: 'none' }}
            primaryText={<b>{t('common:project')}</b>}
            secondaryText={projectNum}
          />
        </List>
      </div>
    );
  }
}
export default translate('')(ConfirmPage);
