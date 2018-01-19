import React, { Component } from 'react';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';
// i18n
import { translate } from 'react-i18next';

import { Card, CardText, CardMedia, CardTitle, CardHeader, CardActions } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { muiStyle } from '../../myTheme';

class ReviewProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        { title: 'Project1',
          expanded: true,
          data:'123',
          select: false,
          children: [
            { title: 'job1' }, { title: 'job2' }, { title: 'job3' }, { title: 'job3' }
          ],
        },
        { title: 'Project2',
          expanded: true,
          data:'123',
          select: false,
          children: [{ title: 'job' }],
        },
      ],
      open: false,
    };
  }
  changeSelect = node => {
    console.log(node);
  }
  addProject = (data) => {

  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleSubmit = () => {

  };
  renderList = (data) => {
    return (
      <List>
        {data.map(obj => (
          <ListItem
            initiallyOpen
            primaryText={obj.title}
            nestedItems={obj.children.map(job =>(
              <ListItem primaryText={job.title} />
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
        label={this.state.confirm ? 'OK' : t('common:submit')}
        secondary={true}
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
      <div>
        <FlatButton
          style={{ color: muiStyle.palette.primary1Color }}
          label={'+'}
          labelPosition="before"
          onTouchTap={this.handleOpen()}
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
          <TextField />
        </Dialog>
      </div>
    );
  }
  render() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    return (
      <Card>
        <div>
          {this.renderList(this.state.treeData)}
        </div>
      </Card>
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
