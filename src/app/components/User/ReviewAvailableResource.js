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

import { valueUnitTypeList } from '../../resource';

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
  extend: {
    lineHeight: '36px',
    margin: '0px',
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
    return this.props.data.length === 0 ? (
      <div style={{ width: '100%', height: '250px' }}>
        <h3 style={{
            position: 'relative',
            top: '30%',
          }}
        >
          {t('common:user.noData')}
        </h3>
      </div>
    ) : (
      <ReactTable
        data={this.props.data}
        columns={[
          {
            Header: '',
            columns: [
              {
                Header: t('common:machine.resInfo'),
                accessor: 'resInfo',
                id: 'resInfo',
                Cell: data => (
                  <div style={{ padding: '3px 0px' }}>
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
                Cell: data => (
                  <div>
                    <p style={styles.extend}>
                      {data.original.amount}
                    </p>
                  </div>
                ),
              },
              {
                Header: t('common:availableRes.total'),
                Cell: data => (
                  <div>
                    <p style={styles.extend}>
                      {
                        `${data.original.amount * data.original.resInfo.value} / ${t(valueUnitTypeList.filter(v => v.abbr === data.original.resInfo.valueUnit)[0].locale)}`
                      }
                    </p>
                  </div>
                ),
              },
              {
                Header: t('common:machine.createdAt'),
                accessor: 'createdAt',
                Cell: data => (
                  <div>
                    <p style={styles.extend}>
                      {moment(data.original.createdAt).format('YYYY-MM-DD hh:mm')}
                    </p>
                  </div>
                ),
              },
              {
                Header: t('common:machine.updatedAt'),
                accessor: 'updatedAt',
                Cell: data => (
                  <div>
                    <p style={styles.extend}>
                      {moment(data.original.updatedAt).format('YYYY-MM-DD hh:mm')}
                    </p>
                  </div>
                ),
              },
              {
                Header: t('common:availableRes.edit'),
                id: 'editAvailableResource',
                width: 100,
                Cell: data => (
                  <EditAvailableResource
                    data={data.original}
                    token={this.props.token}
                    who={this.props.who}
                    refresh={this.props.refresh}
                  />
                ),
              },
              {
                Header: t('common:availableRes.remove'),
                id: 'deleteAvailableResource',
                width: 100,
                Cell: data => (
                  <DeleteAvailableResource
                    data={data.original}
                    token={this.props.token}
                    who={this.props.who}
                    refresh={this.props.refresh}
                  />
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
    return (
      <div>
        <Card zDepth={1}>
          <CardActions style={styles.actions}>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block' }}>
                <CreateAvailableResource
                  token={this.props.token}
                  list={this.props.list}
                  refresh={this.props.refresh}
                  who={this.props.who}
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
