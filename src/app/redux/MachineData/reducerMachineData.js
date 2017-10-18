export default function (state = [], action) {
  switch (action.type) {
    case 'GET_MACHINE_DATA':
      return action.data;
    default:
      break;
  }
  return state;
}
