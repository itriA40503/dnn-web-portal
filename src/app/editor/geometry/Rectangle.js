
export class Rectangle {
  constructor(left, top, width, height) {
    this.width =  width || 0;
    this.height = height || 0;
    this.left = left || 0;
    this.top = top || 0;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
    this.name = '';
    this.options = {};
  }

  isInside(point) {
    return (this.left < point.x &&
      point.x < this.right &&
      this.top < point.y &&
      point.y < this.bottom)
  }

  isOverlap(rectangle) {
    return (this.left < rectangle.right &&
      rectangle.left < this.right &&
      this.top < rectangle.bottom &&
      rectangle.top < this.bottom);
  }

  drawOptions(options) {
    if (typeof options.stroke == 'undefined') {
      options.stroke = true;
    }

    if (typeof options.radius === 'undefined') {
      options.radius = 5;
    }

    if (typeof options.radius === 'number') {
      options.radius = {tl: options.radius, tr: options.radius, 
        br: options.radius, bl: options.radius};
    } else {
      let defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
      for (let side in defaultRadius) {
        options.radius[side] = options.radius[side] || defaultRadius[side];
      }
    }

    this.options = options;
  }

  transform() {

  }

  draw(context) {

    if (Object.keys(this.options).length === 0) { return; }

    let x = this.left;
    let y = this.top;

    context.beginPath();
    context.moveTo(x + this.options.radius.tl, y);
    context.lineTo(x + this.width - this.options.radius.tr, y);
    context.quadraticCurveTo(x + this.width, y, x + this.width, y + this.options.radius.tr);
    context.lineTo(x + this.width, y + this.height - this.options.radius.br);
    context.quadraticCurveTo(x + this.width, y + this.height, x + this.width - this.options.radius.br, y + this.height);
    context.lineTo(x + this.options.radius.bl, y + this.height);
    context.quadraticCurveTo(x, y + this.height, x, y + this.height - this.options.radius.bl);
    context.lineTo(x, y + this.options.radius.tl);
    context.quadraticCurveTo(x, y, x + this.options.radius.tl, y);
    context.closePath();

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
      radius: 30
    };
  }
}