import React, {Component} from 'react';
import { SketchPad, TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_ELLIPSE }
  from 'react-sketchpad/lib';
import PracticeCanvas from './PracticeCanvas'

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
      roomKey: 100,
      tool: tool,
      size: size,
      color: color,
      fill: fill,
      fillColor: fillColor,
    ///*
      rooms: [
        <SketchPad
          roomKey={100}
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
      //*/
      /*
      rooms: [
        <p> TEST: Room Key, Origin: 99 </p>
      ]
      //*/
    }

    this.resetSketchpad = this.resetSketchpad.bind(this);
    this.getCurrentRoom = this.getCurrentRoom.bind(this);
    this.getPreviousRooms = this.getPreviousRooms.bind(this);
  }

  resetSketchpad() {
    let newKey = this.state.roomKey + 1
    let blankPad =
      <SketchPad
        roomKey={newKey}
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
      let paragraph = <p>TEST Room key {this.state.roomKey}</p>
      this.setState(prevState =>
        ({
          rooms: [...prevState.rooms, blankPad],
          //rooms: [...prevState.rooms, paragraph],
          //rooms: [blankPad],
          roomKey: newKey
        })
      )
  }

  getCurrentRoom() {
    return this.state.rooms[this.state.rooms.length - 1]
    //return this.state.rooms[0];
  }

  getPreviousRooms() {
    let rooms = [];
    for(let i=this.state.rooms.length - 2; i>= 0; i--) {
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
          <h3>Testing Zone</h3>
          <PracticeCanvas text="THE DUNGEON"/>
        </div>
        <div>
        <h3>Current Room</h3>
        {this.getCurrentRoom()}
        </div>
        <div>
          <h3>Previous Rooms</h3>
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
