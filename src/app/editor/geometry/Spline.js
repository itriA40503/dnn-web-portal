
import { Vector2 } from '../mathematics/Vector2';

export class Spline {
  constructor (start, end) {
    this.start = start;
    this.end = end;
    this.distance = Vector2.euclidean(start, end);
    this.name = '';
    this.options = {};
  }

  changeEnd(end) {
    this.end = end;
    this.distance = Vector2.euclidean(this.start, this.end);
  }

  isInside(point) {
    /**
     * there is no definition about point inside the line (curve)
     */
    return false;
  }

  drawOptions(options) {
    this.options = options;
  }

  draw(context) {
    if (Object.keys(this.options).length === 0) { return; }

    context.beginPath();
    context.moveTo(this.start.x, this.start.y);
    context.bezierCurveTo(this.start.x + this.distance * 0.25, this.start.y, 
      this.end.x - this.distance * 0.25, this.end.y, 
      this.end.x, this.end.y);

    if (this.options.fill) {
      context.fillStyle = this.options.fillStyle ? this.options.fillStyle : '#000000';
      context.fill();
    }

    if (this.options.stroke) {
      context.strokeStyle = this.options.strokeStyle ? this.options.strokeStyle : '#000000';
    }

    context.lineWidth = this.options.lineWidth;

    context.stroke();
    context.restore();
  }

  static defaultOptions() {
    return {
      fill: true,
      fillStyle: '#ffffff',
      stroke: true,
      strokeStyle: '#000000',
      lineWidth: 5
    }
  }
}