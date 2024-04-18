// 节点颜色
const ERBTNodeColor = Object.freeze({
  RED: "red",
  BLACK: "black",
});

// NIL节点
class NILNode {
  constructor() {
    (this.key = "NIL"), (this.color = ERBTNodeColor.BLACK);
  }
}

// 节点定义
class RBTNode {
  constructor(key) {
    this.key = key;
    this.left = new NILNode();
    this.right = new NILNode();
    this.returns = null;
    // 默认红色
    this.color = ERBTNodeColor.RED;
  }
}

class RBTree {
  constructor() {
    this.root = null;
  }

  _adjustTreeNode(Node) {
    if (!Node) return;
    if (Node === this.root) {
      // 处理情况1 设置根为黑色
      this.root.color = ERBTNodeColor.BLACK;
      return;
    }
    const parent = Node.returns;
    if (parent?.color === ERBTNodeColor.BLACK) {
      // 处理情况2 父节点为黑，无需调整
      return;
    }

    // 爷爷节点
    const grandPa = parent?.returns;
    const uncle = grandPa?.left === parent ? grandPa?.right : grandPa?.left;
    if (!uncle || !grandPa) return;

    // 情况3 父节点 叔节点为红 爷爷节点为黑
    if (
      grandPa.color === ERBTNodeColor.BLACK &&
      parent.color === ERBTNodeColor.RED &&
      uncle.color === ERBTNodeColor.RED
    ) {
      uncle.color = ERBTNodeColor.BLACK;
      parent.color = ERBTNodeColor.BLACK;
      grandPa.color = ERBTNodeColor.RED;
      return this._adjustTreeNode(grandPa);
    }

    if (
      grandPa.color === ERBTNodeColor.BLACK &&
      parent.color === ERBTNodeColor.RED &&
      uncle.color === ERBTNodeColor.BLACK
    ) {
      if (grandPa.left === parent) {
        // 父节点在爷左边
        if (Node === parent.left) {
          // 情况4 父节点 红 叔节点黑 爷节点 黑 并且 Node为parent左孩子
          // 父黑 爷红 叔黑
          uncle.color = ERBTNodeColor.BLACK;
          parent.color = ERBTNodeColor.BLACK;
          grandPa.color = ERBTNodeColor.RED;
          // 右旋
          if (grandPa === this.root) {
            this.root = parent;
            if (parent.right) {
              grandPa.left = parent.right;
              parent.right.returns = grandPa;
            }
            parent.right = grandPa;
            parent.returns = null;
            grandPa.returns = parent;
          } else {
            const prev = grandPa.returns;
            const isLeft = prev.left === grandPa ? true : false;
            if (parent.right) {
              grandPa.left = parent.right;
              parent.right.returns = grandPa;
            }
            parent.right = grandPa;
            grandPa.returns = parent;
            parent.returns = prev;
            if (isLeft) {
              prev.left = parent;
            } else {
              prev.right = parent;
            }
          }
          return this._adjustTreeNode(parent);
        } else {
          // 情况5 父红 组黑 叔黑 Node 为parent右孩子
          // 以父为根左旋转
          Node.left = parent;
          parent.returns = Node;
          parent.right = new NILNode();
          Node.returns = grandPa;
          grandPa.left = Node;
          // 改颜色
          return this._adjustTreeNode(parent);
        }
      } else {
        // 情况4 父节点 红 叔节点黑 爷节点 黑 并且 Node为parent右孩子
        // 父节点在爷右边
        if (Node === parent.right) {
          // 父黑 爷红 叔黑
          uncle.color = ERBTNodeColor.BLACK;
          parent.color = ERBTNodeColor.BLACK;
          grandPa.color = ERBTNodeColor.RED;
          // 右旋
          if (grandPa === this.root) {
            this.root = parent;
            if (parent.left) {
              grandPa.right = parent.left;
              parent.left.returns = grandPa;
            }
            parent.left = grandPa;
            parent.returns = null;
            grandPa.returns = parent;
          } else {
            const prev = grandPa.returns;
            const isLeft = prev.left === grandPa ? true : false;
            if (parent.left) {
              grandPa.right = parent.left;
              parent.left.returns = grandPa;
            }
            parent.left = grandPa;
            grandPa.returns = parent;
            parent.returns = prev;
            if (isLeft) {
              prev.left = parent;
            } else {
              prev.right = parent;
            }
          }
          return this._adjustTreeNode(parent);
        } else {
          // 情况5 父红 组黑 叔黑 Node 为parent左孩子
          // 以父为根左旋转
          Node.right = parent;
          parent.returns = Node;
          parent.left = new NILNode();
          Node.returns = grandPa;
          grandPa.right = Node;
          // 改颜色
          return this._adjustTreeNode(parent);
        }
      }
    }
  }

