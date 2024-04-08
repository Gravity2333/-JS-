/** 基于数组实现栈 */
class Stack {
    constructor() {
        this.items = []
    }

    // 栈的操作
    // 弹出
    pop() {
        if (this.isEmpty()) return
        const value = this.items[this.items.length-1]
        this.items.length--
        return value
    }

    // 压入
    push(value) {
        this.items[this.items.length++] = value
    }

    // peek 偷看 查看栈顶元素 不会弹出
    peek() {
        return this.items[this.items.length - 1]
    }

    // 是否为空
    isEmpty() {
        return this.items?.length === 0
    }

    // 栈元素个数
    size() {
        return this.items?.length
    }

    // 转字符串
    toString() {
        return this.items?.join(',')
    }
}

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
stack.push(5)
console.log(stack,stack.toString(), stack.isEmpty(), stack.size(), stack.peek())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack)