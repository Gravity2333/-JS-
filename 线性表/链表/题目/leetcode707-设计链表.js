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

function NodeLink(val) {
    this.val = val
    this.next = null
}

var MyLinkedList = function () {
    this.head = null
    this.length = 0
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
    if (index < 0 || index >= this.length) return -1;
    let i = 0;
    let currentNode = this.head
    while (i++ < index) {
        currentNode = currentNode.next
    }
    return currentNode.val
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
    const newElem = new NodeLink(val)
    if (this.head) {
        // 有元素
        newElem.next = this.head
        this.head = newElem
    } else {
        //无元素
        this.head = newElem
    }
    this.length++
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
    if (!this.head) {
        this.addAtHead(val)
        return
    }
    let currendNode = this.head
    while (currendNode?.next) {
        currendNode = currendNode?.next
    }
    currendNode.next = new NodeLink(val)
    this.length++
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
    if (index < 0 || index > this.length) return;
    const newElem = new NodeLink(val)
    if (this.length === 0) {
        // 此时index也为0
        this.head = newElem
    } else {
        //此时 0 <=index <= this.length
        if (index === 0) {
            //插入第一个
            newElem.next = this.head
            this.head = newElem
        } else {
            let i = 0
            let currentNode = this.head
            while (i++ < index - 1) {
                currentNode = currentNode.next
            }
            newElem.next = currentNode.next
            currentNode.next = newElem
        }
    }
    this.length++
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
    if (index < 0 || index >= this.length) return;
    if (this.length === 0) return
    if (index === 0) {
        // 删除第一个节点
        this.head = this.head.next
    } else {
        let i = 0
        let currentNode = this.head
        while (i++ < index - 1) {
            currentNode = currentNode.next
        }
        currentNode.next = currentNode.next?.next
    }
    this.length--
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */