import { combineReducers } from 'redux';
import Notify from '../Notify/reducerNotify';
import Admin from '../Admin/reducerAdmin';
import HistoryData from '../HistoryData/reducerHistoryData';
import MachineData from '../MachineData/reducerMachineData';
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
  notify: Notify,
  admin: Admin,
  historyData: HistoryData,
  machineData: MachineData,
});

export default allReducers;
