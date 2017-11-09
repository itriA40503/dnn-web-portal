
import { Grid } from './utils/Grid';
import { RenderList } from './RenderList';

export class World {
  constructor(width, height) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = width;
      this.canvas.height = height;

      Grid.draw(this.canvas, Grid.minor);
      Grid.draw(this.canvas, Grid.major);
    
      let context = this.canvas.getContext('2d');
      this.empty = new Image();
      this.empty.src = context.canvas.toDataURL('image/png');

      this.renderList = new RenderList(this.canvas);
  }

  blank() {
    let context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context.drawImage(this.empty, 0, 0, this.canvas.width, this.canvas.height,
      0, 0, this.canvas.width, this.canvas.height);
    context.restore();
  }

  render(callback = function(){}) {
    this.blank();
    this.renderList.render();
  }

  getSize() {
    return { width: this.canvas.width, height: this.canvas.height };
  }
}