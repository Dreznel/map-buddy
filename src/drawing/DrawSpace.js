import React, {Component} from 'react';
import { SketchPad, TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_ELLIPSE }
  from 'react-sketchpad/lib';


//Following the example here:
//https://github.com/svrcekmichal/react-sketchpad/blob/master/example/SketchExample.jsx
class DrawSpace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tool:TOOL_PENCIL,
      size: 2,
      color: '#000000',
      fill: false,
      fillColor: '#444444',
      items: []
    }
  }

  render() {
    return (
      <div>
        <p>Your dungeon, here.</p>
        <SketchPad
          class="drawing-area"
          width={500}
          height={500}
          animate={true}
          size={this.state.size}
          color={this.state.color}
          fillColor={this.state.fill ? this.state.fillColor : ''}
          items={this.state.items}
          tool={this.state.tool}
        />
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
