import React, { Component } from 'react';
import graphPaper from '../images/graphPaper.PNG';
import { Pencil } from 'react-sketchpad/lib/tools';

class PracticeCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousRooms: [

      ]
    }

    this.saveRoom = this.saveRoom.bind(this);
    this.renderPreviousRooms = this.renderPreviousRooms.bind(this);
    this.drawLine = this.drawLine.bind(this);
    this.drawStuff = this.drawStuff.bind(this);
    this.getRealCoordinates = this.getRealCoordinates.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);

    this.initTool = this.initTool.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    //this.onDebouncedMove = this.onDebouncedMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const img = this.refs.image;

    this.initTool(this.props.tool);

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.font = "40px Courier";
      ctx.fillText(this.props.text, 25, 35);
    }
  }

  saveRoom() {
    const canvas = this.refs.canvas;
    const dataURL = canvas.toDataURL();
    const newImage = <img
      src={dataURL}
      style={{
        maxHeight:"200px",
        maxWidth:"200px",
        margin: "5px"
      }}
      onClick={ (event) => alert("Reloading older room... (jk)")}
    />
    this.setState( previousState => (
        {
          previousRooms: [...previousState.previousRooms, newImage]
        }
      )
    )
  }

  renderPreviousRooms() {
    let rooms = [];
    for(let i=0; i<this.state.previousRooms.length; i++){
      rooms.push(this.state.previousRooms[i]);
    }
    return rooms;
  }

  //! This is only needed for mouseclicks because those aren't already
  //relative to the canvas.
  getRealCoordinates(relativeX, relativeY) {
    const {top, left} = this.refs.canvas.getBoundingClientRect();
    return [
      relativeX - left,
      relativeY - top
    ];
  }

  drawLine() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(500, 500);
    //ctx.lineTo(...this.getRealCoordinates(500, 500));
    ctx.stroke();
  }

  //this.refs.canvas.getBoundingClientRect()

  drawStuff() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 50);
    ctx.lineTo(50, 50);
    ctx.lineTo(50, 100);
    //ctx.arcTo(100, 100, 50, 105, 50)
    ctx.stroke();
  }

  clearCanvas() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    //ctx.clearRect(0,0,canvas.width, canvas.height);
    const img = this.refs.image;
    ctx.drawImage(img, 0, 0);
    ctx.font = "40px Courier";
    ctx.fillText(this.props.text, 25, 35);
  }

  render() {

    return (
      <div>
        <div>
          <button onClick={this.saveRoom}>Nemo touched the button</button>
          <button onClick={this.drawLine}>Draw a line</button>
          <button onClick={this.drawStuff}>Draw other stuff</button>
          <button onClick={this.clearCanvas}>Clear</button>
        </div>
        <div>
          <canvas
            class="canvas"
            ref="canvas"
            width={500}
            height={500}

          />
          <img ref="image"
            src={graphPaper}
            className="hidden"
            style={{display: "none"}}
          />
        </div>
        <div>
          {this.renderPreviousRooms()}
        </div>
      </div>
    )
  }

  /*
              onMouseDown={this.onMouseDown}
              onMouseMove={this.onMouseMove}
              onMouseOut={this.onMouseUp}
              onMouseUp={this.onMouseUp}
              onTouchStart={this.onTouchStart}
              onTouchEnd={this.onTouchEnd}
              onTouchMove={this.onTouchMove}
  */


/*
  The following code is taken from react-sketchpad and will be modified
  to fit this application.
*/

  initTool(tool) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    this.tool = Pencil(this.ctx);
  }

  onMouseDown(e) {
    const data = this.tool.onMouseDown(...this.getCursorPosition(e), this.props.color, this.props.size, this.props.fillColor);
    data && data[0] && this.props.onItemStart && this.props.onItemStart.apply(null, data);
  //  if (this.props.onDebouncedItemChange) {
  //    this.interval = setInterval(this.onDebouncedMove, this.props.debounceTime);
  //  }
  }

  onTouchStart(e) {
    let firstTouch = e.targetTouches[0];
    const data = this.tool.onMouseDown(...this.getTouchPosition(firstTouch), this.props.color, this.props.size, this.props.fillColor);
    //if (this.props.onDebouncedItemChange) {
    //  this.interval = setInterval(this.onDebouncedMove, this.props.debounceTime);
    //}
    //e.preventDefault();
  }

/*
  onDebouncedMove() {
    if (typeof this.tool.onDebouncedMouseMove == 'function' && this.props.onDebouncedItemChange) {
      this.props.onDebouncedItemChange.apply(null, this.tool.onDebouncedMouseMove());
    }
  }
*/
  onMouseMove(e) {
    const data = this.tool.onMouseMove(...this.getCursorPosition(e));
    data && data[0] && this.props.onEveryItemChange && this.props.onEveryItemChange.apply(null, data);
  }

  onTouchMove(e) {
    let firstTouch = e.targetTouches[0];
    const data = this.tool.onMouseMove(...this.getTouchPosition(firstTouch));
    //data && data[0] && this.props.onEveryItemChange && this.props.onEveryItemChange.apply(null, data);
    //e.preventDefault();
  }

  onMouseUp(e) {
    const data = this.tool.onMouseUp(...this.getCursorPosition(e));
    data && data[0] && this.props.onCompleteItem && this.props.onCompleteItem.apply(null, data);
    //if (this.props.onDebouncedItemChange) {
    //  clearInterval(this.interval);
    //  this.interval = null;
    //}
  }

  onTouchEnd(e) {
    let firstTouch = e.changedTouches[0];
    const data = this.tool.onMouseUp(...this.getTouchPosition(firstTouch));
    data && data[0] && this.props.onCompleteItem && this.props.onCompleteItem.apply(null, data);
    //if (this.props.onDebouncedItemChange) {
  //    clearInterval(this.interval);
  //    this.interval = null;
  //  }
    //e.preventDefault();
  }

  getCursorPosition(e) {
    const {top, left} = this.refs.canvas.getBoundingClientRect();
    return [
      e.clientX - left,
      e.clientY - top
    ];
  }

  getTouchPosition(touch) {
    const {top, left} = this.refs.canvas.getBoundingClientRect();
    return [
      touch.clientX - left,
      touch.clientY - top
    ]
  }
}

export default PracticeCanvas;