  _deleteNode(Node, isDelete = true) {
    // 处理删除
    // 有两个节点的情况下，转换成一个节点，找到后继
    if (
      Node.left &&
      Node.right &&
      Node.left.key !== "NIL" &&
      Node.right.key !== "NIL"
    ) {
      let successor = Node.right;
      let nextNode = Node.right;
      while (nextNode && nextNode?.key !== "NIL") {
        successor = nextNode;
        nextNode = nextNode.left;
      }
      // 交换后继和删除节点key
      const temp = Node.key;
      Node.key = successor.key;
      successor.key = temp;
      // 转换成对后继节点的删除
      return this._deleteNode(successor);
    }

    // 经过上面处理，此时节点只可能有一个孩子
    // case 1 如果删除的是根节点
    if (this.root === Node) {
      if (this.root?.left && this.root?.left.key !== "NIL") {
        // 只存在左孩子
        this.root = this.root?.left;
        this.root.returns = null;
      } else if (this.root?.left && this.root?.right.key !== "NIL") {
        // 只存在右孩子
        this.root = this.root?.right;
        this.root.returns = null;
      } else {
        // 无孩子
        this.root = null;
      }
      return;
    }
    const parent = Node.returns;
    const parentReturn = parent.returns;
    const isParentLeft = parent.returns?.left === parent ? true : false;
    const isBrotherLeft = parent?.left !== Node ? true : false;
    const isNodeLeft = !isBrotherLeft;
    const brother = isBrotherLeft ? parent.left : parent.right;

    // 如果删除的是红色节点,直接删除，并且其相邻的节点一定是黑色
    if (Node.color === ERBTNodeColor.RED) {
      if (Node.left && Node.left?.key !== "NIL") {
        parent[isNodeLeft ? "left" : "right"] = Node.left;
        Node.left.returns = parent;
      } else if (Node.right && Node.right?.key !== "NIL") {
        parent[isNodeLeft ? "left" : "right"] = Node.right;
        Node.right.returns = parent;
      } else {
        // 无子节点，直接删除
        parent[isNodeLeft ? "left" : "right"] = new NILNode();
      }
      return;
    }
    // 如果 删除的是黑节点
    else if (Node.color === ERBTNodeColor.BLACK) {
      // 删除黑节点，但是其有红色的子节点可以补齐 case 2
      if (
        (Node.left &&
          Node.left?.key !== "NIL" &&
          Node.left?.color === ERBTNodeColor.RED) ||
        (Node.right &&
          Node.right?.key !== "NIL" &&
          Node.right?.color === ERBTNodeColor.RED)
      ) {
        if (Node.left && Node.left?.key !== "NIL") {
          parent[isNodeLeft ? "left" : "right"] = Node.left;
          Node.left.color = ERBTNodeColor.BLACK;
          Node.left.returns = parent;
        } else if (Node.right && Node.right?.key !== "NIL") {
          parent[isNodeLeft ? "left" : "right"] = Node.right;
          Node.right.color = ERBTNodeColor.BLACK;
          Node.right.returns = parent;
        }
        return;
      }
      // 删除的是黑节点，并且兄弟节点为红色节点，需要旋转
      if (brother.color === ERBTNodeColor.RED) {
        // 如果兄弟在右边，左旋转
        if (!isBrotherLeft) {
          if (brother.left) {
            parent.right = brother.left;
            brother.left.returns = parent;
          }
          brother.left = parent;
          parent.returns = brother;
        }
        // 如果兄弟在左边 右旋转
        else {
          if (brother.right) {
            parent.left = brother.right;
            brother.right.returns = parent;
          }
          brother.right = parent;
          parent.returns = brother;
        }
        if (parentReturn === null) {
          // parent是root的情况
          this.root = brother;
          brother.returns = null;
        } else {
          if (isParentLeft) {
            parentReturn.left = brother;
            brother.returns = parentReturn;
          } else {
            parentReturn.right = brother;
            brother.returns = parentReturn;
          }
        }
        // 修改颜色
        brother.color = ERBTNodeColor.BLACK;
        parent.color = ERBTNodeColor.RED;
        // 此时，Node的兄弟节点已经是黑色， 再删除
        return this._deleteNode(Node);
      }
      // 删除的是黑节点，并且兄弟节点为黑色节点，看其侄子
      else if (brother.color === ERBTNodeColor.BLACK) {
        const leftNephew = brother.left;
        const rightNephew = brother.right;
        // 如果两个侄子都是黑色
        if (
          leftNephew.color === ERBTNodeColor.BLACK &&
          rightNephew.color === ERBTNodeColor.BLACK
        ) {
          if (isDelete) {
            // 删除节点
            if (Node.left && Node.left?.key !== "NIL") {
              parent[isNodeLeft ? "left" : "right"] = Node.left;
              Node.left.returns = parent;
            } else if (Node.right && Node.right?.key !== "NIL") {
              parent[isNodeLeft ? "left" : "right"] = Node.right;
              Node.right.returns = parent;
            } else {
              // 无子节点，直接删除
              parent[isNodeLeft ? "left" : "right"] = new NILNode();
            }
          }
          // 兄弟节点改成红色
          brother.color = ERBTNodeColor.RED;
          // 调整parent
          if (parent.color === ERBTNodeColor.RED || parent === this.root) {
            parent.color = ERBTNodeColor.BLACK;
          } else {
            return this._deleteNode(parent, false);
          }
        }
        // 如果有任意侄子是红色
        else {
          if (isBrotherLeft) {
            // 兄弟在左边
            if (leftNephew.color !== ERBTNodeColor.RED) {
              // 左侄子不是红色，左旋转右侄子
              parent.left = rightNephew;
              rightNephew.returns = parent;
              if (rightNephew.left) {
                brother.right = rightNephew.left;
                rightNephew.left.returns = brother;
              }
              rightNephew.left = brother;
              // 右旋
              const newBrother = rightNephew;
              if (parentReturn) {
                parentReturn[isParentLeft ? "left" : "right"] = newBrother;
                newBrother.returns = parentReturn;
              } else {
                this.root = newBrother;
                newBrother.returns = null;
              }

              newBrother.color = parent.color;
              parent.color = brother.color = ERBTNodeColor.BLACK;
            } else {
              // 右旋
              if (parentReturn) {
                parentReturn[isParentLeft ? "left" : "right"] = brother;
                brother.returns = parentReturn;
              } else {
                this.root = brother;
                brother.returns = null;
              }
              if (rightNephew) {
                parent.left = rightNephew;
                rightNephew.returns = parent;
              }
              brother.right = parent;
              brother.color = parent.color;
              parent.color = leftNephew.color = ERBTNodeColor.BLACK;
            }
          } else {
            if (leftNephew.color !== ERBTNodeColor.RED) {
              parent.right = leftNephew;
              leftNephew.returns = parent;
              if (leftNephew.right) {
                brother.left = leftNephew.right;
                leftNephew.right.returns = brother;
              }
              leftNephew.right = brother;
              // 右旋
              const newBrother = leftNephew;
              if (parentReturn) {
                parentReturn[isParentLeft ? "left" : "right"] = newBrother;
                newBrother.returns = parentReturn;
              } else {
                this.root = newBrother;
                newBrother.returns = null;
              }
              newBrother.color = parent.color;
              parent.color = brother.color = ERBTNodeColor.BLACK;
            } else {
              // 右旋
              if (parentReturn) {
                parentReturn[isParentLeft ? "left" : "right"] = brother;
                brother.returns = parentReturn;
              } else {
                this.root = brother;
                brother.returns = null;
              }
              if (leftNephew) {
                parent.right = leftNephew;
                leftNephew.returns = parent;
              }
              brother.left = parent;
              brother.color = parent.color;
              parent.color = leftNephew.color = ERBTNodeColor.BLACK;
            }
          }
          if (isDelete) {
            // 删除节点
            if (Node.left && Node.left?.key !== "NIL") {
              parent[isNodeLeft ? "left" : "right"] = Node.left;
              Node.left.returns = parent;
            } else if (Node.right && Node.right?.key !== "NIL") {
              parent[isNodeLeft ? "left" : "right"] = Node.right;
              Node.right.returns = parent;
            } else {
              // 无子节点，直接删除
              parent[isNodeLeft ? "left" : "right"] = new NILNode();
            }
          }
        }
      }
    }
  }

