import React from 'react';

// i18n
import { translate } from 'react-i18next';

import { valueUnitTypeList } from '../resource';

class ResourceDetail extends React.Component {
  static propTypes = {
    /**
     GPUType of the instance
    */
    value: React.PropTypes.string.isRequired,
    unit: React.PropTypes.string.isRequired,
  };
  static defaultProps = {
    value: '1e+9',
    unit: 'Day',
  };
  render() {
    const { t } = this.props;
    return (
      <div>
        {`${t('common:resource.count')}: ${this.props.value} / 
          ${t(valueUnitTypeList.filter(elem => elem.abbr === this.props.unit)[0].locale)}`}
      </div>
    );
  }
}

export default translate('')(ResourceDetail);
