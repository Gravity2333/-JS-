function swap(index1, index2, list) {
  if (index1 >= list.length || index2 >= list.length) return;
  const temp = list[index1];
  list[index1] = list[index2];
  list[index2] = temp;
}

function shellSort(list) {
  const length = list.length;
  let gap = Math.floor(length / 2);
  while (gap > 1) {
    for (let i = gap; i < length; i++) {
      const toBeInsertedVal = list[i];
      for (let j = i - gap; j >= i % gap; j -= gap) {
        if (list[j] >= toBeInsertedVal) {
          list[j + gap] = list[j];
        } else {
          list[j + gap] = toBeInsertedVal;
          break;
        }
        if (j === i % gap) {
          list[j] = toBeInsertedVal;
        }
      }
    }
    gap = Math.floor(gap / 2);
  }
}

const arr = [
  1, 10, 2, 20, 10, 1, 1, 100, 0, -1, 24, 1, 23494, 1230, 10, 303, 40, 530, 6,
  1, -1, 0, 0, 0, 4, 2, 3, 4, 5, 1, 11, 111, 22, 2334,
];
shellSort(arr);
console.log(arr);
