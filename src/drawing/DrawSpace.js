import React, {Component} from 'react';
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
    }
  }

  render() {
    return (
      <div>
        <p>Your dungeon, here.</p>
        <div>
          <h3>Testing Zone</h3>
          <PracticeCanvas text="THE DUNGEON"/>
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
