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
    this.containerString = containerId + '-';
    this.containerId = document.getElementById(containerId);

    // Render Tree Data
    this.render(data);

    this.checkTree();
  }

  checkTree() {
    const allChildren =
    this.containerId.querySelectorAll('.folder-label, .file');
    allChildren.forEach((child) => {
      console.log(child.innerText, child.id);
    });
  }

  // Recursively render the tree data
  render(data) {
    // Dynamically Clear Container (all children removed)
    while (this.containerId.firstChild) {
      this.containerId.removeChild(this.containerId.firstChild);
    }

    data.forEach((node) => {
      let element;

      if (node instanceof Branch) {
        element = this.renderBranch(node);
      } else if (node instanceof Leaf) {
        element = this.renderLeaf(node);
      }
      this.containerId.appendChild(element);
    });
  }

  // Branch Specific Rendering
  // If branch has children, recursively render them
  renderBranch(branch) {
    const folder = document.createElement('div');
    folder.className = 'folder'; // Detectable as 'folder' in CSS

    // Folder Label
    const label = document.createElement('div');
    label.className = 'folder-label';
    label.innerText = branch.title; // Shows branch title

    // Label ID
    const labelId =
    this.containerString.concat(branch.id); // Concat our tree # w ID
    label.id = labelId; // DIV ID

    // Metadata for Testing
    label.title = branch.title; // DIV Metadata Title

    folder.appendChild(label);

    // Separate Container for Children
    const childrenContainer = document.createElement('div');
    childrenContainer.className = 'children-container'; // Optional CSS class
    childrenContainer.style.display = 'none'; // Initially Hidden

    // When Clicked, Toggle Children Visibility
    label.addEventListener(('click'), () => {
      if (childrenContainer.style.display === 'none') {
        childrenContainer.style.display = 'block'; // show children
        label.classList.toggle('expanded');
      } else {
        childrenContainer.style.display = 'none'; // hide children
        label.classList.remove('expanded');
      }
    });


    // Recursively Render Children
    branch.children.forEach((child) => {
      let childElement;

      // Is it Branch?
      if (child instanceof Branch) {
        childElement = this.renderBranch(child);
      } else if (child instanceof Leaf) { // Is it Leaf?
        childElement = this.renderLeaf(child);
      }

      childrenContainer.appendChild(childElement);
    });

    folder.appendChild(childrenContainer);
    return folder;
  }

  // No Recursion but it Renders Leafs
  renderLeaf(leaf) {
    const file = document.createElement('div'); // Creates div for File
    file.className = 'file';
    file.innerText = leaf.title; // Shown on Screen

    // Leaf ID
    const fileId =
    this.containerString.concat(leaf.id); // Concat our tree # w ID
    file.id = fileId; // DIV ID

    // Metadata for Testing
    file.title = leaf.title; // DIV Metadata Title

    if (leaf.id === 'error') {
      file.classList.add('error');
    } else {
      file.classList.add('file');
    }
    return file;
  }

  /**
   * Expand all folders in the tree
   */
  expand() {
    const allContainers =
    this.containerId.querySelectorAll('.children-container');
    allContainers.forEach((container) => {
      container.style.display = 'block'; // Show all children containers
    });

    const allLabels = this.containerId.querySelectorAll('.folder-label');
    allLabels.forEach((label) => {
      label.classList.add('expanded'); // Change all symbols to expanded
    });
  }

  /**
   * Collapse all folders in the tree
   */
  collapse() {
    const allContainers =
    this.containerId.querySelectorAll('.children-container');
    allContainers.forEach((container) => {
      container.style.display = 'none'; // Show all children containers
    });

    const allLabels = this.containerId.querySelectorAll('.folder-label');
    allLabels.forEach((label) => {
      label.classList.remove('expanded'); // Change all symbols to closed
    });
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
    // Parse JSON
    const textarea = document.getElementById('json');
    const jsonString = textarea.value;
    let parsedData;
    try {
      parsedData = JSON.parse(jsonString);
      // console.log(parsedData);
    } catch (err) {
      // Handle malformed JSON
      console.error('Parse error:', err.message);

      this.render([new Leaf('error', err.message)]);
      return;
    }

    // We need to recursively convert Data
    const seen = new Set();
    /**
     * Recursively converts a JSON node into a Leaf or Branch instance.
     * @param {object} node - The node object from parsed JSON
     * @param {string} node.id - Unique identifier for the node
     * @param {string} node.title - Title of the node
     * @param {Array} [node.children] - Optional array of child nodes
     * @returns {Leaf|Branch} - Returns Leaf or Branch instance
     */
    function conversion(node) {
      if (!node.id || !node.title) {
        throw new Error(
            'One or more objects are missing one or more required properties',
        );
      }

      // Check for Duplicates
      if (seen.has(node.id)) {
        throw new Error('One or more objects have non-unique IDs');
      }
      seen.add(node.id);
      // If it has children, it's a Branch
      if (node.children) {
        // Children not an array - Error
        if (!Array.isArray(node.children)) {
          throw new Error(
              'One or more objects are missing one or more required properties',
          );
        }

        const children = node.children.map(conversion);
        return new Branch(node.id, node.title, children);
      }

      // It's a Leaf
      return new Leaf(node.id, node.title);
    }

    // Top Level Conversion
    let convertedData;
    try {
      convertedData = parsedData.map(conversion);
      this.render(convertedData);
      this.checkTree();
    } catch (err2) {
      this.render([new Leaf('error', err2.message)]);
      // Handle conversion errors
      console.error(err2.message);
    }
  }
}

