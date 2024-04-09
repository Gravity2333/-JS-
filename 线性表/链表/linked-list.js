class LinkedNode {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    // 头节点
    this.header = null;
    // 长度
    this.length = 0;
  }

  // 增
  // 末尾加入
  append(element) {
    const newElem = new LinkedNode(element);
    if (this.header === null) {
      // 第一个节点的情况
      this.header = newElem;
    } else {
      // 非第一个节点的情况，找到上一个节点
      let currentNode = this.header;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      // 找到最后一个节点
      currentNode.next = newElem;
    }
    this.length++;
  }

  // 插入
  insert(position, element) {
    if (position < 0) return;
    if (position >= this.length) {
      // 末尾添加
      this.append(element);
      return;
    }
    const newElem = new LinkedNode(element);
    if (position === 0) {
      newElem.next = this.header;
      this.header = newElem;
    } else {
      let currentNode = this.header;
      let index = 0;
      while (index < position - 1) {
        currentNode = currentNode.next;
        index++;
      }
      newElem.next = currentNode.next;
      currentNode.next = newElem;
      this.length++;
    }
  }

  // 删
  removeAt(position) {
    if (position >= this.length || position < 0) {
      return;
    }
    if (position === 0) {
      this.header = this.header?.next;
      this.length--;
      return;
    }
    let index = 0;
    let currentNode = this.header;
    while (index++ < position - 1) {
      currentNode = currentNode.next;
    }
    currentNode.next = currentNode.next?.next;
    this.length--;
  }

  remove(element) {
    let currentNode = this.header;
    let previous = null;
    while (currentNode) {
      if (currentNode.element === element) {
        previous.next = currentNode.next;
        break;
      } else {
        previous = currentNode;
        currentNode = currentNode.next;
      }
    }
    this.length--;
  }

  // 改
  update(position, element) {
    if (position >= this.length || position < 0) {
      return;
    }
    let index = 0;
    let currentNode = this.header;
    while (index++ < position) {
      currentNode = currentNode.next;
    }
    currentNode.element = element;
  }

  // 查
  get(position) {
    if (position >= this.length || position < 0) {
      return undefined;
    }
    let index = 0;
    let currentNode = this.header;
    while (index++ < position) {
      currentNode = currentNode.next;
    }
    return currentNode.element;
  }

  indexOf(element) {
    let currentNode = this.header;
    let index = 0;
    do {
      if (currentNode.element === element) {
        return index;
      } else {
        currentNode = currentNode.next;
        index++;
      }
    } while (currentNode);
    return -1;
  }

  // 长度相关
  size() {
    return this.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  toString() {
    let currentNode = this.header;
    let resultList = [];
    while (currentNode !== null) {
      resultList.push(currentNode.element);
      currentNode = currentNode.next;
    }
    return resultList.join(",");
  }
}

const linkedList = new LinkedList();
linkedList.append("a");
linkedList.append("b");
linkedList.append("c");
linkedList.append("d");
linkedList.append("e");
console.log(linkedList.toString(), linkedList.size());
// console.log(linkedList.toString());
// linkedList.insert(2, "insert-2");
// linkedList.insert(3, "insert-3");
// linkedList.insert(1, "insert-1");
// linkedList.insert(0, "insert-0");
// console.log(linkedList.toString());
// console.log(linkedList.get(0));
// console.log(linkedList.get(1));
// console.log(linkedList.get(2));
// console.log(linkedList.get(3));

// console.log(linkedList.indexOf("a"));
// console.log(linkedList.indexOf("insert-2"));
// console.log(linkedList.indexOf("insert-3"));
// console.log(linkedList.indexOf("insert-1"));
// console.log(linkedList.indexOf("insert-211"));

// linkedList.update(1, "A");
// console.log(linkedList.toString());
// linkedList.remove("A");
// linkedList.remove("b");
// console.log(linkedList.toString());
linkedList.removeAt(0);
console.log(linkedList.toString(), linkedList.size());
linkedList.removeAt(1)
console.log(linkedList.toString(),linkedList.size());
linkedList.removeAt(1)
console.log(linkedList.toString(),linkedList.size());
linkedList.removeAt(0)
console.log(linkedList.toString(),linkedList.size());
linkedList.removeAt(0)
console.log(linkedList.toString(),linkedList.size());
linkedList.removeAt(0)
console.log(linkedList.toString(),linkedList.size());

linkedList.removeAt(0)
console.log(linkedList.toString(),linkedList.size());
linkedList.removeAt(0)
console.log(linkedList.toString(),linkedList.size());