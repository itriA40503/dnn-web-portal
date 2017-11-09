
import { Vector2 } from '../mathematics/Vector2';

export class Circle {
  constructor (center, radius) {
    this.center = center;
    this.radius = radius;
    this.name = '';
    this.options = {};
  }

  isInside(point) {
    return this.radius > Vector2.euclidean(point, this.center);
  }

  drawOptions(options) {
    this.options = options;
  }

  draw(context) { 
    if (Object.keys(this.options).length === 0) { return; }

    context.beginPath();
    context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);

    if (this.options.fill) {
      context.fillStyle = this.options.fillStyle ? this.options.fillStyle : '#000000';
      context.fill();
    }

    if (this.options.stroke) {
      context.strokeStyle = this.options.strokeStyle ? this.options.strokeStyle : '#000000';
    }

    context.stroke();
    context.restore();
  }

  static defaultOptions() {
    return {
      fill: true,
      fillStyle: '#ffffff',
      stroke: true,
      strokeStyle: '#000000',
    };
  }
}