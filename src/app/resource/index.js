// API call
import axios from 'axios';
import Papa from 'papaparse';
import api from './api.json';
import ftp from './ftp.json';
import sshweb from './sshweb.json';

import moment from 'moment';
// GA
import ReactGA from 'react-ga';

import { getMachineData } from '../redux/MachineData/actionMachineData';
import { getHistoryData } from '../redux/HistoryData/actionHistoryData';
import { errorNotify } from '../redux/Notify/actionNotify';
import { getCreateImagesData } from '../redux/CreateData/actionCreateData';

export const PORT = ':' + api.port;
export const DOMAIN = api.host;

export const ApiURL = DOMAIN + PORT;
export const ApiSIGNIN = ApiURL + '/user/signin';
export const ApiCreateSchedule = ApiURL + '/user/schedule/';
export const ApiCheckInstance = ApiURL + '/machines/remain';
export const ApiGetCalendar = ApiURL + '/machines/calendar/';
export const ApiGetInfo = ApiURL + '/user/schedules/reserved';
export const ApiDeleteSchedule = ApiURL + '/user/schedule/';
export const ApiGetExtDate = ApiURL + '/user/schedule/';
export const ApiPutExtDate = ApiURL + '/user/schedule/';
export const ApiGetHistory = ApiURL + '/user/schedules/history';
export const ApiGetImage = ApiURL + '/images/';
export const ApiGetAll = ApiURL + '/schedule';
export const ApiGetMachine = ApiURL + '/machines/';
export const ApiGetUserCalendar = ApiURL + '/user/resource/calendar';
// User
export const ApiGetUserResources = `${ApiURL}/user/resources/`;
export const ApiGetUserResourceRemind = `${ApiURL}/user/resource/remind`;
export const ApiGetUserResourceCalendar = `${ApiURL}/user/resource/calendar`;

// Admin User
export const ApiCreateUser = `${ApiURL}/admin/user/`;
export const ApiGetAllUsersDetail = ApiURL + '/admin/users/detail/';
export const ApiCreateTransaction = id => `${ApiURL}/admin/user/${id}/transaction`;
export const ApiCreateAvailableResource = id => `${ApiURL}/admin/user/${id}/resource`;
export const ApiPutAvailableResource = (userId, availResId) => `${ApiURL}/admin/user/${userId}/resource/${availResId}`;
export const ApiRemoveAvailableResource = (userId, availResId) => `${ApiURL}/admin/user/${userId}/resource/${availResId}`;

// Admin Machine
export const ApiGetAllMachine = ApiURL + '/admin/machines/';
export const ApiRemoveMachine = ApiURL + '/admin/machine/';
export const ApiPutMachine = ApiURL + '/admin/machine/';
export const ApiCreateMachine = ApiURL + '/admin/machine/';

// Admin Resource
export const ApiGetAllResources = ApiURL + '/admin/resources/';
export const ApiRemoveResource = ApiURL + '/admin/resource/';
export const ApiPutResource = ApiURL + '/admin/resource/';
export const ApiCreateResource = ApiURL + '/admin/resource/';

// FTP
export const FTPHost = ftp.host;
export const FTPPort = ftp.port;
// SshWeb
export const SshWebIP = sshweb.host;
export const SshWebPort = sshweb.port;
export const SshWebHost = SshWebIP + ':' + SshWebPort;
export const SshWebURL = SshWebHost + '/?ssh=ssh://';
// GPU array
export const gpuTypeList = ['v100', 'GTX1080Ti'];
export const gpuAmountList = [1, 2, 3, 4, 5, 6, 7, 8];
// Machine array
export const machineTypeList = ['DGX', 'x86'];
// Charge period
export const valueUnitTypeList = [
  { abbr: 'd', locale: 'common:datetime.day' },
  { abbr: 'w', locale: 'common:datetime.week' },
  { abbr: 'M', locale: 'common:datetime.month' },
  { abbr: 'y', locale: 'common:datetime.year' },
];


// Admin list
export const adminList = ['A40503', 'A60144', 'A30375', '533022', 'A60283'];
// email
export const serviceEmail = 'dnnfarmservice@gmail.com';

