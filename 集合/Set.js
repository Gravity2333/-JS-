/** 封装集合 */
class Set {
  constructor() {
    this.items = {};
  }

  add(val) {
    if (this.has(val)) {
      // 如果存在，则失败
      return false;
    }
    this.items[val] = val;
    return true;
  }

  remove(val) {
    if (this.has(val)) {
      delete this.items[val];
      return true;
    }
    return false;
  }

  has(val) {
    if (this.items.hasOwnProperty(val)) {
      return true;
    }
    return false;
  }

  size() {
    return this.values()?.length;
  }

  values() {
    return Object.keys(this.items);
  }

  clear() {
    this.items = {};
  }

  // 集合之间操作
  // 并集 union
  union(otherSet){
    // pure function
    const unionSet = new Set()
    for(let i of [...this.values(),...otherSet.values()]){
        unionSet.add(i)
    }
    return unionSet
  }

  // 交集
  intersection(otherSet){
    const intersectionSet = new Set()
    for(let i of this.values()){
        if(otherSet.has(i)){
            intersectionSet.add(i)
        }
    }
    return intersectionSet
  }

  // 差集
  difference(otherSet){
    const differenceSet = new Set()
    for(let i of this.values()){
        if(!otherSet.has(i)){
            differenceSet.add(i)
        }
    }
    return differenceSet
  }

  // 子集判断,本集合是另外集合的子集吗
  isSubsetOf(otherSet){
    for(let i of this.values()){
        if(!otherSet.has(i)){
            return false
        }
    }
    return true
  }
}


const set = new Set()
set.add(1)
set.add(2)
set.add(3)
set.add(4)

const set2 = new Set()
set2.add(3)
set2.add(4)
set2.add(5)
set2.add(6)

console.log(set.values(),set2.values(),'union:',set.union(set2).values())
console.log(set.values(),set2.values(),'intersection:',set.intersection(set2).values())
console.log(set.values(),set2.values(),'difference:',set.difference(set2).values())
console.log('set:',set.values(),' is subset of union set set:',set.union(set2).values(),set.isSubsetOf(set.union(set2)))
