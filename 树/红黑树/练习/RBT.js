// 定义红黑树
class RBTree {
  // 颜色枚举
  static ERBTNodeColor = Object.freeze({
    RED: "RED",
    BLACK: "BLACK",
  });

  // 指针方向
  static EChildPosition = Object.freeze({
    LEFT: "left",
    RIGHT: "right",
  });

  // NIL KEY
  static NIL_KEY = "NIL";

  // 生成NIL节点
  static generateNILNode() {
    return {
      key: RBTree.NIL_KEY,
      // NIL节点颜色为黑色
      color: RBTree.ERBTNodeColor.BLACK,
    };
  }

  // 生成树节点
  static generateRBNode(key, value) {
    return {
      key,
      value,
      left: RBTree.generateNILNode(),
      right: RBTree.generateNILNode(),
      parent: null,
      // 普通节点默认颜色为红色
      color: RBTree.ERBTNodeColor.RED,
    };
  }

  // 构造方法
  constructor() {
    // 定义树根
    this.root = null;
  }

  /** ------------- 内部方法 --------------- */
  /**
   * 判断节点收否为空或外部(NIL)节点
   * @param {*} node
   */
  _isNodeNull(node) {
    if (!node || node.key === RBTree.NIL_KEY) {
      return true;
    }
    return false;
  }

  /**
   * 根据传入的根节点和key查找对应的树节点
   * @param {*} root 根节点或子树节点
   * @param {*} key 节点key值
   * @returns
   */
  _findTreeNodeByKey(root, key) {
    if (this._isNodeNull(root)) return;
    let current = this.root;
    if (current.key === key) {
      // 找到 返回节点
      return current;
    } else if (current.key > key) {
      // 找左子树
      return this._findTreeNodeByKey(root.left, key);
    } else {
      // 找右子树
      return this._findTreeNodeByKey(root.right, key);
    }
  }

  /**
   * 根据传入的根节点和key查找要插入到的节点
   * @param {*} root 根节点或子树节点
   * @param {*} key 节点key值
   * @returns [插入节点，插入位置（左右）]
   */
  _findInsertTreeNodeByKey(root, key) {
    if (this._isNodeNull(root)) return [];
    let current = root;
    let previous = null;
    // 默认插入左边,相同的也默认插入左边
    let childPosition = RBTree.EChildPosition.LEFT;
    while (!this._isNodeNull(current)) {
      if (current.key === key) {
        childPosition = RBTree.EChildPosition.LEFT;
        previous = current;
        break;
      } else if (current.key < key) {
        // 找右子树
        childPosition = RBTree.EChildPosition.RIGHT;
        previous = current;
        current = current[childPosition];
        continue;
      } else {
        // 找左子树
        childPosition = RBTree.EChildPosition.LEFT;
        previous = current;
        current = current[childPosition];
        continue;
      }
    }
    return [previous, childPosition];
  }

  /**
   * 将待插入节点插入被插入节点
   * @param {*} insertedNode 被插入节点
   * @param {*} insertPostion 被插入位置 左/右
   * @param {*} toBeInsertedNode 待插入节点
   */
  _insertNode(insertedNode, insertPostion, toBeInsertedNode) {
    if (!insertedNode || !insertPostion || !toBeInsertedNode) return;
    insertedNode[insertPostion] = toBeInsertedNode;
    toBeInsertedNode.parent = insertedNode;
  }

  /**
   * 找到节点在父节点的位置
   * @param {*} parent 父节点
   * @param {*} node 子节点
   * return postion 左/右/(null 不存在父子关系)
   */
  _getNodePositionInParent(parent, node) {
    if (parent.left === node) {
      return RBTree.EChildPosition.LEFT;
    } else if (parent.right === node) {
      return RBTree.EChildPosition.RIGHT;
    } else {
      return null;
    }
  }

  /**
   * 获取叔叔节点
   * @param {*} node
   * return [叔叔节点，叔叔节点位置 (左/右)]
   */
  _getNodeUncle(node) {
    const parent = node.parent;
    if (!parent) return;
    const nodePosition = this._getNodePositionInParent(parent, node);
    const unclePosition =
      nodePosition === RBTree.EChildPosition.LEFT
        ? RBTree.EChildPosition.RIGHT
        : RBTree.EChildPosition.LEFT;
    return [parent[unclePosition], unclePosition];
  }

