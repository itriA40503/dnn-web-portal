import React, { Component } from 'react';
import moment from 'moment';
// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// i18n
import { translate } from 'react-i18next';
// GA
import ReactGA from 'react-ga';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { errorNotify } from '../redux/Notify/actionNotify';
import { getHistoryData } from '../redux/HistoryData/actionHistoryData';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';
// ICON
import ActionHistory from 'material-ui/svg-icons/action/history';
// COLOR
import { grey500 } from 'material-ui/styles/colors';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import DetailModal from './DetailModal';
// API call
import { getHistory } from '../resource';

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
  },
  textCenter: {
    textAlign: 'center',
  },
};
/**
  History Table
  Example:
  ```
  <HistoryTable token = {this.props.token} />
  ```
 */
class HistoryTable extends Component {
  static propTypes = {
    /**
        The user token for call api
      */
    token: React.PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
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
    };
  }
  componentDidMount() {
    // this.getData()
    this.switchPage();
  }
  // dummyAsync = (cb) => {
  //     this.setState({loading: true}, () => {
  //       this.asyncTimer = setTimeout(cb, 500);
  //    })
  // }
  refresh = (event) => {
    event.preventDefault();
  };
  // SwitchPage = () => this.setState({ switchPage: true });
  switchPage = () => {
    this.setState({ switchPage: !this.state.switchPage });
    if (!this.state.switchPage) {
      // this.getData();
      getHistory(this.props.dispatch, this.props.token);
      setTimeout(() => this.setState({ loading: false }), 300);
      if (this.props.historyData.length === 0) this.setState({ switchPage: false });
      // GA
      ReactGA.event({
        category: 'HistoryTable',
        action: 'open',
      });
    } else {
      // GA
      ReactGA.event({
        category: 'HistoryTable',
        action: 'close',
      });
    }
  };
  renderTable = () => {
    const { t } = this.props;
    // const orgData = this.state.data;
    const orgData = this.props.historyData;
    const tableData = [];
    orgData.map((obj) => {
      let data = Object.assign({}, obj); // Deep copy
      data.startedAt = moment(obj.startedAt).format('YYYY-MM-DD');
      data.endedAt = moment(obj.endedAt).format('YYYY-MM-DD');
      // data.id = `${obj.machine.label} - ${obj.id}`;
      // console.log(obj.machine.label, '::', obj.id);
      tableData.push(data);
      return 0;
    });
    return (
      <ReactTable
        data={tableData}
        columns={[
          {
            Header: '',
            columns: [
              {
                Header: t('common:detail'),
                id: 'detail',
                width: 80,
                Cell: data => (
                  <DetailModal
                    data={data.original}
                    iconColor={grey500}
                    showStatus={false}
                  />
                ),
              },
              {
                Header: t('common:startDate'),
                accessor: 'startedAt',
              },
              {
                Header: t('common:endDate'),
                accessor: 'endedAt',
              },
              {
                Header: t('common:scheduleID'),
                id: 'scheduleID',
                accessor: d => (`${d.machine.label} - ${d.id}`),
              },
              {
                Header: t('common:image'),
                id: 'image',
                accessor: d => (d.image.name),
              },
              {
                Header: t('common:gpuType'),
                id: 'gpuType',
                accessor: d => (d.machine.gpuType),
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

  render() {
    const { t } = this.props;
    const { switchPage, loading } = this.state;
    // this.state.data.map((data) => {
    // const date = moment.utc(data.startedAt).format('YYYY-MM-DD')
    // console.log(data.startedAt,date)
    // })
    return (
      <div>
        <FlatButton
          style={{ color: grey500 }}
          icon={<ActionHistory color={grey500} />}
          onTouchTap={this.switchPage}
          label={!switchPage && t('common:history.title')}
        />
        {switchPage && (
          <Card>
            <CardActions style={styles.actions} />
            <CardTitle
              title={<font color={grey500}>{t('common:history.title')}</font>}
            />
            <ExpandTransition loading={loading} open={switchPage}>
              <Paper>
                {loading && (
                  <div style={{ textAlign: 'center' }}>
                    <CircularProgress size={80} thickness={5} />
                  </div>
                )}
                <div style={{ margin: 'auto', textAlign: 'center' }}>
                  {this.props.historyData.length !== 0 && <Animated animationIn="slideInDown" isVisible={true}>{this.renderTable()}</Animated>}
                </div>
              </Paper>
            </ExpandTransition>
          </Card>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    historyData: state.historyData,
  };
}
function matchDispatchToProps(dispatch) {
  // add 'dispatch' for passing action to API
  return { dispatch, someActions: bindActionCreators({ errorNotify, getHistoryData }, dispatch) };
}
export default connect(mapStateToProps, matchDispatchToProps)(translate('')(HistoryTable));
