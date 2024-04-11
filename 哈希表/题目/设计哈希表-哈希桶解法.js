/**
 * 不使用任何内建的哈希表库设计一个哈希映射（HashMap）。

实现 MyHashMap 类：

MyHashMap() 用空映射初始化对象
void put(int key, int value) 向 HashMap 插入一个键值对 (key, value) 。如果 key 已经存在于映射中，则更新其对应的值 value 。
int get(int key) 返回特定的 key 所映射的 value ；如果映射中不包含 key 的映射，返回 -1 。
void remove(key) 如果映射中存在 key 的映射，则移除 key 和它所对应的 value 。
 

示例：

输入：
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
输出：
[null, null, null, 1, -1, null, 1, null, -1]

解释：
MyHashMap myHashMap = new MyHashMap();
myHashMap.put(1, 1); // myHashMap 现在为 [[1,1]]
myHashMap.put(2, 2); // myHashMap 现在为 [[1,1], [2,2]]
myHashMap.get(1);    // 返回 1 ，myHashMap 现在为 [[1,1], [2,2]]
myHashMap.get(3);    // 返回 -1（未找到），myHashMap 现在为 [[1,1], [2,2]]
myHashMap.put(2, 1); // myHashMap 现在为 [[1,1], [2,1]]（更新已有的值）
myHashMap.get(2);    // 返回 1 ，myHashMap 现在为 [[1,1], [2,1]]
myHashMap.remove(2); // 删除键为 2 的数据，myHashMap 现在为 [[1,1]]
myHashMap.get(2);    // 返回 -1（未找到），myHashMap 现在为 [[1,1]]

 */

const HASH_MAP_LENGTH = 7
const HASH_BASE_NUMBER = 37
/** 实现哈希桶 */
var MyHashMap = function () {
    this.storage = []
    this.length = 0
    this.limit = HASH_MAP_LENGTH
};

/** key => hashcode */
MyHashMap.prototype.hashFunc = function (key) {
    let hashCode = 0
    for (let i = 0; i < key?.length; k++) {
        hashCode = hashCode * HASH_BASE_NUMBER + key.chatCodeAt(i)
    }
    return hashCode % this.limit
}

/** isPrime */
MyHashMap.prototype.isPrime = function (num) {
    if (num <= 1) {
        return false
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false
        }
    }
    return true
}

MyHashMap.prototype.getNearestPrime = function (num) {
    while (!this.isPrime(num)) {
        num++
    }
    return num
}

MyHashMap.prototype.resize = function (newLimit) {
    const oldStorage = this.storage
    this.storage = []
    this.length = 0
    this.limit = this.getNearestPrime(newLimit)
    for (let bucket of oldStorage) {
        if (bucket) {
            for (let [key, value] of bucket) {
                this.put(key, value)
            }
        }
    }
}

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function (key, value) {
    const index = this.hashFunc(key)
    let bucket = this.storage[index]
    if (!bucket) {
        this.storage[index] = bucket = []
    }
    let isExist = false
    for (let tuple of bucket) {
        if (tuple[0] === key) {
            tuple[1] = value
            isExist = true
        }
    }
    if (!isExist) {
        bucket.push([key, value])
    }
    this.length++
    if ((this.length / this.limit) > 0.75) {
        // loadFacter>0.75
        this.resize(this.limit * 2)
    }
};

/** 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function (key) {
    const index = this.hashFunc(key)
    let bucket = this.storage[index]
    if (!bucket) {
        return -1
    } else {
        for (let tuple of bucket) {
            if (tuple[0] === key) {
                return tuple[1]
            }
        }
    }
    return -1
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function (key) {
    const index = this.hashFunc(key)
    let bucket = this.storage[index]
    if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
            const tuple = bucket[i]
            if (tuple[0] === key) {
                bucket.splice(i, 1)
                this.length--
                if (this.limit > 7 && this.length / this.limitA < 0.25) {
                    this.resize(this.getNearestPrime(Math.floor(this.limit / 2)))
                }
            }
        }
    }
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */