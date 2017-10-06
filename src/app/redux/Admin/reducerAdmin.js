export default function (state = 0, action) {
  switch (action.type) {
    case 'Increase_COUNT':
      return state + 1;
    case 'Decrease_COUNT':
      return state - 1;
    default:
      return state;
  }
}
