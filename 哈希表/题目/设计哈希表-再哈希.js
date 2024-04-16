 // 再哈希法实现哈希表
const DEFAULT_HASH_LIMIT = 11
const DEFAULT_BASE_NUMBER = 37
const DELETE_SIGNAL = Symbol('__delete_signal__')
var MyHashMap = function () {
    this.storage = []
    this.length = 0
    this.limit = DEFAULT_HASH_LIMIT
};

MyHashMap.prototype.isPrime = function (num) {
    if (num <= 1) {
        return false
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num  % i === 0) {
            return false
        }
    }
    return true
}


// dirction = 'asc'|'desc'
MyHashMap.prototype.getNearestPrime = function (num, direction = 'asc') {
    if (direction === 'asc') {
        while (!this.isPrime(num)) {
            num++
            console.log(num)
        }
        return num
    } else if (direction === 'desc') {
        while (!this.isPrime(num)) {
            console.log(num)
            num--
        }
        return num
    }

}

MyHashMap.prototype.hashFunc = function (target) {
    const hashCode = 0
    for (let i = 0; i < target.length; i++) {
        hashCode = hashCode * DEFAULT_BASE_NUMBER + target.charCodeAt(i)
    }
    return hashCode % this.limit
}

MyHashMap.prototype.doubleHash = function (target) {
    const constant = this.getNearestPrime(this.limit-1,'desc')
    const hashCode = 0
    for (let i = 0; i < target.length; i++) {
        hashCode = hashCode * DEFAULT_BASE_NUMBER + target.charCodeAt(i)
    }
    const stepLen = constant - (hashCode % constant)
    return stepLen
}

MyHashMap.prototype.resize = function (newLimit) {
    const oldStorage = this.storage
    this.storage = []
    this.limit = this.getNearestPrime(newLimit,'asc')
    this.length = 0
    for (let i = 0; i < oldStorage.length; i++) {
        if (!!oldStorage[i] && oldStorage[i] !== DELETE_SIGNAL) {
            this.put(oldStorage[i][0], oldStorage[i][1])
        }
    }
}

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function (key, value) {
    let index = this.hashFunc(key)
    const step = this.doubleHash(key)
    // 探测过程
    while (!!this.storage[index] && this.storage[index] !== DELETE_SIGNAL) {
        if (this.storage[index][0] === key) {
            this.storage[index] = [key, value]
            return
        }
        // detect
        index = (index + step) % this.limit
    }
    this.storage[index] = [key, value]
    this.length++
    // caculate load factor
    if ((this.length / this.limit) > 0.75) {
        this.resize(2 * this.limit)
    }
};

/** 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function (key) {
    let index = this.hashFunc(key)
    const step = this.doubleHash(key)
    while (!!this.storage[index] &&
        this.storage[index][0] !== key) {
        index = (index + step) % this.limit
    }
    if(this.storage[index]){
        return this.storage[index][1]
    }
    return -1
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function (key) {
    let index = this.hashFunc(key)
    const step = this.doubleHash(key)
    while (!!this.storage[index] &&
        this.storage[index][0] !== key) {
        index = (index + step) % this.limit
    }
    if(this.storage[index]){
        this.storage[index][0] = DELETE_SIGNAL
        this.length--
        if(this.length > DEFAULT_BASE_NUMBER && ( this.length / this.limit ) < 0.25){
            this.resize(Math.floor(this.limit/2))
        }
    }
};


const hashMap = new MyHashMap()
const methods = ["remove","put","remove","remove","get","remove","put","get","remove","put","put","put","put","put","put","put","put","put","put","put","remove","put","put","get","put","get","put","put","get","put","remove","remove","put","put","get","remove","put","put","put","get","put","put","remove","put","remove","remove","remove","put","remove","get","put","put","put","put","remove","put","get","put","put","get","put","remove","get","get","remove","put","put","put","put","put","put","get","get","remove","put","put","put","put","get","remove","put","put","put","put","put","put","put","put","put","put","remove","remove","get","remove","put","put","remove","get","put","put"]
const params = [[27],[65,65],[19],[0],[18],[3],[42,0],[19],[42],[17,90],[31,76],[48,71],[5,50],[7,68],[73,74],[85,18],[74,95],[84,82],[59,29],[71,71],[42],[51,40],[33,76],[17],[89,95],[95],[30,31],[37,99],[51],[95,35],[65],[81],[61,46],[50,33],[59],[5],[75,89],[80,17],[35,94],[80],[19,68],[13,17],[70],[28,35],[99],[37],[13],[90,83],[41],[50],[29,98],[54,72],[6,8],[51,88],[13],[8,22],[85],[31,22],[60,9],[96],[6,35],[54],[15],[28],[51],[80,69],[58,92],[13,12],[91,56],[83,52],[8,48],[62],[54],[25],[36,4],[67,68],[83,36],[47,58],[82],[36],[30,85],[33,87],[42,18],[68,83],[50,53],[32,78],[48,90],[97,95],[13,8],[15,7],[5],[42],[20],[65],[57,9],[2,41],[6],[33],[16,44],[95,30]]
function runTest(methods,params){
    for(let i=0;i<methods.length;i++){
        const method = methods[i]
        switch(method){
            case 'get':
                if(params[i][0] == 17){
                    debugger
                }
                console.log('get',params[i],hashMap.get(params[i][0]))
                break;
            case 'remove':
                console.log('delete',params[i],hashMap.remove(params[i][0]))
                break;
            case 'put':
                console.log('put',params[i],hashMap.put(params[i][0],params[i][1]))
                break;
            
        }
    }
}

runTest(methods,params)
// console.log(hashMap)

// ["MyHashMap","put","put","get","get","put","get","remove","get"]
// [[],[1,1],[2,2],[1],[3],[2,1],[2],[2],[2]]
// const hashMap = new MyHashMap()
// hashMap.put(1,1)
// hashMap.put(2,2)
// console.log(hashMap)
// console.log(hashMap.get(1))
// console.log(hashMap.get(3))
// hashMap.put(2,1)
// console.log(hashMap)
// console.log(hashMap.get(2))
// hashMap.remove(2)
// console.log(hashMap)
// console.log(hashMap.get(2))

// ["MyHashMap","remove","get","put","put","put","get","put","put","put","put"]
// [[],[14],[4],[7,3],[11,1],[12,1],[7],[1,19],[0,3],[1,8],[2,6]]
// const hashMap = new MyHashMap()
// hashMap.remove(14)
// console.log(hashMap.get(4))
// hashMap.put(7,3)
// hashMap.put(11,1)
// hashMap.put(12,1)
// console.log(hashMap.get(7))
// hashMap.put(1,19
// )
// hashMap.put(0,3)
// hashMap.put(1,8)
// console.log(hashMap)
// hashMap.put(2,6)