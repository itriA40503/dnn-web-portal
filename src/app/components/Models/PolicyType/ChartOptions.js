
let chartOptionsTemplate = {
  scales: {
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Training (%)',
      },
      ticks: {
        callback: (label) => { return (label % 9) === 0 ? label : null; },
      },
      gridLines: {
        display: false,
      },
    }],
    yAxes: [{
      gridLines: {
        display: false,
      },
    }],
  },
};

let chartDataTemplate = {
  labels: null,
  datasets: [
    {
      label: 'Decay',
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: null,
    },
  ],
};

// internal function
const floatPrecise = (a) => {
  let e = 1;
  while (Math.round(a * e) / e !== a) {
    e *= 10;
  }
  return Math.log(e) / Math.LN10;
};

const optionsTemplate = function customFromOptions() {
  let cloned = { ...chartOptionsTemplate };
  return cloned;
};

const dataTemplate = function customFromData(labels, value) {
  let cloned = { ...chartDataTemplate };
  cloned.labels = labels;
  cloned.datasets[0].data = value;
  return cloned;
};

const ChartOpt = { optionsTemplate, dataTemplate };

export default ChartOpt;
