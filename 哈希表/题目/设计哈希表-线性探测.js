 // LINEAR DECT
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
         }
         return num
     } else if (direction === 'desc') {
         while (!this.isPrime(num)) {
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
     // 探测过程
     while (!!this.storage[index] && this.storage[index] !== DELETE_SIGNAL) {
         if (this.storage[index][0] === key) {
             this.storage[index] = [key, value]
             return
         }
         // detect
         index = (index + 1) % this.limit
     }
     this.storage[index] = [key, value]
     this.length++
     // caculate load factor
     if ((this.length / this.limit) > 0.75) {
         this.resize(8 * this.limit)
     }
 };
 
 /** 
  * @param {number} key
  * @return {number}
  */
 MyHashMap.prototype.get = function (key) {
     let index = this.hashFunc(key)
     while (!!this.storage[index] &&
         this.storage[index][0] !== key) {
         index = (index + 1) % this.limit
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
     while (!!this.storage[index] &&
         this.storage[index][0] !== key) {
         index = (index + 1) % this.limit
     }
     if(this.storage[index]){
         this.storage[index][0] = DELETE_SIGNAL
         this.length--
         if(this.length > DEFAULT_BASE_NUMBER && ( this.length / this.limit ) < 0.25){
             this.resize(Math.floor(this.limit/2))
         }
     }
 };
 // ["MyHashMap","put","put","get","get","put","get","remove","get"]
// [[],[1,1],[2,2],[1],[3],[2,1],[2],[2],[2]]
const hashMap = new MyHashMap()
hashMap.put(1,1)
hashMap.put(2,2)
console.log(hashMap)
console.log(hashMap.get(1))
console.log(hashMap.get(3))
hashMap.put(2,1)
console.log(hashMap)
console.log(hashMap.get(2))
hashMap.remove(2)
console.log(hashMap)
console.log(hashMap.get(2))