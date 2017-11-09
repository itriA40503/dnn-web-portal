
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { World } from '../editor/World';
import { Camera } from '../editor/Camera';
import { MouseEvents } from '../editor/MouseEvents';

const styles = {
  content: {
    display: 'flex',
    flex: 1,
  },
  componenet: {
    display: 'flex', 
    flex: 1,
    width: '300px'
  }
}

class GraphEditor extends Component {

  constructor(props, context) {

    super(props, context);
    
    this.world = new World(3000, 3000);
    this.camera = null;
  
    this.resizeHandler = () => {
      let canvas = ReactDOM.findDOMNode(this.refs.editor);
      let subElement = document.getElementsByClassName('body')[0].children[0];
      let style = window.getComputedStyle(subElement, null);

      /**
       * More correctly way was: top + bottom and left + right
       */
      let padding = parseFloat(style.getPropertyValue('padding'));
      canvas.height = subElement.clientHeight - (padding * 2);
      canvas.width = subElement.clientWidth - (padding * 2);

      let viewport = { startX: 0, startY: 0, width: canvas.width, height: canvas.height };
      let context = canvas.getContext('2d');
      this.camera = new Camera(context, viewport, this.world);
      this.camera.projectView();
    }
  }

  componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this.refs.editor);
    window.addEventListener('resize', this.resizeHandler);
    this.resizeHandler();

    canvas.addEventListener('mousedown', MouseEvents.whenMouseDown.bind(this));
    canvas.addEventListener('mousemove', MouseEvents.whenMouseMove.bind(this));
    canvas.addEventListener('mouseup', MouseEvents.whenMouseUp.bind(this));

    //canvas.addEventListener('mousewheel', MouseEvents.whenMouseWheel.bind(this));

    canvas.addEventListener('dblclick', MouseEvents.whenDoubleClick.bind(this));
  }

  componenetDidUpdate() {
    this.camera.projectView();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  render () {
    return (
      <div style={styles.content}>
        <div id="componenet"></div>
        <div id="visualize" style={styles.content}>
          <canvas ref="editor"/>
        </div>
        <div id="attribute"></div>
        <div style={styles.minimap}></div>
      </div>
    );
  }

}


export default (GraphEditor);
