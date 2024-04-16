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
          parent.left= new NILNode();
          Node.returns = grandPa;
          grandPa.right = Node;
          // 改颜色
          return this._adjustTreeNode(parent);
        }
      }
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
}

const rbTree = new RBTree();
// rbTree.insert(10);
// rbTree.insert(7);
// rbTree.insert(8);
// rbTree.insert(9);
// rbTree.insert(11);
// rbTree.insert(8);
rbTree.insert(10);
rbTree.insert(13);
rbTree.insert(12);
console.log(rbTree);
