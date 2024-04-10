/** 双向链表 */

class DoublyLinkedNode {
    constructor(element) {
        this.element = element
        this.prev = null
        this.next = null
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    append(element) {
        const newElement = new DoublyLinkedNode(element)
        if (this.head === null) {
            // 第一个节点
            this.head = newElement
            this.tail = newElement
        } else {
            // 不是第一个节点
            /** 设置新元素前驱后继指针 */
            newElement.prev = this.tail
            newElement.next = null
            //设置tail
            this.tail = this.tail.next = newElement
        }
        /** 自增length */
        this.length++
    }

    insert(position, element) {
        if (position > this.length || position < 0) {
            return
        }

        const newElem = new DoublyLinkedNode(element)

        if (this.length === 0) {
            this.tail = this.head = newElem
        } else {
            if (position === 0) {
                // 在开头插入
                newElem.prev = null
                newElem.next = this.head
                this.head = this.head.prev = newElem
            } else if (position === this.length) {
                //在末尾插入
                newElem.next = null
                newElem.prev = this.tail
                this.tail = this.tail.next = newElem
            } else {
                //在中间插入
                let index = 0
                let currendNode = this.head
                while (index++ < position) {
                    currendNode = currendNode.next
                }
                newElem.prev = currendNode.prev
                newElem.next = currendNode
                newElem.prev.next = newElem
                currendNode.prev = newElem

            }
        }
        this.length++
    }

    /** get */
    get(position) {
        if (position < 0 || position >= this.length) {
            return
        } else {
            if (this.length / 2 > position) {
                // position小于length的一半
                let index = 0
                let currendNode = this.head
                while (index++ < position) {
                    currendNode = currendNode.next
                }
                return currendNode.element
            } else {
                let index = this.length - 1
                let currendNode = this.tail
                while (index-- > position) {
                    currendNode = currendNode.prev
                }
                return currendNode.element
            }
        }
    }

    /** indexOf */
    indexOf(element) {
        let currendNode = this.head
        let index = 0
        while (currendNode) {
            if (currendNode.element === element) {
                return index
            } else {
                index++
                currendNode = currendNode.next
            }
        }
        return -1
    }

    /** 更新 */
    update(position, element) {
        if (position < 0 || position >= this.length) {
            return
        }
        if (this.length / 2 > position) {
            // 从head开始
            let index = 0
            let currendNode = this.head
            while (index++ < position) {
                currendNode = currendNode.next
            }
            currendNode.element = element
        } else {
            // 从tail开始
            let index = this.length - 1
            let currendNode = this.tail
            while (index-- > position) {
                currendNode = currendNode.prev
            }
            currendNode.element = element
        }
    }

    /** removeAt */
    removeAt(position) {
        if (position < 0 || position >= this.length) {
            return
        }

        if (this.length === 0) {
            return
        }

        if (this.length === 1) {
            this.head = this.tail = null
        } else {
            if (position === 0) {
                // 删第0个
                this.head = this.head.next
                this.head.prev = null
                this.length--
            } else if (position === this.length - 1) {
                // 删最后一个
                this.tail = this.tail.prev
                this.tail.next = null
                this.length--
            } else {
                // 删中间
                let index = 0
                let currentNode = this.head
                while (index++ < position) {
                    currentNode = currentNode.next
                }
                currentNode.prev.next = currentNode.next
                currentNode.next.prev = currentNode.prev
                this.length--
            }
        }
    }

    /**remove */
    remove(element) {
        const index = this.indexOf(element)
        if (index >= 0) {
            this.removeAt(index)
        }
    }

    /** size */
    size() {
        return this.length
    }

    /** isEmpty */
    isEmpty() {
        return this.size() === 0
    }

    /** 遍历 */
    toString() {
        return this.backwardString()
    }

    forwardString() {
        const elementList = []
        let currentNode = this.tail
        while (currentNode) {
            elementList.push(currentNode.element)
            currentNode = currentNode.prev
        }
        return elementList.join(',')
    }

    backwardString() {
        const elementList = []
        let currentNode = this.head
        while (currentNode) {
            elementList.push(currentNode.element)
            currentNode = currentNode.next
        }
        return elementList.join(',')
    }
}

const doublyLinkedList = new DoublyLinkedList()
doublyLinkedList.append('a')
doublyLinkedList.append('b')
doublyLinkedList.append('c')
doublyLinkedList.append('d')
doublyLinkedList.append('e')
doublyLinkedList.append('f')
doublyLinkedList.append('i')
doublyLinkedList.append('j')
doublyLinkedList.append('k')
doublyLinkedList.append('l')
// doublyLinkedList.insert(0,'a0')
// doublyLinkedList.insert(1,'b1')
// doublyLinkedList.insert(2,'c2')
// doublyLinkedList.insert(3,'d3')
// doublyLinkedList.insert(4,'e4')
doublyLinkedList.insert(1, 'insert')
console.log(doublyLinkedList.backwardString())
// console.log(doublyLinkedList.get(8))
// console.log(doublyLinkedList.indexOf('k'))
// doublyLinkedList.update(8,'K')
// doublyLinkedList.update(0,'A')
// doublyLinkedList.update(4,'E')
// console.log(doublyLinkedList.backwardString())
// doublyLinkedList.removeAt(0)
// doublyLinkedList.removeAt(1)
// doublyLinkedList.removeAt(doublyLinkedList.size()-1)
// doublyLinkedList.remove('E')
// doublyLinkedList.remove('A')
// doublyLinkedList.remove('K')
// // console.log(doublyLinkedList.indexOf('k1'))
// console.log(doublyLinkedList.backwardString())