import React, {Component} from 'react';
import { SketchPad, TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_ELLIPSE }
  from 'react-sketchpad/lib';

//Following the example here:
//https://github.com/svrcekmichal/react-sketchpad/blob/master/example/SketchExample.jsx
class DrawSpace extends Component {
  constructor(props) {
    super(props);

    let tool:TOOL_PENCIL;
    let size: 2;
    let color: '#000000';
    let fill: false;
    let fillColor: '#444444';
    let items = [];

    this.state = {
      tool: tool,
      size: size,
      color: color,
      fill: fill,
      fillColor: fillColor,
      rooms: [
        <SketchPad
          class="drawing-area"
          width={500}
          height={500}
          animate={true}
          size={size}
          color={color}
          fillColor={fill ? fillColor : ''}
          items={items}
          tool={tool}
        />
      ]
    }

    this.resetSketchpad = this.resetSketchpad.bind(this);
    this.getCurrentRoom = this.getCurrentRoom.bind(this);
    this.getPreviousRooms = this.getPreviousRooms.bind(this);
  }

  resetSketchpad() {
    let blankPad =
      <SketchPad
        class="drawing-area"
        width={500}
        height={500}
        animate={true}
        size={this.state.size}
        color={this.state.color}
        fillColor={this.state.fill ? this.state.fillColor : ''}
        items={[]}
        tool={this.state.tool}
      />
      this.setState(prevState =>
        ({
          rooms: [...prevState.rooms, blankPad]
        })
      )
  }

  getCurrentRoom() {
    //return this.state.rooms[this.state.rooms.length - 1]
    return this.state.rooms[0];
  }

  getPreviousRooms() {
    let rooms = [];
    for(let i=0; i<this.state.rooms.length - 1; i++) {
      rooms.push(this.state.rooms[i])
    }
    return rooms;
  }

  render() {
    return (
      <div>
        <p>Your dungeon, here.</p>
        <div>
          <button onClick={this.resetSketchpad}>Save</button>
        </div>
        <div>
          {this.getCurrentRoom()}
        </div>
        <div>
          {this.getPreviousRooms()}
        </div>
      </div>
    )
  }
}

export default DrawSpace

/*
width={500}
height={500}
animate={true}
size={this.state.size}
color={this.state.color}
fillColor={'#444444'}
items={[]}
tool="TOOL_PENCIL"
*/
