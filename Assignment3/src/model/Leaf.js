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

class Leaf {
  /**
   * Create a tree leaf
   * @param {string} id Unique identifier
   * @param {string} title Text to display in the UI
   * @param {boolean} checkable Node is checkable
   * @param {boolean} checked Node is checked, ignored if not CHECKABLE
   */
  constructor(id, title, checkable = false, checked = false) {
    this.id = id;
    this.title = title;
    this.checkable = checkable;
    this.checked = checked;
  }
}

export default Leaf;
