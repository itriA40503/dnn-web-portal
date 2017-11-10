import React, { Component } from 'react';
import moment from 'moment';
// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// i18n
import { translate } from 'react-i18next';

import { Card, CardTitle, CardActions } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import FlatButton from 'material-ui/FlatButton';

import DataSetModal from './DataSetModal';
import CreateDataSet from './CreateDataSet';

// ICON
import ContentAdd from 'material-ui/svg-icons/content/add';
// theme
import { muiStyle } from '../../myTheme';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';

const fakeData = [
  {
    name: 'data1',
    refs: '123',
    status: 1,
    createAt: '2077-07-27T07:35:30.973Z',
  },
  {
    name: 'data2',
    refs: '456',
    status: 4,
    createAt: '2777-07-17T07:35:30.973Z',
  },
];

class ReviewDataSet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      singleInfo: {},
      expanded: false,
      messages: [],
      sorted: [],
      page: 0,
      pageSize: 5,
      tableExpanded: {},
      resized: [],
      filtered: [],
      click: false,
      switchCreatePage: false,
    };
  }
  renderTable = () => {
    const { t } = this.props;
    return (
      <ReactTable
        data={fakeData}
        columns={[
          {
            Header: '',
            columns: [
              {
                Header: t('common:detail'),
                id: 'detail',
                width: 80,
                Cell: data => (
                  <DataSetModal
                    data={data.original}
                  />
                ),
              },
              {
                Header: 'DataName',
                accessor: 'name',
              },
              {
                Header: 'refs',
                accessor: 'refs',
              },
              {
                Header: 'createAt',
                id: 'createAt',
                accessor: d => (moment(d.createAt).format('YYYY-MM-DD')),
              },
            ],
          },
        ]}
        // pivotBy={['startedAt']}
        filterable
        defaultPageSize={5}
        className="-striped -highlight"
        // Controlled props
        sorted={this.state.sorted}
        page={this.state.page}
        pageSize={this.state.pageSize}
        expanded={this.state.tableExpanded}
        resized={this.state.resized}
        filtered={this.state.filtered}
        // Callbacks
        onSortedChange={sorted => this.setState({ sorted })}
        onPageChange={page => this.setState({ page })}
        onPageSizeChange={(pageSize, page) => this.setState({ page, pageSize })}
        onExpandedChange={expanded =>
          this.setState({ tableExpanded: expanded })}
        onResizedChange={resized => this.setState({ resized })}
        onFilteredChange={filtered => this.setState({ filtered })}
        style={{ verticalAlign: 'middle' }}
      />
    );
  };
  renderReview = () => {
    const { loading } = this.state;
    return (
      <Card>
        <CardActions style={{
          zIndex: 2,
          display: 'inline-block',
          float: 'right',
          right: '10px',
        }}
        >
          <FlatButton
            style={{ color: muiStyle.palette.primary1Color }}
            label={'Create DataSet'}
            onTouchTap={() => this.setState({ switchCreatePage: true })}
            icon={<ContentAdd />}
          />
        </CardActions>
        <CardTitle title={'DataSet'} />
        <ExpandTransition loading={loading} open={true}>
          <Paper>
            {loading && (
              <div style={{ textAlign: 'center' }}>
                <CircularProgress size={80} thickness={5} />
              </div>
            )}
            <div style={{ margin: 'auto', textAlign: 'center' }}>
              <Animated animationIn="slideInDown" isVisible={true}>{this.renderTable()}</Animated>
            </div>
          </Paper>
        </ExpandTransition>
      </Card>
    );
  }
  render() {
    const { switchCreatePage } = this.state;
    return (
      <div>
        { !switchCreatePage ? (
            this.renderReview()
          ) : (
            <div>
              <CreateDataSet backReview={() => this.setState({ switchCreatePage: false })} />
            </div>
        )}
      </div>
    );
  }
}

export default translate('')(ReviewDataSet);
