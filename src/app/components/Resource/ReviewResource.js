import React, { Component } from 'react';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// i18n
import { translate } from 'react-i18next';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';

import GpuHandler from '../GpuHandler';
import MachineHandler from '../MachineHandler';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import CreateResource from './CreateResource';
import EditResource from './EditResource';
import DeleteResource from './DeleteResource';

import { ApiGetAllResource, valueUnitTypeList } from '../../resource';

// style
import { muiStyle } from '../../myTheme';

const styles = {
  root: {
    margin: '-2px',
  },
  gridList: {
    width: '100%',
    margin: 0,
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
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

class ReviewResource extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      switchCreatePage: false,
      singleInfo: {},
      expanded: false,
      messages: [],
      data: [],
      sorted: [],
      page: 0,
      pageSize: 5,
      tableExpanded: {},
      resized: [],
      filtered: [],
      click: false,
      data: [],
      isVisible: true,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    // this.setState({ loading: true });
    let resData = await fetch(ApiGetAllResource, {
      method: 'get',
      headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(res => res.json());
    this.setState({ data: resData });
  }

  refresh = async () => {
    this.asyncTimer = await setTimeout(() => this.setState({ isVisible: false }), 10);
    this.asyncTimer = await setTimeout(() => {
      this.setState({ isVisible: true });
      this.getData();
    }, 700);
  }

  renderTable = () => {
    const { t } = this.props;
    return (
      <ReactTable
        data={this.state.data}
        columns={[
          {
            Header: '',
            columns: [
              {
                Header: t('common:resource.id'),
                accessor: 'id',
              },
              {
                Header: t('common:resource.gpu'),
                accessor: 'gpuType',
                Cell: data => (<GpuHandler gpu={data.original.gpuType} />),
              },
              {
                Header: t('common:resource.machine'),
                accessor: 'machineType',
                Cell: data => (<MachineHandler machine={data.original.machineType} />),
              },
              {
                Header: t('common:resource.value'),
                accessor: 'value',
              },
              {
                Header: t('common:resource.valueUnit'),
                accessor: 'valueUnit',
                Cell: data => (valueUnitTypeList.find(x => x.abbr === data.original.valueUnit).text),
              },
              {
                Header: t('common:resource.edit'),
                id: 'editResourceInfo',
                width: 80,
                Cell: data => (
                  <EditResource
                    token={this.props.token}
                    data={data.original}
                    refresh={this.getData}
                  />),
              },
              {
                Header: t('common:resource.remove'),
                id: 'removeResourceInfo',
                width: 80,
                Cell: data => (
                  <DeleteResource
                    token={this.props.token}
                    data={data.original}
                    refresh={this.getData}
                  />),
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
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <Card>
          <CardActions style={styles.actions}>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block' }}>
                <CreateResource
                  token={this.props.token}
                  refresh={this.getData}
                />
              </div>
              <div style={{ display: 'inline-block' }}>
                <FlatButton
                  label={t('common:refresh')}
                  style={{ color: muiStyle.palette.primary1Color }}
                  icon={<NavigationRefresh />}
                  onTouchTap={() => this.refresh()}
                />
              </div>
            </div>
          </CardActions>
          <CardTitle title={t('common:resource.review')} />
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <ExpandTransition loading={this.state.loading} open={true}>
              <Animated animationIn="slideInDown" isVisible={this.state.isVisible}>
                {this.renderTable()}
              </Animated>
            </ExpandTransition>
          </div>
        </Card>
      </div>
    );
  }
}


export default translate('')(ReviewResource);
