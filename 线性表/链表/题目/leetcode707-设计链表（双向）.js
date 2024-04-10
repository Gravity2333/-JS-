/**
 * 你可以选择使用单链表或者双链表，设计并实现自己的链表。

单链表中的节点应该具备两个属性：val 和 next 。val 是当前节点的值，next 是指向下一个节点的指针/引用。

如果是双向链表，则还需要属性 prev 以指示链表中的上一个节点。假设链表中的所有节点下标从 0 开始。

实现 MyLinkedList 类：

MyLinkedList() 初始化 MyLinkedList 对象。
int get(int index) 获取链表中下标为 index 的节点的值。如果下标无效，则返回 -1 。
void addAtHead(int val) 将一个值为 val 的节点插入到链表中第一个元素之前。在插入完成后，新节点会成为链表的第一个节点。
void addAtTail(int val) 将一个值为 val 的节点追加到链表中作为链表的最后一个元素。
void addAtIndex(int index, int val) 将一个值为 val 的节点插入到链表中下标为 index 的节点之前。如果 index 等于链表的长度，那么该节点会被追加到链表的末尾。如果 index 比长度更大，该节点将 不会插入 到链表中。
void deleteAtIndex(int index) 如果下标有效，则删除链表中下标为 index 的节点。
 */

function DoubleLinkedNode(val) {
    this.val = val
    this.prev = null
    this.next = null
}

var MyLinkedList = function () {
    this.head = null
    this.tail = null
    this.length = 0
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
    if (index < 0 || index >= this.length) {
        return -1
    }
    let i;
    let currentNode;
    if (this.length / 2 > index) {
        // 前一半找
        i = 0
        currentNode = this.head
        while (i++ < index) {
            currentNode = currentNode.next
        }
    } else {
        // 后一半找
        i = this.length - 1
        currentNode = this.tail
        while (i-- > index) {
            currentNode = currentNode.prev
        }
    }
    return currentNode.val
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
    const newElem = new DoubleLinkedNode(val)
    if (this.length === 0) {
        // 空表情况
        this.head = this.tail = newElem
    } else {
        // 表不空的情况下
        newElem.next = this.head
        newElem.prev = null
        this.head = newElem.next.prev = newElem
    }
    this.length++
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
    const newElem = new DoubleLinkedNode(val)
    if (this.length === 0) {
        // 表空的情况，和atHead类似
        this.head = this.tail = newElem
    } else {
        // 表不空的情况下
        newElem.next = null
        newElem.prev = this.tail
        this.tail = newElem.prev.next = newElem
    }
    this.length++
}

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
    if (index < 0 || index > this.length) {
        return
    }

    const newElem = new DoubleLinkedNode(val)
    if (this.length === 0) {
        // 相当于第0个插入
        this.head = this.tail = newElem
        this.length++
        return
    }

    if (index === 0) {
        // 在头部插入,且长度不为0，不用管tail，需要单独操作head
        newElem.next = this.head
        newElem.prev = null
        this.head = newElem.next.prev = newElem
    } else if (index === this.length) {
        // 在尾部插入，不用管head，需要单独操作tail
        newElem.next = null
        newElem.prev = this.tail
        this.tail = newElem.prev.next = newElem
    } else {
        // 非头尾插入，不用管head和tail
        // 快速找到位置
        let i;
        let currentNode;
        if (this.length / 2 > index) {
            i = 0
            currentNode = this.head
            // 插入位置在前一半 ，从head开始找
            while (i++ < index) {
                currentNode = currentNode.next
            }
        } else {
            // 插入位置在后一半，从tail开始找
            i = this.length - 1
            currentNode = this.tail
            while (i-- > index) {
                currentNode = currentNode.prev
            }
        }
        // 找到待插入位置
        newElem.next = currentNode
        newElem.prev = currentNode.prev
        currentNode.prev.next = newElem
        currentNode.prev = newElem
    }
    this.length++
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
    if (index < 0 || index >= this.length) {
        return
    }

    // 此时this.length一定>0
    if (this.length === 1) {
        // 此时 index 只能为0 需要操作首位指针
        this.head = this.tail = null
    } else {
        // 此时肯定有两个以上的节点，head tail不影响
        if (index === 0) {
            // 删除首节点 变动head
            this.head = this.head.next
        } else if (index === this.length - 1) {
            // 删除尾节点 变动tail
            this.tail = this.tail.prev
        } else {
            // 删除中间节点，head tail都不受影响
            let i;
            let currentNode;
            if (this.length / 2 > index) {
                // 从前开始找
                i = 0
                currentNode = this.head
                while (i++ < index) {
                    currentNode = currentNode.next
                }
            } else {
                // 从后开始找
                i = this.length - 1
                currentNode = this.tail
                while (i-- > index) {
                    currentNode = currentNode.prev
                }
            }
            // 找到要删除节点，删除
            currentNode.prev.next = currentNode.next
            currentNode.next.prev = currentNode.prev
        }
    }

    this.length--
};

MyLinkedList.prototype.toString = function () {
    let list = []
    let currentNode = this.head
    while(currentNode){
        list.push(currentNode.val)
        currentNode =currentNode.next
    }
    return list.join(',')
}
const doubleLinkedList = new MyLinkedList()
doubleLinkedList.addAtHead(7)
doubleLinkedList.addAtHead(3)
doubleLinkedList.addAtHead(1)
doubleLinkedList.addAtIndex(3,0)
console.log(doubleLinkedList,doubleLinkedList.get(4),doubleLinkedList.toString())
doubleLinkedList.deleteAtIndex(2)

// doubleLinkedList.addAtHead(6)
// doubleLinkedList.addAtTail(4)
// console.log(doubleLinkedList.length,doubleLinkedList.get(4),doubleLinkedList.toString())
// doubleLinkedList.addAtHead(4)
// doubleLinkedList.addAtIndex(5,0)
// console.log(doubleLinkedList.length,doubleLinkedList.get(1),doubleLinkedList.toString())
// doubleLinkedList.addAtHead(6)