class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(values) {
    this.root = buildTree(values);
  }

  prettyPrint() {
    this._printTree(this.root, "", true);
  }

  _printTree(node, prefix, isLeft) {
    if (node !== null) {
      console.log(prefix + (isLeft ? "├── " : "└── ") + node.data);
      this._printTree(node.left, prefix + (isLeft ? "│   " : "    "), true);
      this._printTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }
  }

  insert(value) {
    this.root = this._insertRecursively(this.root, value);
  }

  _insertRecursively(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this._insertRecursively(node.left, value);
    } else if (value > node.data) {
      node.right = this._insertRecursively(node.right, value);
    }

    return node;
  }

  delete(value) {
    this.root = this._deleteRecursively(this.root, value);
  }

  _deleteRecursively(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      node.left = this._deleteRecursively(node.left, value);
    } else if (value > node.data) {
      node.right = this._deleteRecursively(node.right, value);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      node.data = this._findMinValue(node.right);

      node.right = this._deleteRecursively(node.right, node.data);
    }

    return node;
  }

  find(value) {
    return this._findRecursively(this.root, value);
  }

  _findRecursively(node, value) {
    if (node === null) {
      return null; // Node with the value not found
    }

    if (value === node.data) {
      return node; // Node with the value found
    } else if (value < node.data) {
      return this._findRecursively(node.left, value); // Search in the left subtree
    } else {
      return this._findRecursively(node.right, value); // Search in the right subtree
    }
  }

  _findMinValue(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  levelOrder(callback = null) {
    const result = [];
    const queue = [];

    if (this.root !== null) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (callback) {
        callback(currentNode);
      } else {
        result.push(currentNode.data);
      }

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }

    return result;
  }

  inorder(callback = null) {
    const result = [];
    this._inorderRecursively(this.root, callback, result);
    return result;
  }

  _inorderRecursively(node, callback, result) {
    if (node !== null) {
      this._inorderRecursively(node.left, callback, result);
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      this._inorderRecursively(node.right, callback, result);
    }
  }

  preorder(callback = null) {
    const result = [];
    this._preorderRecursively(this.root, callback, result);
    return result;
  }

  _preorderRecursively(node, callback, result) {
    if (node !== null) {
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      this._preorderRecursively(node.left, callback, result);
      this._preorderRecursively(node.right, callback, result);
    }
  }

  postorder(callback = null) {
    const result = [];
    this._postorderRecursively(this.root, callback, result);
    return result;
  }

  _postorderRecursively(node, callback, result) {
    if (node !== null) {
      this._postorderRecursively(node.left, callback, result);
      this._postorderRecursively(node.right, callback, result);
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
    }
  }

  height(node) {
    if (node === null) {
      return -1;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(node) {
    if (node === null) {
      return -1;
    }
    return this.depth(node.parent) + 1;
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    if (Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right)) {
      return true;
    }
    return false;
  }
  rebalance() {
    const values = this.inorder();
    this.root = buildTree(values);
  }

}

function buildTree(data) {
  const sortedData = Array.from(new Set(data)).sort((a, b) => a - b);

  function buildTree(start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const newMode = new Node(sortedData[mid]);

    newMode.left = buildTree(start, mid - 1);
    newMode.right = buildTree(mid + 1, end);

    return newMode;
  }

  return buildTree(0, sortedData.length - 1);
}


function generateRandomNumbers(count, max) {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * max));
  }
  return numbers;
}

const tree = new Tree();

const randomNumbers = generateRandomNumbers(10, 100);
const balancedTree = new Tree();
randomNumbers.forEach(num => balancedTree.insert(num));

console.log("Is balanced (initial):", balancedTree.isBalanced());

console.log("\nElements in level order:");
console.log(balancedTree.levelOrder());

console.log("\nElements in preorder:");
console.log(balancedTree.preorder());

console.log("\nElements in postorder:");
console.log(balancedTree.postorder());

console.log("\nElements in inorder:");
console.log(balancedTree.inorder());

balancedTree.insert(120);
balancedTree.insert(130);

console.log("\nIs balanced (after unbalance):", balancedTree.isBalanced());

balancedTree.rebalance();

console.log("\nIs balanced (after rebalance):", balancedTree.isBalanced());

console.log("\nElements in level order (after rebalance):");
console.log(balancedTree.levelOrder());

console.log("\nElements in preorder (after rebalance):");
console.log(balancedTree.preorder());

console.log("\nElements in postorder (after rebalance):");
console.log(balancedTree.postorder());

console.log("\nElements in inorder (after rebalance):");
console.log(balancedTree.inorder());