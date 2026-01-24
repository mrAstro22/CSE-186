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
# DO NOT MODIFY THIS FILE
#######################################################################
*/
import Leaf from './Leaf';

class Branch extends Leaf {
  /**
   * Create a tree branch with zero or more leaves and/or branches
   * @param {string} id Unique identifier
   * @param {string} title Text to display in the UI
   * @param {Array} children Child branches and/or leaves
   * @param {boolean} expanded Branch is expanded, i.e. children are visible
   * @param {boolean} checkable Node is checkable
   * @param {boolean} checked Node is checked, ignored if not CHECKABLE
   */
  constructor(
      id, title, children = [],
      expanded = false, checkable = false, checked = false,
  ) {
    super(id, title, checkable, checked);
    this.expanded = expanded;
    this.children = children;
  }
}

export default Branch;
