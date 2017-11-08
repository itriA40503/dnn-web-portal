
import { Rectangle } from '../geometry/Rectangle';

export class TextField {
  constructor(text) {
    this.text = text;
    this.font = '20px monospace';
    this.rectange = Rectangle(0, 0, );
  }

  draw(context) {
    context.font = this.font;
    context.textAlign = 'right';
    let estimate = context.measureText(this.text);
    context.fillText(this.text, estimate.width, 20);
  }
}