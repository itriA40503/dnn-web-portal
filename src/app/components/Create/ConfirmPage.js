import React from 'react';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import moment from 'moment';
// i18n
import { translate } from 'react-i18next';
// COLOR
import { green500 } from 'material-ui/styles/colors';
import { muiStyle } from '../../myTheme';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { errorNotify } from '../../redux/Notify/actionNotify';

class ConfirmPage extends React.Component {

  renderDateItem = (t, createData) => (
    <ListItem
      primaryText={
        <span>
          <b>{t('common:dateRange')} </b>
          {t('common:interval')} :{' '}
          <font color={green500}>
            {moment(createData.end).diff(moment(createData.start), 'days')} {t('common:days')}
          </font>
        </span>
      }
      secondaryText={
        <p>
          {moment(createData.start).format('YYYY-MM-DD')} ~{' '}
          {moment(createData.end).format('YYYY-MM-DD')}
        </p>
      }
    />
  );
  renderInstanceInfo = (t, createData) => {
    const Info = createData.availRes.filter(o => (o.resInfo.id === createData.resId))[0];
    return (
      <ListItem
        primaryText={<b>{t('common:instance')}</b>}
        initiallyOpen={true}
        primaryTogglesNestedList={true}
        nestedItems={[
          <ListItem
            primaryText={<b>Image</b>}
            secondaryText={
              <p>
                <b>{createData.images.filter(o => (o.id === createData.imageId))[0].name}</b>
              </p>
            }
          />,
          <ListItem
            primaryText={<b>{t('common:gpuType')}</b>}
            secondaryText={
              <p>
                <b>{ Info.resInfo.gpuType }</b> <b>{' * ' + Info.amount}</b>
              </p>
            }
          />,
        ]}
      >{}
      </ListItem>
    );
  }
  render() {
    const { t, createData } = this.props;
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>
          <b>
            <font color={muiStyle.palette.primary1Color}>
              {t('common:createStep.confirm')}
            </font>
          </b>
        </h2>
        <List>
          <Divider />
          {this.renderDateItem(t, createData)}
          <Divider />
          {this.renderInstanceInfo(t, createData)}
          <Divider />
        </List>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return {
    dispatch,
    someActions: bindActionCreators({
      errorNotify,
    }, dispatch) };
}

function mapStateToProps(state) {
  return {
    createData: state.createData,
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(translate('')(ConfirmPage));