  /**
   * 右旋函数： 例如下
   *           |        |
   *         axis  ->   node
   *       /               \
   *    node               axis
   * @param {*} axisNode
   * @param {*} node
   */
  _rightRound(axisNode, node) {
    if (axisNode.parent === null) {
      // root节点
      this.root = node;
    } else {
      const axisNodeInParentPosition = this._getNodePositionInParent(
        axisNode.parent,
        axisNode
      );
      this._insertNode(axisNode.parent, axisNodeInParentPosition, node);
      if (node.right) {
        // 挂载node右节点到axisNode左节点
        this._insertNode(axisNode, RBTree.EChildPosition.LEFT, node.right);
      }
      this._insertNode(node, RBTree.EChildPosition.RIGHT, axisNode);
    }
  }

  /**
   * 左旋函数： 例如下
   *  |                 |
   *  axis     ->     node
   *     \            /
   *    node       axis
   * @param {*} axisNode
   * @param {*} node
   */
  _leftRound(axisNode, node) {
    if (axisNode.parent === null) {
      // root节点
      this.root = node;
    } else {
      const axisNodeInParentPosition = this._getNodePositionInParent(
        axisNode.parent,
        axisNode
      );
      this._insertNode(axisNode.parent, axisNodeInParentPosition, node);
      if (node.right) {
        // 挂载node左节点到axisNode右节点
        this._insertNode(axisNode, RBTree.EChildPosition.RIGHT, node.left);
      }
      this._insertNode(node, RBTree.EChildPosition.LEFT, axisNode);
    }
  }

  /** 插入处理 */
  // 判断是否是插入情况3 即 祖先为黑，符节点和叔叔节点为红
  _isGrandParentBlackAndBothChildRed(grandParent, parent, uncle) {
    return (
      parent.color === RBTree.ERBTNodeColor.RED &&
      uncle.color === RBTree.ERBTNodeColor.RED &&
      grandParent.color === RBTree.ERBTNodeColor.BLACK
    );
  }

  // 调整情况3
  _adjustGrandParentBlackAndBothChildRed(grandParent, parent, uncle) {
    uncle.color = parent.color = RBTree.ERBTNodeColor.BLACK;
    grandParent.color = RBTree.ERBTNodeColor.RED;
    if (grandParent === this.root) {
      // 递归到root节点 停止
      grandParent.color = RBTree.ERBTNodeColor.BLACK;
      return;
    }
    if (
      grandParent.parent &&
      grandParent.parent?.color &&
      grandParent.parent.color === RBTree.ERBTNodeColor.RED
    ) {
      const newParent = grandParent.parent;
      const newGrandParent = newParent.parent;
      const [newUncle] = this._getNodeUncle(newParent);
      this._adjustGrandParentBlackAndBothChildRed(
        newGrandParent,
        newParent,
        newUncle
      );
    }
  }

  // 判断 情况 4 5： 父节点红，叔节点黑，祖先节点黑
  _isParentRedAndGrandParentUncleBlack(grandParent, parent, uncle) {
    return (
      parent.color === RBTree.ERBTNodeColor.RED &&
      uncle.color === RBTree.ERBTNodeColor.BLACK &&
      grandParent.color === RBTree.ERBTNodeColor.BLACK
    );
  }

  /** ------------- 外部暴露方法 --------------- */
  // 树是否空
  empty() {
    return !!(this.root === null);
  }

