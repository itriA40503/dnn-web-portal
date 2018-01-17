import React, { Component } from 'react';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { errorNotify } from '../../redux/Notify/actionNotify';
import { getMachineData } from '../../redux/MachineData/actionMachineData';
// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// GA
import ReactGA from 'react-ga';
// i18n
import { translate } from 'react-i18next';
// API call
import { getMachines, ApiGetAllResource } from '../../resource';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';

import GpuHandler from '../Handler/GpuHandler';
import MachineHandler from '../Handler/MachineHandler';
import StatusHandler from '../Handler/StatusHandler';
import Deletemachine from './DeleteMachine';
import EditMachine from './EditMachine';
import EnableMachine from './EnableMachine';
import CreateMachine from './CreateMachine';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { Row, Col } from 'react-flexbox-grid';

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

class ReviewMachine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      switchCreatePage: false,
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
      data: [],
      isVisible: true,
      resourceList: [],
    };
  }

  componentDidMount() {
    getMachines(this.props.dispatch, this.props.token);
    this.getResourceApi();
  }

  getResourceApi = () => {
    const api = ApiGetAllResource;
    fetch(api, {
      method: 'get',
      headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then((data) => {
        if (data.code !== undefined) {
          this.props.someActions.errorNotify('ERROR : Get Resource Failed');
        } else {
          this.setState({
            resourceList: data.sort((a, b) => Number(a.id) - Number(b.id)),
          });
        }
      })
      .catch((err) => {
        console.log('err:' + err);
        // GA
        ReactGA.event({
          category: 'Notify',
          action: 'ERROR',
          label: 'ERROR : Get Resource',
        });
        this.props.someActions.errorNotify('ERROR : Review machine');
      });
  }

  refresh = async () => {
    // const { machineData } = this.props;
    await getMachines(this.props.dispatch, this.props.token);
    this.asyncTimer = await setTimeout(() => this.setState({ isVisible: false }), 10);
    this.asyncTimer = await setTimeout(() => this.setState({ isVisible: true }), 700);
    this.getResourceApi();
  }

  renderTable = () => {
    const { t, machineData } = this.props;
    return (
      <ReactTable
        data={machineData}
        columns={[
          {
            Header: '',
            columns: [
              {
                Header: t('common:machine.enable'),
                id: 'machineEnable',
                width: 100,
                Cell: data => (
                  <EnableMachine token={this.props.token} data={data.original} />
                ),
              },
              {
                Header: t('common:machine.id'),
                accessor: 'id',
              },
              {
                Header: t('common:machine.label'),
                accessor: 'label',
              },
              {
                Header: t('common:machine.statusId'),
                id: 'machineStatusId',
                accessor: 'statusId',
                Cell: data => (
                  <StatusHandler statusId={data.original.statusId} machineStatus={true} />
                ),
              },
              {
                Header: t('common:machine.resId'),
                id: 'resId',
                accessor: 'resInfo.id',
              },
              {
                Header: t('common:machine.resInfo'),
                accessor: 'resInfo',
                id: 'resInfo',
                Cell: data => (
                  <Row>
                    <Col xs={6}>
                      <GpuHandler gpu={data.original.resInfo.gpuType} />
                    </Col>
                    <Col xs={6}>
                      <MachineHandler machine={data.original.resInfo.machineType} />
                    </Col>
                  </Row>
                ),
              },
              {
                Header: t('common:machine.gpuAmount'),
                accessor: 'gpuAmount',
              },
              {
                Header: t('common:machine.edit'),
                id: 'editMachine',
                width: 80,
                Cell: data => (
                  <EditMachine
                    token={this.props.token}
                    data={data.original}
                    list={this.state.resourceList}
                  />
                ),
              },
              {
                Header: t('common:machine.remove'),
                id: 'removeMachine',
                width: 80,
                Cell: data => (
                  <Deletemachine
                    token={this.props.token}
                    data={data.original}
                  />
                ),
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
                <CreateMachine
                  token={this.props.token}
                  list={this.state.resourceList}
                  refresh={this.refresh}
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
          <CardTitle title={t('common:machine.review')} />
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

function mapStateToProps(state) {
  return {
    machineData: state.machineData,
  };
}

function matchDispatchToProps(dispatch) {
  return { dispatch, someActions: bindActionCreators({ errorNotify, getMachineData }, dispatch) };
}

export default connect(mapStateToProps, matchDispatchToProps)(translate('')(ReviewMachine));