// line Id
export const lineId = '@fns6530k';
// line QR code
export const lineQR = 'http://qr-official.line.me/L/ZgEsL_3czm.png';
// fake data
export const DATA = [
  {
    startTime: '2017-01-02',
    endTime: '2017-05-02',
    instance: 'eeny',
    status: 'running',
    image: 'c2c3152907b5',
    project: 'G352BQ2100',
    account: 'information',
    password: 'research',
    dataSet: false,
    dataSetPath: '',
    dataSetId: '',
    dataSetPass: '',
  },
  {
    startTime: '2017-03-22',
    endTime: '2017-06-26',
    instance: 'meeny',
    status: 'stop',
    image: 'fb434121fc77',
    project: 'G352BQ2100',
    account: 'communications',
    password: 'research',
    dataSet: true,
    dataSetPath: '/var/www/html',
    dataSetId: '123',
    dataSetPass: '123456',
  },
  {
    startTime: '2017-08-08',
    endTime: '2017-09-12',
    instance: 'minyMoe',
    status: 'initial',
    image: '91c95931e552',
    project: 'G352BQ2100',
    account: 'laboratories',
    password: 'research',
    dataSet: false,
    dataSetPath: '',
    dataSetId: '',
    dataSetPass: '',
  },
];

export const projectCodeSet = [
  'G352B12100',
  'G352B1Z11X',
  'G352B8Z41X',
  'G353CH6210',
  'F652RXX900',
  'G352J13200',
  'GM523XX00A',
  'G353CH3100',
  'G352BQ2100',
  'F101WD7200',
  'G301AR2H10',
  'G352B84200',
  'F652RXXA00',
  'F652RXX300',
  'G352BB2310',
  'F652RX3000',
  'G101WD7200',
  'G301AR2P20',
  'G301AA3410',
  'G301AR2A20',
  'F652RX1000',
  'G352B1Z10X',
  'G352B84100',
  'G4521E1112',
];

export const orgProject = [
  // {
  //  unit: '00-工研院',
  //  project:[
  //  // {
  //  //  code: 'G357CP0000',
  //  //  name: '',
  //  //  host: '',
  //  //  hostId: '000100'
  //  // }
  //  ]
  // },
  {
    unit: '01-院部',
    project: [],
  },
  {
    unit: '07-量測',
    project: [],
  },
  {
    unit: '14-行政',
    project: [],
  },
  {
    unit: '17-資科',
    project: [],
  },
  {
    unit: '20-產經',
    project: [],
  },
  {
    unit: '21-會計',
    project: [],
  },
  {
    unit: '23-學院',
    project: [],
  },
  {
    unit: '27-南分院',
    project: [],
  },
  {
    unit: '28-技轉法律',
    project: [],
  },
  {
    unit: '29-國際',
    project: [],
  },
  {
    unit: '30-產服',
    project: [],
  },
  {
    unit: '32-競爭力',
    project: [],
  },
  {
    unit: '51-電光',
    project: [],
  },
  {
    unit: '52-資通',
    project: [],
  },
  {
    unit: '53-機械',
    project: [],
  },
  {
    unit: '54-材化',
    project: [],
  },
  {
    unit: '55-綠能',
    project: [],
  },
  {
    unit: '56-生醫',
    project: [],
  },
  {
    unit: '57-中分院',
    project: [],
  },
  {
    unit: '61-顯示',
    project: [],
  },
  {
    unit: '65-服科',
    project: [],
  },
  {
    unit: '67-巨資',
    project: [],
  },
  {
    unit: '68-智慧機械',
    project: [],
  },
  {
    unit: '69-微系統',
    project: [],
  },
  {
    unit: '70-雷射',
    project: [],
  },
];

function filterProject(data, num) {
  const re = new RegExp('^' + num);
  return data.filter(obj => (obj.departmentProfit.match(re)));
}

function readFile(OrgProject) {
  let data = [];
  const csvfile = './res/projectcode.csv';
  let all = OrgProject;
  Papa.parse(csvfile, {
    download: true,
    encoding: 'utf-8',
    header: true,
    complete: (results) => {
      data = results.data;
      let projectAryAll = [];
      OrgProject.map((project, index) => {
        const dep = project.unit.split('-');
        let temp = filterProject(data, dep[0]);
        let projectAry = [];
        // console.log(temp)
        temp.map((obj) => {
          let saveObj = {};
          saveObj.label = obj.pjCode + ' ' + obj.host + ' ' + obj.pjName;
          saveObj.value = obj.pjCode + ',' + obj.host;
          projectAry.push(saveObj);
          projectAryAll.push(saveObj);
          return 0;
        });
        all[index].project = projectAry;
        return results;
        // console.log(all[index].project)
      });
    },
  });
  return all;
}

export const getInfo = async (token) => {
  const result = await axios
    .get(ApiGetInfo, {
      headers: { 'X-Access-Token': token, Accept: 'application/json' },
    })
    .then(res => res)
    .catch(err => err);
  return result;
};

export const createSchedule = async (dispatch, token, createDate) => {
  fetch(ApiCreateSchedule, {
    method: 'post',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      start: moment(createDate.start).format('YYYY-MM-DD'),
      end: moment(createDate.end).format('YYYY-MM-DD'),
      imageId: createDate.imageId,
      machineId: createDate.machineId,
    }),
  })
  .then(response => response.json)
  .then((data) => {
    if (data.code === '401' || data.code === 401) {
      dispatch(errorNotify('ERROR : ' + data.message));
      dispatch(errorNotify('Please, pick another date.'));
      // GA
      ReactGA.event({
        category: 'CreatePage',
        action: 'createSchedule',
        label: 'Failed 401',
      });
    } else if (data.code === '500' || data.code === 500) {
      dispatch(errorNotify('ERROR : ' + data.message));
      // GA
      ReactGA.event({
        category: 'CreatePage',
        action: 'createSchedule',
        label: 'Failed 500',
      });
    } else {
      // GA
      ReactGA.event({
        category: 'CreatePage',
        action: 'createSchedule',
        label: 'Success',
      });
    }
  });
};

export const getImages = async (dispatch, token) => (
  axios.get(ApiGetImage, {
    headers: { 'X-Access-Token': token, Accept: 'application/json' },
  })
    .then(res => dispatch(getCreateImagesData(res.data.images)))
    .catch((err) => {
      console.log(err);
      dispatch(errorNotify('ERROR : get Images'));
    })
);

export const getMachines = async (dispatch, token) => (
  axios.get(ApiGetAllMachine, {
    headers: { 'X-Access-Token': token, Accept: 'application/json' },
  })
    .then(res => dispatch(getMachineData(res.data)))
    .catch((err) => {
      console.log(err);
      dispatch(errorNotify('ERROR : MachineTable'));
    })
);

export const getHistory = async (dispatch, token) => (
  axios.get(ApiGetHistory, {
    headers: { 'X-Access-Token': token, Accept: 'application/json' },
  })
  .then(res => dispatch(getHistoryData(res.data.historySchedules)))
  .catch((err) => {
    console.log(err);
    dispatch(errorNotify('ERROR : HistoryTable'));
  })
);

export const getschedule = async (years) => {
  let data = {};
  for (let i = 1; i < 13; i += 1) {
    let key = years + '-' + i;
    data[key] = 0;
    if (i === 12) {
      const sheduleData = await axios
        .get(ApiGetAll, {
          headers: { Accept: 'application/json' },
          params: { start: key + '-1', end: key + '-31' },
        })
        .then(res => res)
        .catch(err => err);
      data[key] = sheduleData.data.length;
    } else {
      const sheduleData = await axios
        .get(ApiGetAll, {
          headers: { Accept: 'application/json' },
          params: { start: key, end: years + '-' + (i + 1) },
        })
        .then(res => res)
        .catch(err => err);
      data[key] = sheduleData.data.length;
    }
  }
  // console.log(data)
  return data;
};

export const project2017 = readFile(orgProject);

export const machineStatusData = {
  running: 60,
  stop: 20,
};

export const instancesStatusData = {
  running: 15,
  stop: 4,
};

export const instancesMonthlyUsed = {
  '2016-12': 2,
  '2017-1': 13,
  '2017-2': 8,
  '2017-3': 12,
  '2017-4': 23,
  '2017-5': 18,
  '2017-6': 29,
};

export const imageTotalUsed = {
  japripark: 199,
  jojo: 97,
  JigokuShoujo: 127,
  konosuba: 176,
};

export const imageMonthlyUsed = {
  japripark: {
    '2017-3': 32,
    '2017-4': 33,
    '2017-5': 58,
    '2017-6': 19,
  },
  jojo: {
    '2017-3': 8,
    '2017-4': 4,
    '2017-5': 1,
    '2017-6': 3,
  },
  JigokuShoujo: {
    '2017-3': 24,
    '2017-4': 24,
    '2017-5': 21,
    '2017-6': 13,
  },
  konosuba: {
    '2017-3': 24,
    '2017-4': 45,
    '2017-5': 11,
    '2017-6': 23,
  },
};

export const instanceUsing = {
  instanceUse: {
    '2017-3': 102,
    '2017-4': 230,
    '2017-5': 158,
    '2017-6': 179,
  },
};