  _preOrderTraversal(node, callback) {
    if (!node || node?.key === "NIL") return;
    callback(node.key);
    this._preOrderTraversal(node.left, callback);
    this._preOrderTraversal(node.right, callback);
  }

  _inOrderTraversal(node, callback) {
    if (!node || node?.key === "NIL") return;
    this._preOrderTraversal(node.left, callback);
    callback(node.key);
    this._preOrderTraversal(node.right, callback);
  }

  _postOrderTraversal(node, callback) {
    if (!node || node?.key === "NIL") return;
    this._preOrderTraversal(node.left, callback);
    this._preOrderTraversal(node.right, callback);
    callback(node.key);
  }

  _search(node, key) {
    if (!node || node.key === "NIL") return false;
    if (node.key === key) {
      return true;
    } else if (node.key > key) {
      return this._search(node.left, key);
    } else {
      return this._search(node.right, key);
    }
  }

  insert(key) {
    const Node = new RBTNode(key);
    if (this.root === null) {
      // 情况1 插入根节点
      this.root = Node;
    } else {
      let parent = this.root;
      let current = parent;
      let insertLeft = false;
      while (current && current?.key !== "NIL") {
        if (key >= current.key) {
          parent = current;
          current = current.right;
          insertLeft = false;
        } else {
          parent = current;
          current = current.left;
          insertLeft = true;
        }
      }
      Node.returns = parent;
      // 插入新节点
      if (insertLeft) {
        parent.left = Node;
      } else {
        parent.right = Node;
      }
    }
    // 调整节点
    this._adjustTreeNode(Node);
  }

