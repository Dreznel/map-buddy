import React, { Component } from 'react';
import graphPaper from '../images/graphPaper.PNG';

class PracticeCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousRooms: [

      ]
    }

    this.saveRoom = this.saveRoom.bind(this);
    this.renderPreviousRooms = this.renderPreviousRooms.bind(this);
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const img = this.refs.image;

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

  render() {

    return (
      <div>
        <button onClick={this.saveRoom}>Nemo touched the button</button>
        <canvas ref="canvas" width={730} height={630} />
        <img ref="image"
          src={graphPaper}
          className="hidden"
          style={{display: "none"}}
        />
        <div>
          {this.renderPreviousRooms()}
        </div>
      </div>
    )
  }
}

export default PracticeCanvas;
