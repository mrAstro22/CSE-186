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
import React from 'react';
import PropTypes from 'prop-types';

import './Tree.css';
import Branch from '../model/Branch';
import Leaf from '../model/Leaf';
import data from '../model/data';

/**
 * Tree Component.
 */
class Tree extends React.Component {
  /**
   * Constructor: props.data is the initial data to display
   * @param {object} props properties
   */
  constructor(props) {
    super(props);
    this.data = data;
    this.state = {
      expanded: {},
      checked: {},
    };
  }

  /**
   * Don't implement this function until you get to the Stretch requirement
   * @returns {Array} the data currently displayed
   */
  raw() {
    return [];
  }

  /**
   * @returns {object} JSX of the Tree
   */
  // Recursively render the tree data
  render() {
    return (
      <div className="trees">
        {this.data.map((node) => {
          if (node instanceof Branch) {
            return this.renderBranch(node);
          } else if (node instanceof Leaf) {
            // if(node.checkable) {
            //   checkedState
            // }
            return this.renderLeaf(node);
          }
          return null;
        })}
      </div>
    );
  }

  handleExpanded(branch) {
    this.setState((prevState) => ({
      expanded: {
        ...prevState.expanded,
        [branch.id]: !prevState.expanded[branch.id],
      },
    }));
  }

  renderBranch(branch) {
    const ariaLabel = this.state.expanded[branch.id] ?
      'Expand ${branch.title}' :
      'Collapse ${branch.title}';

    const children = branch.children.map((child) => {
      // Is it Branch??
      if (child instanceof Branch) {
        return this.renderBranch(child);
      } else if (child instanceof Leaf) { // Leaf??
        return this.renderLeaf(child);
      }
      return null;
    });

    return (
      <div key = {branch.id} className = 'branch-wrapper'>
        <div className={`folder ${this.state.expanded[branch.id] ?
          'expanded' :
          ''}`}>
          <span
            className = 'arrow-icon'
            aria-label = {ariaLabel}
            style = {{transform: this.state.expanded[branch.id] ?
              'rotate(0deg)' :
              'rotate(-90deg)'}}
            onClick = {() => this.handleExpanded(branch)}
          >
            {'\u25BC'}
          </span>
          <span className = "folder-title">
            {branch.title}
          </span>
        </div>
        <div className = 'children-container'>
          {children}
        </div>
      </div>
    );
  }

  handleCheckBox(leafNode) {
    this.setState((prevState) => ({
      checked: {
        ...prevState.checked,
        [leafNode.id]: !prevState.checked[leafNode.id],
      },
    }));
  };

  renderLeaf(leafNode) {
    const ariaLabel = leafNode.checked ?
      'Uncheck ${leafNode.title}' :
      'Check ${leafNode.title}';

    return (
      <div key = {leafNode.id} className = 'file'>
        {leafNode.checkable && (
          <input
            className = "checkbox"
            type="checkbox"
            name = {leafNode.id}
            checked = {this.state.checked[leafNode.id] ?? leafNode.checked}
            onChange = {() => this.handleCheckBox(leafNode)}
            aria-label = {ariaLabel}
          />
        )}
        <span>{leafNode.title}</span>
      </div>
    );
  }
}

Tree.propTypes = {
  data: PropTypes.array,
};

export default Tree;
