/*
#######################################################################
#
# Copyright (C) 2025 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

/*
#######################################################################
# DO NOT MODIFY THIS SECTION
#######################################################################
*/

class Leaf {
  /**
   * Create a tree leaf
   * @param {string} id Unique identifier
   * @param {string} title Text to display in the UI
   */
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

class Branch extends Leaf {
  /**
   * Create a tree branch with zero or more leaves and/or branches
   * @param {string} id Unique identifier
   * @param {string} title Text to display in the UI
   * @param {Array} children Child branches and/or leaves
   */
  constructor(id, title, children) {
    super(id, title);
    this.children = children;
  }
}

// Generates a lint error which will go away when you use it
const data = [
  new Branch('97a09cf8-16a8-4829-851f-40aef9150dd8', 'Folder 1', [
    new Leaf('b6f9ab35-4877-4eb1-b77c-a08ab33e977f', 'File 1'),
    new Leaf('b7b01a45-431d-40c4-b3f3-64502646cfea', 'File 2'),
    new Branch('3b7b83ae-b491-49f4-9c12-e6d7ab047212', 'Folder 2', [
      new Leaf('a38f4b60-f54a-4a7e-ac56-f1316c7647ae', 'File 3'),
      new Leaf('087a1fb0-f0fd-44de-9b87-ab67e8f66cc7', 'File 4'),
      new Leaf('8007f70d-d20e-42c4-87ad-0b52a9ff7a0b', 'File 5'),
    ]),
  ]),
  new Leaf('3c671ff7-8ec1-4999-a574-3596fe4cc477', 'File 6'),
  new Leaf('a47771a1-f101-4443-96bb-4605208c4fd2', 'File 7'),
  new Branch('7f646bab-ad29-4dc9-a079-8297e28b337f', 'Folder 3', [
    new Leaf('d2c1ca2e-5c5e-4551-a7a4-e95599ec9713', 'File 8'),
    new Leaf('b2c852f4-8674-4521-87b5-aa83eaac8c18', 'File 9'),
  ]),
];

/*
#######################################################################
# END DO NOT MODIFY SECTION
#######################################################################
*/

// Legitimate disable as this class is only instantiated in tree.html
// eslint-disable-next-line
class Tree {
  /**
   * Create a tree control
   * @param {string} containerId id of a node the Tree will be a child of
   */
  constructor(containerId) {
    // this.containerString = containerId + '-';
    // this.containerId = document.getElementById(containerId);
  }

  // renderBranch(branch){
  //   const folder = document.createElement('div');
  //   folder.innerText = branch.title;
    
  //   proId = this.containerId.concat(branch.id);
  //   folder.id = branch.containerId.concat();
  //   this.containerId.appendChild(folder);
  // }

  renderLeaf(leaf){
    const file = document.createElement('div'); // Creates div for File
    file.innerText = leaf.title;  // Shows leaf title

    const proId = this.containerString.concat(leaf.id); // Concat our tree # w ID
    file.dataset.id = proID;  // Store id in DOM attribute
    return file;
  }

  /**
   * Expand all folders in the tree
   */
  expand() {

  }

  /**
   * Collapse all folders in the tree
   */
  collapse() {
  }

  /**
   * Replace the tree data with new values from the supplied JSON.
   * Create a single Leaf in the tree wth the following text if an error occurs:
   *  - The parse error if the JSON is badly formed
   *  - "TypeError: data is not iterable" if the JSON is not an array
   *  - "One or more objects have non-unique IDs" if the parsed data has
   *     duplicate ids
   *  - "One or more objects are missing one or more required properties"
   *    if the supplied JSON cannot be parsed into Branche and Leaf objects
   * @param {string} json New data for the tree
   */
  set(json) {
  }
}

