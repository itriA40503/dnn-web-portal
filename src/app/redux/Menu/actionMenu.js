const defaultMenu = {
  Dashboard: false,
  Instance: false,
  History: false,
  Create: false,
  Resource: false,
  Project: false,
  DataSet: false,
  Models: false,
  Network: false,
};

export const selectMenu = currentMenu => ({ type: 'open', currentMenu });
