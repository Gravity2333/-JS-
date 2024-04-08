const {Stack} = require('./stack_base_array')

function OctToBinary(value){
    const stack = new Stack()
    while(value>0){
        const remainder = value%2
        value = Math.floor(value/2)
        stack.push(remainder)
    }
    let res = ''
    while(!stack.isEmpty()){
        res += stack.pop()
    }
    return res
}

console.log('100',OctToBinary(100))
console.log('200',OctToBinary(200))
console.log('240',OctToBinary(240))