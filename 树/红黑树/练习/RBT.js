// 定义两种颜色
const ERBTNodeColor = Object.freeze({
  RED: "RED",
  BLACK: "BLACK",
});

// 定义NIL外部节点
class NILNode {
  static NIL_KEY = "NIL";
  constructor() {
    this.key = NILNode.NIL_KEY;
    // NIL节点颜色为黑色
    this.color = ERBTNodeColor.BLACK;
  }
}

// 红黑树节点
class RBTNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = new NILNode();
    this.right = new NILNode();
    this.parent = null;
    // 普通节点默认颜色为红色
    this.color = ERBTNodeColor.RED;
  }
}

// 定义红黑树
class RBTree {
  constructor() {
    // 定义树根
    this.root = null;
  }

  // 插入节点
  insert(key, value) {}

  // 删除节点
  delete(key) {}

  // 搜索节点
  search() {}
}

const rbTree = new RBTNode();
