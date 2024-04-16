class TreeNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  _insertNode(node, newNode) {
    if (!node) {
      return;
    }
    if (node.key >= newNode.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }

  _searchNode(node, key) {
    if (!node) {
      return false;
    }
    if (node.key === key) {
      return true;
    }
    if (node.key > key) {
      // LT找
      return this._searchNode(node.left, key);
    } else {
      //RT找
      return this._searchNode(node.right, key);
    }
  }

  _preOrderTraversal(node, onTraverse) {
    if (!node) {
      return;
    }
    onTraverse(node.key);
    this._preOrderTraversal(node.left, onTraverse);
    this._preOrderTraversal(node.right, onTraverse);
  }

  _inOrderTraversal(node, onTraverse) {
    if (!node) {
      return;
    }
    this._inOrderTraversal(node.left, onTraverse);
    onTraverse(node.key);
    this._inOrderTraversal(node.right, onTraverse);
  }

  _postOrderTraversal(node, onTraverse) {
    if (!node) {
      return;
    }
    this._postOrderTraversal(node.left, onTraverse);
    this._postOrderTraversal(node.right, onTraverse);
    onTraverse(node.key);
  }

  _levelTraversal(node, onTraverse) {
    if (!node) {
      return;
    }
    const queue = [node];
    while (queue.length > 0) {
      const treeNode = queue.shift();
      onTraverse(treeNode.key);
      if (treeNode.left) {
        queue.push(treeNode.left);
      }
      if (treeNode.right) {
        queue.push(treeNode.right);
      }
    }
  }

  // 插入数据
  insert(key) {
    const treeNode = new TreeNode(key);
    if (!this.root) {
      this.root = treeNode;
    } else {
      this._insertNode(this.root, treeNode);
    }
  }

  // 搜索
  search(key) {
    return this._searchNode(this.root, key);
  }

  // 深度优先搜索 先序
  preOrderTraversal() {
    const list = [];
    this._preOrderTraversal(this.root, (key) => {
      list.push(key);
    });
    return list.join(",");
  }

  // 中序 - 排序
  inOrderTraversal() {
    const list = [];
    this._inOrderTraversal(this.root, (key) => {
      list.push(key);
    });
    return list.join(",");
  }

  // 后序
  postOrderTraversal() {
    const list = [];
    this._postOrderTraversal(this.root, (key) => {
      list.push(key);
    });
    return list.join(",");
  }

  // 广度优先搜索 - level traversal
  levelTraversal() {
    const list = [];
    this._levelTraversal(this.root, (key) => {
      list.push(key);
    });
    return list.join(",");
  }

  // 最小值
  min() {
    let node = this.root;
    if (!node) {
      return;
    }
    while (node.left !== null) {
      node = node.left;
    }
    return node.key;
  }

  // 最大值
  max() {
    let node = this.root;
    if (!node) {
      return;
    }
    while (node.right !== null) {
      node = node.right;
    }
    return node.key;
  }

  delete(key) {
    // 查找要删除的节点
    let currentTreeNode = this.root;
    // 记录parent
    let parent = null;
    // 记录是否是左节点
    let isLeft = false;
    while (currentTreeNode) {
      if (currentTreeNode.key === key) {
        break;
      } else if (currentTreeNode.key < key) {
        // 右侧找
        parent = currentTreeNode;
        isLeft = false;
        currentTreeNode = currentTreeNode.right;
      } else {
        // 左侧找
        isLeft = true;
        parent = currentTreeNode;
        currentTreeNode = currentTreeNode.left;
      }
    }
    // 删除
    if (!currentTreeNode) {
      // 没找到，退出
      return;
    }
    // 如果是叶子结点
    if (currentTreeNode.left === null && currentTreeNode.right === null) {
      if (parent) {
        if (isLeft) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else {
        // 如果是根节点
        this.root = null;
      }
    }
    // 有左节点 没有右节点
    else if (currentTreeNode.left && currentTreeNode.right === null) {
      if (parent) {
        if (isLeft) {
          parent.left = currentTreeNode.left;
        } else {
          parent.right = currentTreeNode.left;
        }
      } else {
        // 如果是根节点
        this.root = currentTreeNode.left;
      }
    }
    // 有右节点 没有左节点
    else if (currentTreeNode.right && currentTreeNode.left === null) {
      if (parent) {
        if (isLeft) {
          parent.left = currentTreeNode.right;
        } else {
          parent.right = currentTreeNode.right;
        }
      } else {
        // 根节点
        this.root = currentTreeNode.right;
      }
    }
    // 最复杂的情况，如果有两个子节点
    else {
      // 寻找后继
      let successor = currentTreeNode.right;
      let successorParent = currentTreeNode;
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }
      if (successorParent !== currentTreeNode) {
        successorParent.left = successor.right;
        successor.right = currentTreeNode.right;
      }
      if (parent) {
        if (isLeft) {
          parent.left = successor;
        } else {
          parent.right = successor;
        }
      } else {
        // 根节点
        this.root = successor;
      }
      successor.left = currentTreeNode.left;
    }
    console.log("delete:", currentTreeNode.key);
  }

  print() {
    if (!this.root) return [];
    const result = []
    const queue = [];
    queue.push(this.root);
    while (queue.length) {
      var len = queue.length;
      var tempArr = [];
      for (var i = 0; i < len; i++) {
        var temp = queue.shift();
        tempArr.push(temp.key);
        if (temp.left) {
          queue.push(temp.left);
        }
        if (temp.right) {
          queue.push(temp.right);
        }
      }
      result.push(tempArr);
    }
    return result.reduce((prev,curr)=>{
        return prev + '\n' + curr
    },'');
  }
}

/**
 *          10
 *     9          15
 *  1         14      20
 *    3    12     18    100
 *            13
 */
const bstTree = new Tree();
bstTree.insert(10);
bstTree.insert(9);
bstTree.insert(15);
bstTree.insert(14);
bstTree.insert(12);
bstTree.insert(13);
bstTree.insert(20);
bstTree.insert(18);
bstTree.insert(1);
bstTree.insert(3);
bstTree.insert(100);
console.log(bstTree);
console.log(bstTree.search(66), bstTree.search(67));
console.log(bstTree.preOrderTraversal());
console.log(bstTree.inOrderTraversal());
console.log(bstTree.postOrderTraversal());
console.log(bstTree.levelTraversal());
console.log(bstTree.min(), bstTree.max());
bstTree.delete(10);
console.log(bstTree.print());
