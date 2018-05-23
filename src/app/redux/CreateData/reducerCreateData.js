import moment from 'moment';
const initData = {
  resId: null,
  amount: null,
  image: null,
  start: null,
  end: null,
  cal: null,
  machineId: null,
  images: null,
  imageId: null,
  availRes: null,
};
export default function (state = initData, action) {
  switch (action.type) {
    case 'GET_CREATE_RES_DATA':
      return Object.assign({}, state, {
        resId: action.resId,
      });
    case 'GET_CREATE_AMOUNT_DATA':
      return Object.assign({}, state, {
        amount: action.amount,
      });
    case 'GET_CREATE_AVAILRES_DATA':
      return Object.assign({}, state, {
        availRes: action.availRes,
      });
    case 'GET_CREATE_IMAGE_DATA':
      return Object.assign({}, state, {
        iamge: action.image,
      });
    case 'GET_CREATE_START_DATE_DATA':
      return Object.assign({}, state, {
        start: action.start,
      });
    case 'GET_CREATE_END_DATE_DATA':      
      const availableMachines = state.cal.filter(o => (moment(o.date).isBetween(state.start, moment(action.end).endOf('day')) && o.availableNum > 0));
      return Object.assign({}, state, {
        end: action.end,
        machineId: (availableMachines.length > 0 ? availableMachines[0].available[0] : null),
      });
    case 'GET_CREATE_CALENDAR_DATA':
      return Object.assign({}, state, {
        cal: action.cal,
      });
    case 'GET_CREATE_IMAGES_DATA':
      return Object.assign({}, state, {
        images: action.images,
      });
    case 'GET_CREATE_IMAGE_ID_DATA':
      return Object.assign({}, state, {
        imageId: action.imageId,
      });
    case 'GET_CREATE_MACHINE_DATA':
      return Object.assign({}, state, {
        machineId: action.machineId,
      });
    case 'CLEAN_CREATE_DATA':
      return Object.assign({}, state, initData);
    default:
      return state;
  }
}
