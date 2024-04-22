class ArrayList {
  constructor(...args) {
    this.data = args;
  }

  insert(val) {
    this.data.push(val);
  }

  // 冒泡排序，写成pure function的方式
  bubbleSort() {
    const newArrayList = new ArrayList(...this.data);
    const list = newArrayList.data;
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list.length - i - 1; j++) {
        if (list[j] > list[j + 1]) {
          const temp = list[j];
          list[j] = list[j + 1];
          list[j + 1] = temp;
        }
      }
    }
    return newArrayList;
  }

  // 选择排序
  selectionSort() {
    const newArrayList = new ArrayList(...this.data);
    const list = newArrayList.data;
    for (let i = 0; i < list.length; i++) {
      let minIndex = i;
      for (let j = i; j < list.length; j++) {
        if (list[minIndex] > list[j]) {
          minIndex = j;
        }
      }
      // swap
      if (minIndex !== i) {
        const temp = list[minIndex];
        list[minIndex] = list[i];
        list[i] = temp;
      }
    }
    return newArrayList;
  }

  // 插入排序
  insertionSort() {
    const newArrayList = new ArrayList(...this.data);
    const list = newArrayList.data;
    // i代表待查肉默认0是有序的，从1开始
    for (let i = 1; i < list.length; i++) {
      const toBeInsertedVal = list[i]
      for (let j = i - 1; j >= 0; j--) {
        // 如果待插入节点大于当前查找节点,则插入，结束循环
        if (list[j] <= toBeInsertedVal) {
            list[j+1] = toBeInsertedVal
            break;
        }
        // 如果待插入节点更小，则后移j节点
        else if(list[j] > toBeInsertedVal){
            list[j+1] = list[j]
        }
        if(j === 0){
            list[0] = toBeInsertedVal
        }
      }
    }
    return newArrayList
  }

  toString() {
    return this.data.join(",");
  }
}

const arrayList = new ArrayList(
  100,
  20,
  30,
  1,
  0,
  23,
  45,
  22,
  50,
  10,
  1,
  1,
  100,
  0,
  -1,
  24,
  1,
  23494,
  1230,
  10,
  303,
  40,
  530,
  6,
  1,
  -1,
  0,
  0,
  0,
  4,
  2,
  3,
  4,
  5,
  1,
  11,
  111,
  22,
  2334
);
console.log(`${arrayList}`);
// console.log(`${arrayList.bubbleSort()}`);
console.log(`${arrayList.selectionSort()}`);
console.log(`${arrayList.insertionSort()}`);
