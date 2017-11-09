
import { Vector2 } from './mathematics/Vector2';
import { Rectangle } from './geometry/Rectangle';

const makeRegion = function (world, viewport, scale) {
  let { width: worldWidth, height: worldHeight } = world;
  
  let zoomedWidth = worldWidth / scale;
  let zoomedHeight = worldHeight / scale; 

  let boundaryWidth = viewport.width / 2;
  let boundaryHeight = viewport.height / 2;

  return new Rectangle(boundaryWidth, boundaryHeight, 
    zoomedWidth - viewport.width, zoomedHeight - viewport.height);
}

export class Camera {
  constructor(context, viewport, world) {
    // make the center of the world as default 
    let { width: ww, height: wh } = world.getSize();
    this.coordinate = Vector2.divideByScalar(new Vector2(ww, wh), 2);
    this.context = context;
    this.viewport = viewport;
    this.world = world;
    this.zoom = 1;
    this.region = makeRegion(this.world.getSize(), this.viewport, this.zoom);
  }

  toWorldCoordinate(point) {
    let tlCorner = Vector2.minus(this.coordinate, 
      new Vector2(this.viewport.width / 2, this.viewport.height / 2));
    return Vector2.plus(point, tlCorner);
  }

  resize(width, height) {
    this.viewport.width = width;
    this.viewport.height = height;
    this.region = makeRegion(this.world.getSize(), this.viewport, this.zoom);
  }

  follow(shift) {    
    // boundary check
    let shiftX = new Vector2(shift.x, 0);
    let shiftY = new Vector2(0, shift.y);
    let testX = this.region.isInside(Vector2.plus(this.coordinate, shiftX));
    let testY = this.region.isInside(Vector2.plus(this.coordinate, shiftY));

    if (testX || testY) {
      this.coordinate = testX ? Vector2.plus(this.coordinate, shiftX) : this.coordinate;
      this.coordinate = testY ? Vector2.plus(this.coordinate, shiftY) : this.coordinate;
      this.projectView();
    }
  }

  scale(delta) {
    let factor = this.zoom + (delta * 0.05);
    
    if (factor <= 1 && factor >= 0.5) {
      this.zoom = factor;
      this.region = makeRegion(this.world.getSize(), this.viewport, this.zoom);
      this.projectView();
    }
  }

  projectView() {

    // local coordinates (on canvas)
    let dstX = 0;
    let dstY = 0;

    let dstWidth = this.viewport.width;
    let dstHeight = this.viewport.height;

    // world coordinates (on imaginary)
    let srcX = this.coordinate.x - (this.viewport.width / 2);
    let srcY = this.coordinate.y - (this.viewport.height / 2);

    let srcWidth = dstWidth;
    let srcHeight = dstHeight;

    this.context.clearRect(0, 0, dstWidth, dstHeight);

    this.context.drawImage(this.world.canvas, srcX * this.zoom, srcY * this.zoom, srcWidth * this.zoom, srcHeight * this.zoom,
      dstX, dstY, this.viewport.width, this.viewport.height);

    this.context.restore();
  }
}

