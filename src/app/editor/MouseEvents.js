
import { Vector2 } from './mathematics/Vector2';
import { Rectangle } from './geometry/Rectangle';
import { Circle } from './geometry/Circle';
import { Spline } from './geometry/Spline';
import { Priority } from './RenderList';

const warning = function() {
  console.log('Please setup with bind');
}

let status = {
  last: new Vector2(-1, -1),
  lastHit: null,
  isDown: false,
  isFromCircle: false,
}

/**
 * 
 * @param {*} event 
 */
const mouseClick = function(event) {

}


/**
 * 
 * @param {*} event 
 */
const mouseDoubleClick = function(event) {
  console.log('MouseDoubleClick');

  let editor = this;
  let wcoord = editor.camera.toWorldCoordinate(new Vector2(event.offsetX, event.offsetY));
  
  //let drawing = new Rectangle(wcoord.x - 150, wcoord.y - 50, 300, 100);
  //drawing.drawOptions(Rectangle.defaultOptions());

  let drawing = new Circle(wcoord, 30);
  drawing.name = 'connector';
  drawing.drawOptions(Circle.defaultOptions());

  editor.world.renderList.add(drawing, Priority.High);

  editor.world.render();
  editor.camera.projectView();
  console.log(status.isDown);
}


/**
 * 
 * @param {*} event 
 */
const mouseDownEvent = function(event) {
  console.log('MouseDown');
  event.preventDefault();
  let editor = this;
  status.isDown = true;
  status.last = new Vector2(event.offsetX, event.offsetY);
  
  let wcoord = editor.camera.toWorldCoordinate(status.last);
  let hitObject = this.world.renderList.hit(wcoord);

  if (hitObject != null && hitObject.item.name == 'connector') {
    status.isFromCircle = true;
    status.lastHit = hitObject;
    this.world.renderList.add(new Spline(hitObject.item.center, wcoord), Priority.Medium);
  }
}


/**
 * Mouse move event for graph editor, notice: must bind with GraphEditor
 * @param {*} event 
 */
const mouseMoveEvent = function(event) {
  console.log('MouseMove');

  if (status.isDown) {
    let editor = this;
    let current = new Vector2(event.offsetX, event.offsetY);
    let difference = Vector2.minus(status.last, current);

    /**
     * Draw a connection spline from circle to target
     */
    if (status.isFromCircle) {
      let wcoord = editor.camera.toWorldCoordinate(current);
      status.connectorHandler.changeEnd(wcoord);
      editor.world.render();
      editor.camera.projectView();
    }
    
    /**
     * Incremental value means user dragging down the canvas, but
     * moving effect should be up the canvas
     */
    if (status.isFromCircle === false) {
      editor.camera.follow(Vector2.multiplyByScalar(difference, 1));
      status.last = current;
    }
  }
};


/**
 * 
 * @param {*} event 
 */
const mouseUpEvent = function(event) {
  console.log('MouseUp');
  status.isDown = false;
  status.isFromCircle = false;
  status.hitObject = null;
}


/**
 * Mouse wheel event for graph editor, notice: must bind with GraphEditor
 * @param {*} event 
 */
const mouseWheelEvent = function(event) {
  let editor = this;
  if (editor) {
    let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    editor.camera.scale(delta * -1);
  }
}


export let MouseEvents = {
  whenClick: mouseClick,
  whenDragging: null,
  whenDoubleClick: mouseDoubleClick,
  whenMouseDown: mouseDownEvent,
  whenMouseMove: mouseMoveEvent,
  whenMouseUp: mouseUpEvent,
  whenMouseWheel: mouseWheelEvent,
  whenMouseOver: null,
}


export let KeyboardEvents = {

}