
import { green100, teal200 } from 'material-ui/styles/colors';

let major = {
  color: teal200,
  separation: 250
};

let minor = {
  color: green100,
  separation: 50
}

const setMajorGrid = function(color, separation) {
  major.color = color;
  major.separation = separation;
}

const setMinorGrid = function (color, separation) {
  minor.color = color;
  minor.separation = separation;
}

const drawGrid = function(canvas, options) {

  let width = canvas.width;
  let height = canvas.height;

  let context = canvas.getContext('2d');

  context.strokeStyle = options.color;
  context.strokeWidth = 1;

  context.beginPath();

  let count = Math.floor(width / options.separation);
  let x, y = null;

  for (let idx = 1; idx <= count; idx++) {
    x = (idx * options.separation);
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  count = Math.floor(height / options.separation);

  for (let idy = 1; idy <= count; idy++) {
    y = (idy * options.separation);
    context.moveTo(0,  y);
    context.lineTo(width, y);
    context.stroke();
  }

  context.closePath();
  context.restore();
}

// namespace
export let Grid = {
  major: major,
  setMajorOption: setMajorGrid,

  minor: minor,
  setMinorOption: setMinorGrid,

  draw: drawGrid
};