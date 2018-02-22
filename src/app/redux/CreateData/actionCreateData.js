export const getCreateResData = resId => ({
  type: 'GET_CREATE_RES_DATA',
  resId,
});

export const getCreateAmountData = amount => ({
  type: 'GET_CREATE_AMOUNT_DATA',
  amount,
});

export const getCreateImageData = image => ({
  type: 'GET_CREATE_IMAGE_DATA',
  image,
});

export const getCreateStartDateData = start => ({
  type: 'GET_CREATE_START_DATE_DATA',
  start,
});

export const getCreateEndDateData = end => ({
  type: 'GET_CREATE_END_DATE_DATA',
  end,
});

export const getCreateCalendarData = cal => ({
  type: 'GET_CREATE_CALENDAR_DATA',
  cal,
});

export const getCreateMachineData = machineId => ({
  type: 'GET_CREATE_MACHINE_DATA',
  machineId,
});

export const cleanCreateData = () => ({
  type: 'CLEAN_CREATE_DATA',
});
