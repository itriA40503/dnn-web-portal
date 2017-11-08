
let zCounter = 0;

class Wrapper {
  constructor(object, idx) {
    this.item = object;
    this.zndex = zCounter;
    this.index = idx;
  }
}

const reSequence = function(list) {
  let sequence = 0;
  for (let drawing in list) {
    drawing.index = sequence;
    sequence = sequence + 1;
  }
}

export const Priority = {
  'Low': 0,
  'Medium': 1,
  'High': 2
}

export class RenderList {
  constructor(canvas) {
    this.list = [[], [], []];
    this.canvas = canvas;
  }

  render() {

    let context = this.canvas.getContext('2d');
    /**
     * Low priority drawing should rendering first, because when overlapping
     * happened, current drawing will be covered by after drawing
     */
    for (let priority of [0, 1, 2]) {
      for (let drawing of this.list[priority]) {
        console.log(drawing);
        drawing.item.draw(context);
      }
    }
  }

  add(object, priority) {
    this.list[priority].push(new Wrapper(object));
  }

  find(idx) {

  }

  remove(idx) {
    for (let priority of [0, 1, 2]) {
      for (let drawing of this.list[priority]) {
        if (drawing.id == idx) {
          this.list.splice(drawing.index, 1);
        }
      }
    }
  }

  hit(point) {
    let possible= null;
    console.log(this.list);

    for (let priority of [0, 1, 2]) {
      for (let drawing of this.list[priority]) {
        console.log(drawing);
        if (drawing.item.isInside(point)) {
          if (possible === null) {
            possible = drawing
          } else {
            possible = possible.zndex > drawing.item.zndex ? 
              possible : drawing;
          }
        }
      }
    }

    return possible != null ? possible : null;
  }
}