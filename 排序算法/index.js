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
      const toBeInsertedVal = list[i];
      for (let j = i - 1; j >= 0; j--) {
        // 如果待插入节点大于当前查找节点,则插入，结束循环
        if (list[j] <= toBeInsertedVal) {
          list[j + 1] = toBeInsertedVal;
          break;
        }
        // 如果待插入节点更小，则后移j节点
        else if (list[j] > toBeInsertedVal) {
          list[j + 1] = list[j];
        }
        if (j === 0) {
          list[0] = toBeInsertedVal;
        }
      }
    }
    return newArrayList;
  }

  // 希尔排序
  shellSort() {
    const newArrayList = new ArrayList(...this.data);
    const list = newArrayList.data;
    // gap使用 n/2的形式
    let gap = Math.floor(list.length / 2);
    while (gap >= 1) {
      for (let i = gap; i < list.length; i++) {
        const toBeInsertedVal = list[i];
        for (let j = i - gap; j >= 0; j -= gap) {
          if (list[j] <= toBeInsertedVal) {
            list[j + gap] = toBeInsertedVal;
            break;
          } else if (list[j] > toBeInsertedVal) {
            list[j + gap] = list[j];
          }
          if (j === i - gap) {
            list[j] = toBeInsertedVal;
          }
        }
      }
      gap = Math.floor(gap / 2);
    }
    return newArrayList;
  }

  // 快速排序
  // 交换
  _swap(i, j, list) {
    const temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }

  _quickSortImpl(left, right, list) {
    if (left >= right) return;
    // 只要left < right 那么就至少存在两个元素，就可以执行quickSort
    // 获取pivot,比较三个位置的元素，类似于冒泡
    const pivot = (() => {
      const middle = Math.floor((left + right) / 2);
      if (list[left] > list[middle]) {
        this._swap(left, middle, list);
      }
      if (list[middle] > list[right]) {
        this._swap(middle, right, list);
      }
      if (list[left] > list[middle]) {
        this._swap(left, middle, list);
      }
      this._swap(middle, right - 1, list);
      return list[right - 1];
    })();

    let i = left + 1;
    let j = right - 2;

    while (i < j) {
      while (list[i] < pivot) {
        i++;
      }
      while (list[j] > pivot) {
        j--;
      }
      if (i < j) {
        this._swap(i++, j--, list);
      }
    }
    this._swap(i, right - 1, list);
    this._quickSortImpl(left, i - 1, list);
    this._quickSortImpl(i + 1, right, list);
  }

  quickSort() {
    if (this.data.length === 0) return [];
    const newArrayList = new ArrayList(...this.data);
    const list = newArrayList.data;
    this._quickSortImpl(0, list.length - 1, list);
    return list;
  }

  // 归并排序
  _mergeSortImpl(list) {
    // 一个元素的数组，不用排序，直接返回
    if (list.length <= 1) return list;
    // 如果长度大于1，分组
    const mid = Math.floor(list.length / 2);
    const leftList = this._mergeSortImpl(list.slice(0, mid));
    const rightList = this._mergeSortImpl(list.slice(mid));
    // 左右list都是有序的
    const temp = [];
    let i = 0,
      j = 0,
      k = 0;
    while (i < leftList.length && j < rightList.length) {
      if (leftList[i] <= rightList[j]) {
        temp[k++] = leftList[i++];
      } else {
        temp[k++] = rightList[j++];
      }
    }
    return [...temp, ...leftList.slice(i), ...rightList.slice(j)];
  }

  mergeSort() {
    return new ArrayList(...this._mergeSortImpl(this.data));
  }

  toString() {
    return this.data.join(",");
  }
}

const arrayList = new ArrayList(
  1,
  10,
  2,
  20
  // 10,
  // 1,
  // 1,
  // 100,
  // 0,
  // -1,
  // 24,
  // 1,
  // 23494,
  // 1230,
  // 10,
  // 303,
  // 40,
  // 530,
  // 6,
  // 1,
  // -1,
  // 0,
  // 0,
  // 0,
  // 4,
  // 2,
  // 3,
  // 4,
  // 5,
  // 1,
  // 11,
  // 111,
  // 22,
  // 2334
);
console.log(`${arrayList}`);
console.log(`${arrayList.bubbleSort()}`);
console.log(`${arrayList.selectionSort()}`);
console.log(`${arrayList.insertionSort()}`);
console.log(`${arrayList.shellSort()}`);
console.log(`${arrayList.quickSort()}`);
console.log(`${arrayList.mergeSort()}`);
