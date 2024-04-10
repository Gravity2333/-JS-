
/** 将字符串转换成大的数字，并且将大的数字转换成小的范围 */
function HashFunc(str,size){
    let hashCode = 0 
    // 幂底数最好用一个质数
    const BASE_NUM = 37
    // 霍纳算法 
    // 使用charCodeAt 获取unicode编码
    for(let i=0;i<str.length;i++){
        hashCode = hashCode*BASE_NUM + str.charCodeAt(i)
    }
    // 转换成小的范围
    return hashCode % size
}


console.log(HashFunc('hello world',89))
console.log(HashFunc('abc',89))
console.log(HashFunc('你好吗',89))
console.log(HashFunc('Javascript',89))
console.log(HashFunc('10086',89))
