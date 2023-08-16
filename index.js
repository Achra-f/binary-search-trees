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


  _findMinValue(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
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
const tree = new Tree();


tree.insert(30);
tree.insert(10);
tree.insert(50);
tree.insert(5);
tree.insert(20);
tree.insert(40);
tree.insert(60);

console.log("Before deletion:");
tree.prettyPrint();

tree.delete(30);

console.log("\nAfter deletion:");
tree.prettyPrint();