  // 插入节点
  insert(key, value) {
    // 生成一个普通节点
    const newNode = RBTree.generateRBNode(key, value);
    // 情况1: 空树情况，设置根节点
    if (this.empty()) {
      this.root = newNode;
      // 根节点颜色必须是黑色
      newNode.color = RBTree.ERBTNodeColor.BLACK;
      return;
    }
    // 找到要插入的节点和位置
    const [insertNode, insertPosition] = this._findInsertTreeNodeByKey(
      this.root,
      newNode.key
    );
    // console.log(insertNode, insertPosition);

    // 情况2: 如果要插入的节点是黑色，直接插入，无需任何调整
    if (insertNode.color === RBTree.ERBTNodeColor.BLACK) {
      this._insertNode(insertNode, insertPosition, newNode);
      // 设置parent指针
      return;
    }

    // 如果插入节点是红色的情况 （此时插入节点一定不是根，因为根节点必须是黑色）
    if (insertNode.color === RBTree.ERBTNodeColor.RED) {
      // 此时需要找到几个相关节点
      // 1. 新节点的parent 也就是找到的插入节点
      const parent = insertNode;
      // 2. 祖先节点，插入节点的父亲
      const grandParent = parent.parent;
      // 父节点位置
      const parentPosition = this._getNodePositionInParent(grandParent, parent);
      // 3. 叔叔节点,叔叔节点位置
      const [uncle, unclePosition] = this._getNodeUncle(parent);

      // 情况3,叔叔节点，父节点都是红色，祖先节点是黑色
      if (this._isGrandParentBlackAndBothChildRed(grandParent, parent, uncle)) {
        this._adjustGrandParentBlackAndBothChildRed(grandParent, parent, uncle);
        // 调整后插入
        this._insertNode(parent, insertPosition, newNode);
        return;
      }

      // 情况 4 5 父节点红，叔节点黑，祖先节点黑
      if (_isParentRedAndGrandParentUncleBlack(grandParent, parent, uncle)) {
        // LL/RR 即：父节点在祖先节点左，插入节点在父节点左 ｜ 父节点在祖先节点右，插入节点在爷节点右
        // LL grandparent为axis对parent右旋 + 父节点黑，祖先节点红
        if (
          parentPosition === RBTree.EChildPosition.LEFT &&
          insertPosition === RBTree.EChildPosition.LEFT
        ) {
          this._rightRound(grandParent, parent);
          // 上色
          parent.color = RBTree.EChildPosition.BLACK;
          grandParent.color = RBTree.EChildPosition.RED;
          this._insertNode(parent, insertPosition, newNode);
        }

        // RR grandparent为axis对parent左旋 + 父节点黑，祖先节点红
        if (
          parentPosition === RBTree.EChildPosition.RIGHT &&
          insertPosition === RBTree.EChildPosition.RIGHT
        ) {
          this._leftRound(grandParent, parent);
          // 上色
          parent.color = RBTree.EChildPosition.BLACK;
          grandParent.color = RBTree.EChildPosition.RED;
          this._insertNode(parent, insertPosition, newNode);
        }

        // LR/RL 即：父节点在祖先节点左，插入节点在父节点右 ｜ 父节点在祖先节点右，插入节点在爷节点左
        // LR 先以parent为axis 对新插入节点左旋，再以grandParent为axis对新插入节点右旋
        // newNode上色为黑，grandParent上色为红
        if (
          parentPosition === RBTree.EChildPosition.LEFT &&
          insertPosition === RBTree.EChildPosition.RIGHT
        ) {
          // 先插入，后调整
          this._insertNode(parent, insertPosition, newNode);
          // 左旋
          this._leftRound(parent, newNode);
          // 右旋
          this._rightRound(grandParent, newNode);
          // 上色
          newNode.color = RBTree.ERBTNodeColor.BLACK;
          grandParent.color = RBTree.ERBTNodeColor.RED;
        }

        // RL 先以parent为axis 对新插入节点右旋，再以grandParent为axis对新插入节点左旋
        if (
          parentPosition === RBTree.EChildPosition.RIGHT &&
          insertPosition === RBTree.EChildPosition.LEFT
        ) {
          // 先插入，后调整
          this._insertNode(parent, insertPosition, newNode);
          // 右旋
          this._rightRound(parent, newNode);
          // 左旋
          this._leftRound(grandParent, newNode);
          // 上色
          newNode.color = RBTree.ERBTNodeColor.BLACK;
          grandParent.color = RBTree.ERBTNodeColor.RED;
        }
      }
    }
  }

  // 删除节点
  delete(key) {}

  // 搜索节点
  search() {}
}

//  10 18 8 9 3 2
const rbTree = new RBTree();
rbTree.insert(10, "根节点");
rbTree.insert(18, "18节点");
rbTree.insert(8, "8节点");
rbTree.insert(7, "7节点");
rbTree.insert(9, "9节点");
rbTree.insert(6, "6节点");
console.log(rbTree.root);
