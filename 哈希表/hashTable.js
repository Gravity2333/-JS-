class HashTable {
    constructor() {
        // 定义数组
        this.storage = []
        // 定义数据数量
        this.count = 0
        // 记录数组长度
        this.limit = 7
    }

    /** 将字符串转换成大的数字，并且将大的数字转换成小的范围 */
    HashFunc(str, size) {
        let hashCode = 0
        // 幂底数最好用一个质数
        const BASE_NUM = 37
        // 霍纳算法 
        // 使用charCodeAt 获取unicode编码
        for (let i = 0; i < str.length; i++) {
            hashCode = hashCode * BASE_NUM + str.charCodeAt(i)
        }
        // 转换成小的范围
        return hashCode % size
    }

    isPrime(num){
        if(num === 1) return false
        for(let i = 2;i<=Math.sqrt(num);i++){
            if(num%i === 0){
                return false
            }
        }
        return true
    }

    getNearestPrime(num){
        while(!this.isPrime(num)){
            num++
        }
        return num
    }

    // 插入&修改
    put(key, value) {
        // 1. 根据key 获取索引值
        // 2. 根据索引值 取得(创建)bucket
        // 3. 遍历 判断新增还是修改值
        // 如果有值 修改 如果没有 添加在末尾
        const index = this.HashFunc(key, this.limit)
        let bucket = this.storage[index]
        if (!bucket) {
            this.storage[index] = bucket = []
        }
        for (let tuple of bucket) {
            if (key === tuple[0]) {
                tuple[1] = value
                return
            }
        }
        bucket.push([key, value])
        this.count++

        // 判断是否需要扩容
        if(this.count/this.limit>0.75){
            this.resize(this.getNearestPrime(2*this.limit))
        }
    }


    get(key) {
        const index = this.HashFunc(key, this.limit)
        const bucket = this.storage[index]
        if (!bucket) {
            return undefined
        }
        for (let tuple of bucket) {
            if (key === tuple[0]) {
                return tuple[1]
            }
        }
    }

    delete(key) {
        const index = this.HashFunc(key, this.limit)
        const bucket = this.storage[index]
        if (!bucket) {
            return undefined
        }
        for (let i = 0; i < bucket.length; i++) {
            const tuple = bucket[i]
            if (key === tuple[0]) {
                bucket.splice(i, 1)
                this.count--
                if(this.limit > 7 &&this.count/this.limitA<0.25){
                    this.resize(this.getNearestPrime(Math.floor(this.limit/2)))
                }
                return tuple[1]
            }
        }
        return undefined
    }

    isEmpty(){
        return this.size()
    }

    size(){
        return this.count
    }

    resize(newLimit){
        const oldStorage = this.storage
        this.storage = []
        this.limit = newLimit
        this.count = 0
        for(let bucket of oldStorage){
            if(!bucket){
                continue;
            }
            for(let tuple of bucket){
                this.put(tuple[0],tuple[1])
            }
        }
    }
}

const hashTable = new HashTable()
hashTable.put('helloworld', "哈哈哈哈")
hashTable.put('helloworld', "哈哈哈哈")
hashTable.put('你好！！', "哈哈哈哈111")
hashTable.put('abc', 12323121)
hashTable.put('你好22！！', "哈哈哈哈11122")
hashTable.put('abc22', 1232312331)
console.log(hashTable)

console.log(hashTable)

