/** 开放地址现哈希表 */
/** 探测方式 'linear' 'quadratic' 'double'*/
class HashTable {
  // 哈希表长度 默认一个质数
  static HASH_TABLE_INIT_LENGTH = 7;
  // 幂底数最好用一个质数
  static BASE_NUMBER = 37;
  // 已删除标志
  static DELETED_SIGNAL = "__deleted_signal__";
  // ctor
  constructor(probeMode = "linear") {
    /** 设置存储数组 */
    this.storage = [];
    /** 设置哈希表长度 */
    this.limit = HashTable.HASH_TABLE_INIT_LENGTH;
    /** 设置哈希表长度 */
    this.length = 0;
    /** 探测方式 'linear' 'quadratic' 'double'*/
    this.probeMode = probeMode;
  }

  /** 判断是否为质数
   * 如果是不是质数，就一定有除了自己和1 以外的两个数相乘得到
   * 并且 这两个数必定一个<=sqrt(val)一个>=sqrt(val)  [sqrt开方]
   */
  _isPrime(val) {
    if (val <= 1) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(val); i++) {
      if (val % i === 0) {
        return false;
      }
    }
    return true;
  }

  /** 找到最近的质数
   * @params val
   * @params direction 'asc' 'desc' 向两个方向找
   */
  _getNearestPrime(val, directon = "asc") {
    let index = val;
    switch (directon) {
      case "asc":
        // 向上找最近的质数
        while (!this._isPrime(index)) {
          index++;
        }
        return index;
      case "desc":
        // 向下找最近的质数
        while (!this._isPrime(index) && index > 1) {
          index--;
        }
        return index;
      default:
        return val;
    }
  }

  /** 哈希函数
   * @params target 传入字符
   */
  _hashFunc(target) {
    // 霍纳算法将字符串转成很大的数字
    // (((anx + an-1)x + an-2)x + an-3)x .... a1)x + a0 = f(x)
    // x = HashTable.BASE_NUMBER
    let hashCode = 0;
    for (let i = 0; i < target.length; i++) {
      hashCode = hashCode * HashTable.BASE_NUMBER + target.charCodeAt(i);
    }
    // 映射到 [0 - this.limit)
    return hashCode % this.limit;
  }

  // probe: These methods are linear probing, quadratic probing, and double hashing
  _linearProbing(times) {
    // 线性探测
    return times;
  }

  _quadraticProbing(times) {
    // 二次探测
    return times * times;
  }

  _doubleHash(target) {
    // 再哈希
    // 霍纳算法将字符串转成很大的数字
    // (((anx + an-1)x + an-2)x + an-3)x .... a1)x + a0 = f(x)
    // x = HashTable.BASE_NUMBER
    let hashCode = 0;
    for (let i = 0; i < target.length; i++) {
      hashCode = hashCode * HashTable.BASE_NUMBER + target.charCodeAt(i);
    }
    // 找到小于this.limit 最近的质数
    const nearestPrime = this._getNearestPrime(this.limit, "desc");
    const stepSize = nearestPrime - (hashCode % nearestPrime);
    return stepSize;
  }

  // 重设哈希表长度
  _checkResize(type = "asc") {
    const loadFactor = this.length / this.limit;
    function resize(newLimit) {
      const oldStorage = this.storage;
      // 重置
      this.storage = [];
      this.length = 0;
      this.limit = newLimit;
      for (let item of oldStorage) {
        if (item) {
          this.put(item[0], item[1]);
        }
      }
    }
    if (type === "asc" && loadFactor > 0.75) {
      resize.call(this, this._getNearestPrime(2 * this.limit, "asc"));
      return;
    }

    if (type === "desc" && loadFactor < 0.25) {
      resize.call(this, this._getNearestPrime(0.5 * this.limit, "asc"));
      return;
    }
  }
  
  // size
  size() {
    return this.length;
  }

  // 是否为空
  isEmpty() {
    return this.size() === 0;
  }

  put(key, value) {
    // 计算index值
    let index = this._hashFunc(key);
    let probeTime = 0;
    let dectIndex = index;
    let doubleHashStep;
    // 查找位置
    while (
      !!this.storage[dectIndex] &&
      this.storage[dectIndex][0] !== HashTable.DELETED_SIGNAL &&
      // 这句用来处理相同值的情况
      this.storage[dectIndex][0] !== key
    ) {
      switch (this.probeMode) {
        case "linear":
          dectIndex =
            (index + this._linearProbing(index, probeTime++)) % this.limit;
          break;
        case "quadratic":
          dectIndex =
            (index + this._quadraticProbing(index, probeTime++)) % this.limit;
          break;
        case "double":
          probeTime++;
          if (doubleHashStep === undefined) {
            doubleHashStep = this._doubleHash(key);
          }
          dectIndex = (dectIndex + doubleHashStep) % this.limit;
          break;
      }
      console.log("线性探测次数:", probeTime, "index", dectIndex);
    }
    // 找到位置，加入数据
    console.log("添加:", { key, value }, "index", dectIndex);
    console.log(
      "-------------------------------------------------------------"
    );
    this.storage[dectIndex] = [key, value];
    this.length++;
    this._checkResize("asc");
  }

  get(key) {
    // 计算index值
    let index = this._hashFunc(key);
    let probeTime = 0;
    let dectIndex = index;
    let doubleHashStep;
    // 查找位置
    while (!!this.storage[dectIndex] && this.storage[dectIndex][0] !== key) {
      switch (this.probeMode) {
        case "linear":
          dectIndex =
            (index + this._linearProbing(index, probeTime++)) % this.limit;
          break;
        case "quadratic":
          dectIndex =
            (index + this._quadraticProbing(index, probeTime++)) % this.limit;
          break;
        case "double":
          probeTime++;
          if (doubleHashStep === undefined) {
            doubleHashStep = this._doubleHash(key);
          }
          dectIndex = (dectIndex + doubleHashStep) % this.limit;
          break;
      }
      console.log("线性探测次数:", probeTime, "index", dectIndex);
    }
    if (this.storage[dectIndex]) {
      console.log(
        "找到:",
        { key, value: this.storage[dectIndex][1] },
        "index",
        dectIndex
      );
      console.log(
        "-------------------------------------------------------------"
      );
      return this.storage[dectIndex][1];
    }
  }

  delete(key) {
    // 计算index值
    let index = this._hashFunc(key);
    let probeTime = 0;
    let dectIndex = index;
    let doubleHashStep;
    // 查找位置
    while (!!this.storage[dectIndex] && this.storage[dectIndex][0] !== key) {
      switch (this.probeMode) {
        case "linear":
          dectIndex =
            (index + this._linearProbing(index, probeTime++)) % this.limit;
          break;
        case "quadratic":
          dectIndex =
            (index + this._quadraticProbing(index, probeTime++)) % this.limit;
          break;
        case "double":
          probeTime++;
          if (doubleHashStep === undefined) {
            doubleHashStep = this._doubleHash(key);
          }
          dectIndex = (dectIndex + doubleHashStep) % this.limit;
          break;
      }
      console.log("线性探测次数:", probeTime, "index", dectIndex);
    }
    if (this.storage[dectIndex]) {
      console.log(
        "删除:",
        { key, value: this.storage[dectIndex] },
        "index",
        dectIndex
      );
      console.log(
        "-------------------------------------------------------------"
      );
      this.storage[dectIndex] = [HashTable.DELETED_SIGNAL];
      this.length--;
      this._checkResize("desc");
      return;
    }
  }
}

const hashTable = new HashTable("double");
hashTable.put("bill", { name: "bill", age: 18 });
hashTable.put("jack", { name: "jack", age: 18 });
hashTable.put("tom", { name: "tom", age: 18 });
hashTable.put("lucy", { name: "lucy", age: 18 });
hashTable.put("why", { name: "why", age: 18 });
hashTable.put("jasmine", { name: "jasmine", age: 18 });
hashTable.put("jasmine", { name: "jasmine", age: 18 });
console.log(hashTable);
console.log(hashTable.get("jasmine"));
// hashTable.put("alan", { name: "alan", age: 18 });
// hashTable.put("bill1", { name: "bill", age: 18 });
// hashTable.put("jack1", { name: "jack", age: 18 });
// hashTable.put("tom1", { name: "tom", age: 18 });
// hashTable.put("lucy1", { name: "lucy", age: 18 });
// hashTable.put("why1", { name: "why", age: 18 });
// hashTable.put("jasmine1", { name: "jasmine", age: 18 });
// hashTable.put("alan1", { name: "alan", age: 18 });

// console.log(hashTable);
// console.log(hashTable.get("jasmine"));
// console.log(hashTable.get("why"));
// console.log(hashTable.get("bill"));
// console.log(hashTable.get("jack"));
// console.log(hashTable.get("lucy"));
// console.log(hashTable.get("333222jasmine1"));

// hashTable.delete("jasmine");
// hashTable.delete("why");
// hashTable.delete("bill");
// hashTable.delete("jack");
// hashTable.delete("jack1");
// hashTable.delete("tom1");
// hashTable.delete("lucy");
// hashTable.delete("lucy1");
// hashTable.delete("333222jasmine1");
// hashTable.delete("why1");
// hashTable.delete("jasmine1");
// hashTable.delete("alan");
// hashTable.delete("alan1");
// console.log(hashTable);
