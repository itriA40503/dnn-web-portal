import React, { Component } from 'react';
// i18n
import { translate } from 'react-i18next';
// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';

import moment from 'moment';
import { Card, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';

// style
import { muiStyle } from '../../myTheme';
import { CardTitle } from 'material-ui';

import CreateTransaction from './CreateTransaction';

let transactionData = [
  {
    id: '5',
    userId: '2',
    addValue: -110,
    info: 'add value',
    createdAt: '2017-12-27T02:25:41.478Z',
  },
  {
    id: '4',
    userId: '2',
    addValue: 10,
    info: 'add value',
    createdAt: '2017-12-27T02:25:23.063Z',
  },
  {
    id: '3',
    userId: '2',
    addValue: 10,
    info: 'add value',
    createdAt: '2017-12-27T00:56:29.810Z',
  },
  {
    id: '2',
    userId: '2',
    addValue: -9,
    info: 'add value',
    createdAt: '2017-12-26T03:47:10.516Z',
  },
  {
    id: '1',
    userId: '2',
    addValue: 999,
    info: 'add value',
    createdAt: '2017-12-26T03:45:53.791Z',
  },
];

const styles = {
  actions: {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
    right: '10px',
    margin: '0px auto',
  },
  textCenter: {
    textAlign: 'center',
  },
};

class ReviewTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: [],
      page: 0,
      pageSize: 5,
      tableExpanded: [],
      resized: [],
      filtered: [],
    };
  }

  renderTable = () => {
    const { t } = this.props;
    return (
      <ReactTable
        data={transactionData}
        columns={[
          {
            Header: '',
            columns: [
              {
                Header: t('common:transaction.id'),
                accessor: 'id',
              },
              {
                Header: t('common:transaction.addValue'),
                accessor: 'addValue',
              },
              {
                Header: t('common:transaction.info'),
                accessor: 'info',
              },
              {
                Header: t('common:transaction.createdAt'),
                accessor: 'createdAt',
                Cell: data => moment(data.original.createdAt).format('YYYY-MM-DD hh:mm'),
              },
            ],
          },
        ]}
        // filterable
        className="-striped -highlight"
        // Controlled props
        sorted={this.state.sorted}
        page={this.state.page}
        pageSize={this.state.pageSize}
        expanded={this.state.tableExpanded}
        resized={this.state.resized}
        // filtered={this.state.filtered}
        // Callbacks
        onSortedChange={sorted => this.setState({ sorted })}
        onPageChange={page => this.setState({ page })}
        onPageSizeChange={(pageSize, page) => this.setState({ page, pageSize })}
        onExpandedChange={expanded => this.setState({ tableExpanded: expanded })}
        onResizedChange={resized => this.setState({ resized })}
        // onFilteredChange={filtered => this.setState({ filtered })}
        style={{ verticalAlign: 'middle' }}
      />
    );
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <Card zDepth={1}>
          <CardActions style={styles.actions}>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block' }}>
                <CreateTransaction />
              </div>
            </div>
          </CardActions>
          <CardTitle />
          <br />
          <br />
          <div style={{ margin: '0 auto', textAlign: 'center' }}>
            {this.renderTable()}
          </div>
        </Card>
      </div>
    );
  }
}

export default translate('')(ReviewTransaction);
