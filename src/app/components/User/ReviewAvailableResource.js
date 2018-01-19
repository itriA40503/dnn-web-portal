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
import GpuHandler from '../Handler/GpuHandler';
import MachineHandler from '../Handler/MachineHandler';
import ResourceDetail from '../ResourceDetail';
import ReactTooltip from 'react-tooltip';
import { Card, CardActions } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';

// style
import { muiStyle } from '../../myTheme';
import { CardTitle } from 'material-ui';

import CreateAvailableResource from './CreateAvailableResource';
import EditAvailableResource from './EditAvailableResource';
import DeleteAvailableResource from './DeleteAvailableResource';

let availableResource = [
  {
    id: '3',
    resId: '1',
    amount: 2,
    createdAt: '2017-12-25T06:52:55.634Z',
    updatedAt: '2017-12-25T06:52:55.632Z',
    deletedAt: '2017-12-25T07:20:45.000Z',
    resInfo: {
      id: '1',
      gpuType: '780',
      machineType: 'x86',
      valueUnit: 'd',
      value: 10,
      createdAt: '2017-12-22T03:32:43.884Z',
      updatedAt: '2017-12-22T08:18:20.429Z',
    },
  },
  {
    id: '4',
    resId: '1',
    amount: 2,
    createdAt: '2017-12-25T07:06:17.940Z',
    updatedAt: '2017-12-25T07:06:17.926Z',
    deletedAt: '2017-12-25T07:20:48.000Z',
    resInfo: {
      id: 1,
      gpuType: '780',
      machineType: 'x86',
      valueUnit: 'd',
      value: 10,
      createdAt: '2017-12-22T03:32:43.884Z',
      updatedAt: '2017-12-22T08:18:20.429Z',
    },
  },
  {
    id: '5',
    resId: '1',
    amount: 2,
    createdAt: '2017-12-25T07:07:52.219Z',
    updatedAt: '2017-12-25T07:07:52.199Z',
    deletedAt: '2017-12-25T07:20:50.000Z',
    resInfo: {
      id: '1',
      gpuType: '780',
      machineType: 'x86',
      valueUnit: 'd',
      value: 10,
      createdAt: '2017-12-22T03:32:43.884Z',
      updatedAt: '2017-12-22T08:18:20.429Z',
    },
  },
  {
    id: '2',
    resId: '1',
    amount: 2,
    createdAt: '2017-12-25T06:52:43.400Z',
    updatedAt: '2017-12-25T06:52:43.397Z',
    deletedAt: '2017-12-25T07:20:58.000Z',
    resInfo: {
      id: '1',
      gpuType: '780',
      machineType: 'x86',
      valueUnit: 'd',
      value: 10,
      createdAt: '2017-12-22T03:32:43.884Z',
      updatedAt: '2017-12-22T08:18:20.429Z',
    },
  },
  {
    id: '6',
    resId: '3',
    amount: 6,
    createdAt: '2017-12-25T07:22:43.469Z',
    updatedAt: '2017-12-25T08:17:31.556Z',
    deletedAt: '2017-12-25T08:17:31.000Z',
    resInfo: {
      id: '3',
      gpuType: '1080',
      machineType: 'x86',
      valueUnit: 'd',
      value: 10,
      createdAt: '2017-12-22T03:33:10.413Z',
      updatedAt: '2017-12-22T03:37:11.982Z',
    },
  },
  {
    id: '7',
    resId: '3',
    amount: 6,
    createdAt: '2017-12-25T08:18:02.825Z',
    updatedAt: '2017-12-25T08:18:02.822Z',
    deletedAt: null,
    resInfo: {
      id: '3',
      gpuType: '1080',
      machineType: 'x86',
      valueUnit: 'd',
      value: 10,
      createdAt: '2017-12-22T03:33:10.413Z',
      updatedAt: '2017-12-22T03:37:11.982Z',
    },
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

class ReviewAvailableResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: [],
      page: 0,
      pageSize: 5,
      tableExpanded: [],
      resized: [],
    };
  }

  renderTable = () => {
    const { t } = this.props;
    return (
      <ReactTable
        data={availableResource}
        columns={[
          {
            Header: '',
            columns: [
              {
                Header: t('common:machine.resInfo'),
                accessor: 'resInfo',
                id: 'resInfo',
                Cell: data => (
                  <div>
                    <div
                      data-tip
                      data-for={`resDetail${data.original.id}`}
                    >
                      <Row>
                        <Col xs={1} />
                        <Col xs={4}>
                          <GpuHandler gpu={data.original.resInfo.gpuType} />
                        </Col>
                        <Col xs={1} />
                        <Col xs={4}>
                          <MachineHandler machine={data.original.resInfo.machineType} />
                        </Col>
                        <Col xs={1} />
                      </Row>
                    </div>
                    <ReactTooltip
                      id={`resDetail${data.original.id}`}
                      place="bottom"
                      effect="solid"
                      getContent={() => (
                        <ResourceDetail
                          value={data.original.resInfo.value}
                          unit={data.original.resInfo.valueUnit}
                        />
                      )}
                    />
                  </div>
                ),
              },
              {
                Header: t('common:machine.gpuAmount'),
                accessor: 'amount',
              },
              {
                Header: t('common:machine.createdAt'),
                accessor: 'createdAt',
                Cell: data => moment(data.original.createdAt).format('YYYY-MM-DD hh:mm'),
              },
              {
                Header: t('common:machine.updatedAt'),
                accessor: 'updatedAt',
                Cell: data => moment(data.original.updatedAt).format('YYYY-MM-DD hh:mm'),
              },
              {
                Header: t('common:availableRes.edit'),
                id: 'editAvailableResource',
                width: 100,
                Cell: data => (
                  <EditAvailableResource data={data.original} />
                ),
              },
              {
                Header: t('common:availableRes.remove'),
                id: 'deleteAvailableResource',
                width: 100,
                Cell: data => (
                  <DeleteAvailableResource data={data.original} />
                ),
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
                <CreateAvailableResource
                  list={this.props.list}
                />
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

export default translate('')(ReviewAvailableResource);
