/*
#######################################################################
#
# Copyright (C) 2025-2026 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/
/*
#######################################################################
#######               DO NOT MODIFY THIS FILE               ###########
#######################################################################
*/

import React from 'react';

import Tree from './view/Tree';
import data from './model/data';

/**
 * Simple component with limited state.
 */
class App extends React.Component {
  /**
   * Constructor
   * @param {object} props properties
   */
  constructor(props) {
    super(props);
    this.treeRef = React.createRef();
    this.state = {json: ''};
  }

  json() {
    this.setState({json:
      JSON.stringify(this.treeRef.current.raw(), null, 2)},
    );
  }

  clear() {
    this.setState({json: ''});
  }

  /**
   * @returns {object} a <div> containing Tree and JSON components
   */
  render() {
    return (
      <div>
        <button onClick={() => this.json()}>JSON</button>
        <button onClick={() => this.clear()}>Clear</button>
        <p/>
        <Tree data={data} ref={this.treeRef}/>
        <p/>
        <pre aria-label='JSON Tree'>{this.state.json}</pre>
      </div>
    );
  }
}

export default App;

