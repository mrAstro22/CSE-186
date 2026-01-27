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
// import Leaf from '../model/Leaf';
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
    const expanded = {};
    const checked = {};

    // Preset Checked and Expanded
    const initState = (nodes) => {
      nodes.forEach((node) => {
        checked[node.id] = node.checked || false;
        expanded[node.id] = node.expanded || false;
        if (node.children) {
          initState(node.children); // recursion for nested branches
        }
      });
    };

    initState(data);
    this.state = {
      treeData: data, // React Tree
      expanded,
      checked,
      highlight: new Set(),
    };
  }

  /**
   * Don't implement this function until you get to the Stretch requirement
   * @returns {Array} the data currently displayed
   */
  raw() {
    return [this.state.treeData];
  }

  /**
   * @returns {object} JSX of the Tree
   */
  // Recursively render the tree data
  render() {
    return (
      <div className="trees">
        {this.state.treeData.map((node) => {
          if (node instanceof Branch) {
            return this.renderBranch(node);
          } else {
            return this.renderLeaf(node);
          }
          // return null;
        })}
      </div>
    );
  }

  // Folder Expansion
  handleExpanded(branch) {
    // Toggle between prev and curr state
    this.setState((prevState) => ({
      expanded: {
        ...prevState.expanded,
        [branch.id]: !prevState.expanded[branch.id],
      },
    }));
  }

  renderBranch(branch) {
    const expandAriaLabel = this.state.expanded[branch.id] ?
      `Collapse ${branch.title}` :
      `Expand ${branch.title}`;

    const checkAriaLabel = this.state.checked[branch.id] ?
      `Uncheck ${branch.title}` :
      `Check ${branch.title}`;

    const isExpanded = this.state.expanded[branch.id] || false;
    const isChecked = this.state.checked[branch.id] || false;

    const children = branch.children.map((child) => {
      // Is it Branch??
      if (child instanceof Branch) {
        return this.renderBranch(child);
      } else { // Leaf??
        return this.renderLeaf(child);
      }
      // return null;
    });

    return (
      // I added a branch wrapper for the cases that a folder
      // Has Children
      // I couldn't add multiple divs before
      <div key = {branch.id} className = 'branch-wrapper'>
        <div className={`folder ${isExpanded ? 'expanded' : ''}`}>
          {branch.checkable && (
            <input
              className = "checkbox"
              type="checkbox"
              name = {branch.id}
              checked = {isChecked}
              onChange = {() => this.handleCheckBox(branch)}
              aria-label = {checkAriaLabel}
            />
          )}
          <span
            className = 'arrow-icon'
            aria-label = {expandAriaLabel}
            style = {{transform: this.state.expanded[branch.id] ?
              'rotate(0deg)' :
              'rotate(-90deg)'}}
            onClick = {() => this.handleExpanded(branch)}
          >
            {'\u25BC'}
          </span>
          <label className = {`folder-title 
          ${this.state.highlight.has(branch.id) ? 'highlight' : ''}`}
          onClick = {(e) => this.handleShift(branch, e)}
          >
            {branch.title}
          </label>
        </div>
        <div className = 'children-container'>
          {children}
        </div>
      </div>
    );
  }

  // Checkbox State Change
  handleCheckBox(node) {
    // Toggle between prev state and curr
    this.setState((prevState) => ({
      checked: {
        ...prevState.checked,
        [node.id]: !prevState.checked[node.id],
      },
    }));
  };

  renderLeaf(leafNode) {
    const ariaLabel = this.state.checked[leafNode.id] ?
      `Uncheck ${leafNode.title}` :
      `Check ${leafNode.title}`;

    const isChecked = this.state.checked[leafNode.id] || false;

    return (
      <div
        key = {leafNode.id}
        className = {`file ${this.state.highlight.has(
            leafNode.id) ? 'highlight' : ''}`}>
        {leafNode.checkable && (
          <input
            className = "checkbox"
            type="checkbox"
            name = {leafNode.id}
            checked = {isChecked}
            onChange = {() => this.handleCheckBox(leafNode)}
            aria-label = {ariaLabel}
          />
        )}
        <label
          onClick = {(e) => this.handleShift(leafNode, e)}
        >
          {leafNode.title}
        </label>
      </div>
    );
  }

  // Shift Click - Highlight
  handleShift(node, e) {
    e.preventDefault(); // stop browser from selecting text
    // On event of Shift Click
    this.setState((prev) =>{
      const highlight = new Set(prev.highlight);
      if (e.shiftKey) {
        if (highlight.has(node.id)) {
          highlight.delete(node.id);
        } else {
          highlight.add(node.id);
        }
        // console.log('Highlight Set:', highlight);

        // Click on Node from Highlighted Set
      } else {
        // If we selected the same node
        if (highlight.has(node.id)) {
          highlight.clear();
          // console.log('Highlight Set:', highlight);
        } else {
          highlight.clear();
          highlight.add(node.id);
        }
      }
      return {highlight};
    });
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      if (this.state.highlight.size <= 0) {
        // console.log('Nothing in set');
        return null;
      }
      // Update Tree
      this.setState((prev) => {
        const treeData = this.deleteHighlighted(
            prev.treeData,
            prev.highlight,
        );

        // Rerender Adjusted Tree
        return {
          treeData,
          highlight: new Set(),
        };
      });
    }
  };

  deleteHighlighted(nodes, highlighted) {
    // Filter All Non-Highlighted Nodes
    const filteredNodes = nodes.filter((node) => !highlighted.has(node.id));

    // Recursively Call Non-Highlighted Nodes
    const newNodes = filteredNodes.map((node) => {
      if (node.children) {
        node.children = this.deleteHighlighted(node.children, highlighted);
      }
      return node;
    });

    return newNodes;
  }
}

Tree.propTypes = {
  data: PropTypes.array,
};

export default Tree;
