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

    //this.initTool = this.initTool.bind(this);
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
    this.ctx = canvas.getContext("2d");
    const img = this.refs.image;

    //this.initTool(this.props.tool);

    img.onload = () => {
      this.ctx.drawImage(img, 0, 0);
      this.ctx.font = "40px Courier";
      this.ctx.fillText(this.props.text, 25, 35);
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

    this.clearCanvas();
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

  clearCanvas() {
    //this.ctx.clearRect(0,0,canvas.width, canvas.height);
    const img = this.refs.image;
    this.ctx.drawImage(img, 0, 0);
    this.ctx.font = "40px Courier";
    this.ctx.fillText(this.props.text, 25, 35);
  }

  drawLine() {
    this.ctx.beginPath();
    this.ctx.moveTo(0,0);
    this.ctx.lineTo(500, 500);
    //this.ctx.lineTo(...this.getRealCoordinates(500, 500));
    this.ctx.stroke();
  }

  //this.refs.canvas.getBoundingClientRect()

  drawStuff() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, 50);
    this.ctx.lineTo(50, 50);
    this.ctx.lineTo(50, 100);
    //ctx.arcTo(100, 100, 50, 105, 50)
    this.ctx.stroke();
  }

  onMouseDown(e) {
    console.log("Mouse Down: " + this.getCursorPosition(e));
    this.ctx.beginPath();
    this.ctx.moveTo(...this.getCursorPosition(e));
  }

  onMouseUp(e) {
    console.log("Mouse Up: " + this.getCursorPosition(e));
    this.ctx.lineTo(...this.getCursorPosition(e));
    this.ctx.stroke();
  }

  onMouseMove(e) {

  }

  onTouchStart(e){}
  onTouchEnd(e){}
  onTouchMove(e){}

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

  render() {

    return (
      <div>
        <div>
          <button onClick={this.saveRoom}>Leave Room</button>
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
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
          />
          <img ref="image"
            src={graphPaper}
            className="hidden"
            style={{display: "none"}}
          />
        </div>
        <div>
          <h3>Previous Rooms</h3>
          {this.renderPreviousRooms()}
        </div>
      </div>
    )
  }
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



export default PracticeCanvas;