  delete(key) {
    let deleteNode = this.root;
    let nextNode = this.root;
    while (nextNode && nextNode.key !== "NIL") {
      deleteNode = nextNode;
      if (key === nextNode.key) {
        break;
      } else if (key < nextNode.key) {
        nextNode = nextNode.left;
      } else {
        nextNode = nextNode.right;
      }
    }
    if (!deleteNode) return;
    this._deleteNode(deleteNode);
  }

  preOrderTraversal() {
    const list = [];
    this._preOrderTraversal(this.root, (key) => list.push(key));
    return list.join(",");
  }

  inOrderTraversal() {
    const list = [];
    this._inOrderTraversal(this.root, (key) => list.push(key));
    return list.join(",");
  }

  postOrderTraversal() {
    const list = [];
    this._postOrderTraversal(this.root, (key) => list.push(key));
    return list.join(",");
  }

  min() {
    let current = this.root;
    let parent = null;
    while (current && current.key !== "NIL") {
      parent = current;
      current = current.left;
    }
    return parent.key;
  }

  max() {
    let current = this.root;
    let parent = null;
    while (current && current.key !== "NIL") {
      parent = current;
      current = current.right;
    }
    return parent.key;
  }

  search(key) {
    return this._search(this.root, key);
  }

  toString() {
    return this.inOrderTraversal();
  }
}

const rbTree = new RBTree();
// rbTree.insert(20);
// rbTree.insert(15);
// rbTree.insert(25);
// rbTree.insert(10);
// rbTree.insert(18);
// rbTree.insert(24);
// 10 18 8 9 3 2
// rbTree.insert(10);
// rbTree.insert(18);
// rbTree.insert(8);
// rbTree.insert(9);
// rbTree.insert(3);
// rbTree.insert(2);
// rbTree.delete(18);

// 1 2 3 4 5 6 7 8 del 1
// rbTree.insert(1);
// rbTree.insert(2);
// rbTree.insert(3);
// rbTree.insert(4);
// rbTree.insert(5);
// rbTree.insert(6);
// rbTree.insert(7);
// rbTree.insert(8);
rbTree.insert(20);
rbTree.insert(15);
rbTree.insert(25);
rbTree.insert(10);
rbTree.insert(18);
console.log(rbTree.preOrderTraversal());
rbTree.delete(25);
console.log(rbTree.preOrderTraversal());
console.log(rbTree.inOrderTraversal());
console.log(String(rbTree), rbTree.min(), rbTree.max());
console.log(rbTree.search(25),rbTree.search(15))
// rbTree.delete(24);
// console.log(rbTree);
