export default function (state = 0, action) {
  switch (action.type) {
    case 'open':
      return action.currentMenu;
    default:
      return 'Dashboard';
  }
}
