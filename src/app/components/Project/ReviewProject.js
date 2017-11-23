import React, { Component } from 'react';
// import SortableTree, { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';
// i18n
import { translate } from 'react-i18next';

import { Card, CardTitle, CardActions } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { muiStyle } from '../../myTheme';
import { Row, Col } from 'react-flexbox-grid';
// ICON
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import FaFlask from 'react-icons/lib/fa/flask';
import ContentAdd from 'material-ui/svg-icons/content/add';

class ReviewProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        { title: 'Project1',
          expanded: true,
          data: '123',
          type: 'project',
          select: false,
          children: [
            { title: 'job1', type: 'job', data: 'job1 data' },
            { title: 'job2', type: 'job', data: 'job2 data' },
            { title: 'job3', type: 'job', data: 'job3 data' },
            { title: 'job4', type: 'job', data: 'job4 data' },
          ],
        },
        { title: 'Project2',
          expanded: true,
          data: '123',
          select: false,
          type: 'project',
          children: [
            { title: 'job', type: 'job', data: 'job data' },
            { title: 'job00', type: 'job', data: 'job data 00' },
          ],
        },
      ],
      open: false,
      newPjName: '',
      currentData: null,
    };
  }
  handleChange = (event, value) => this.setState({ [event.target.name]: value });
  changeSelect = node => console.log(node);
  addProject = () => {

  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false, newPjName: '' });
  };
  handleSubmit = () => {
    let data = this.state.treeData;
    let newPj = {};
    newPj.title = this.state.newPjName;
    data.push(newPj);
    this.setState({ treeData: data, open: false });
  };
  handleTouch = (data) => {
    // console.log(data);
    this.setState({ currentData: data });
  }
  renderList = (data) => {
    console.log('title', this.state.currentData);
    const { currentData } = this.state;
    return (
      <List>
        {data.map((obj, index) => (
          <ListItem
            initiallyOpen
            key={index}
            leftIcon={
              <ActionAssignment
                color={
                  (currentData !== null && currentData.title === obj.title)
                  && muiStyle.palette.primary1Color
                }
              />
            }
            primaryText={
              (currentData !== null && currentData.title === obj.title) ?
                <font color={muiStyle.palette.primary1Color} ><b>{obj.title}</b></font> : obj.title
            }
            onTouchTap={() => this.handleTouch(obj)}
            nestedItems={obj.children && obj.children.map(job => (
              <ListItem
                leftIcon={
                  <FaFlask
                    size={20}
                    color={
                      (currentData !== null && currentData.title === job.title)
                      && muiStyle.palette.primary1Color
                    }
                  />
                }
                primaryText={
                  (currentData !== null && currentData.title === job.title) ?
                    <font color={muiStyle.palette.primary1Color}><b>{job.title}</b></font>
                    : job.title
                }
                onTouchTap={() => this.handleTouch(job)}
              />
            ))}
          />
        ))}
      </List>
    );
  }
  renderCreate = () => {
    const { t } = this.props;
    const actions = [
      <FlatButton
        label={t('common:cancel')}
        style={{ color: muiStyle.palette.primary1Color }}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={t('common:submit')}
        secondary={true}
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
      <div>
        <FlatButton
          style={{ color: muiStyle.palette.primary1Color }}
          label={'Create Project'}
          onTouchTap={() => this.handleOpen()}
          icon={<ContentAdd />}
        />
        <Dialog
          title={
            <div>
              <b>
                {'Create Project'}
              </b>
            </div>
          }
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <TextField
            onChange={this.handleChange}
            floatingLabelText={'Project Name'}
            name={'newPjName'}
          />
        </Dialog>
      </div>
    );
  }
  renderProjectInfo = (project) => {
    return (
      <Card>
        <CardTitle title={<b><ActionAssignment /> {project.title}</b>} />
        <div>
          {project.data}
        </div>
      </Card>
    );
  }
  renderJobInfo = (job) => {
    return (
      <Card>
        <CardTitle title={<b><FaFlask /> {job.title}</b>} />
        <div>
          {job.data}
        </div>
      </Card>
    );
  }
  render() {
    // const getNodeKey = ({ treeIndex }) => treeIndex;
    return (
      <div>
        <Row>
          <Col xs={3}>
            <Card>
              <CardActions style={{ textAlign: 'right' }}>
                {this.renderCreate()}
              </CardActions>
              <div>
                {this.renderList(this.state.treeData)}
              </div>
            </Card>
          </Col>
          <Col xs={9}>
            { this.state.currentData !== null &&
              (this.state.currentData.type === 'project' ? this.renderProjectInfo(this.state.currentData) : this.renderJobInfo(this.state.currentData))
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default translate('')(ReviewProject);
// <SortableTree
// canDrag={false}
// treeData={this.state.treeData}
// onChange={treeData => this.setState({ treeData })}
// generateNodeProps={({ node, path }) => ({
//   buttons: [
//     <button
//       onClick={() =>
//         this.setState(state => ({
//           treeData: addNodeUnderParent({
//             treeData: state.treeData,
//             parentKey: path[path.length - 1],
//             expandParent: true,
//             getNodeKey,
//             newNode: {
//               title: `${getRandomName()} ${node.title.split(
//                 ' '
//               )[0]}sson`,
//             },
//           }).treeData,
//         }))}
//     >
//       Add Child
//     </button>,
//     <button
//       onClick={() =>
//         this.setState(state => ({
//           treeData: removeNodeAtPath({
//             treeData: state.treeData,
//             path,
//             getNodeKey,
//           }),
//         }))}
//     >
//       Remove
//     </button>,
//     <div>
//        <b>{node.title}</b>
//     </div>,
//   ],
// })}
// generateNodeProps={({ node, path }) => {
//   const rootLevelIndex =
//     this.state.treeData.reduce((acc, n, index) => {
//       if (acc !== null) {
//         return acc;
//       }
//       if (path[0] === n.id) {
//         return index;
//       }
//       return null;
//     }, null) || 0;
//     const select = node.select ? '#f0f' : '#fff';
//     console.log(node.title, select);
//   return {
//     style: {
//       boxShadow: `0 0 0 2px ${select}`,
//     },
//     onClick: () => this.changeSelect(path),
//   };
// }}
// />
