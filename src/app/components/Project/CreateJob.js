import React, { Component } from 'react';
// i18n
import { translate } from 'react-i18next';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

// Color
import { muiStyle } from '../../myTheme';

class CreateJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dataSet: null,
      model: null,
      network: null,
      newJobName: null,
    };
  }
  handleChange = (event, value) => this.setState({ [event.target.name]: value });
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  renderDataSetField = () => (
    <SelectField
      floatingLabelText={'DataSet'}
      onChange={(event, index, value) => this.setState({ dataSet: value })}
      value={this.state.dataSet}
    >
      {['Data1', 'Data2', 'Data3', 'Data4'].map(type => (
        <MenuItem
          key={type}
          value={type}
          primaryText={type}
        />
      ))}
    </SelectField>
  );
  renderModelField = () => (
    <SelectField
      floatingLabelText={'Model'}
      onChange={(event, index, value) => this.setState({ model: value })}
      value={this.state.model}
    >
      {['Model', 'Model2', 'Model3', 'Model4'].map(type => (
        <MenuItem
          key={type}
          value={type}
          primaryText={type}
        />
      ))}
    </SelectField>
  );
  renderNetworkField = () => (
    <SelectField
      floatingLabelText={'Network'}
      onChange={(event, index, value) => this.setState({ network: value })}
      value={this.state.network}
    >
      {['Network', 'Network2', 'Network3', 'Network4'].map(type => (
        <MenuItem
          key={type}
          value={type}
          primaryText={type}
        />
      ))}
    </SelectField>
  );
  render() {
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
          label={'Create Job'}
          onTouchTap={() => this.handleOpen()}
          icon={<ContentAdd />}
        />
        <Dialog
          title={
            <div>
              <b>
                {'Create Job'}
              </b>
            </div>
          }
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div>
            <TextField
              onChange={this.handleChange}
              floatingLabelText={'Job Name'}
              name={'newJobName'}
            />
          </div>
          <div>{this.renderDataSetField()}</div>
          <div>{this.renderModelField()}</div>
          <div>{this.renderNetworkField()}</div>
        </Dialog>
      </div>
    );
  }
}
export default translate('')(CreateJob);
