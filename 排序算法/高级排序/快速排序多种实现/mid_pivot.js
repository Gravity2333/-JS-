function swap(index1, index2, list) {
  if (index1 >= list.length || index2 >= list.length) return;
  const temp = list[index1];
  list[index1] = list[index2];
  list[index2] = temp;
}

function bubbleSort(listFromPrams) {
  const list = [...listFromPrams];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length - i - 1; j++) {
      if (list[j] > list[j + 1]) {
        swap(j, j + 1, list);
      }
    }
  }
  return list;
}

function countPivot(left, right, list) {
  let middle = Math.floor((left + right) / 2);
  if (list[left] > list[middle]) {
    swap(left, right, list);
  }
  if (list[middle] > list[right]) {
    swap(middle, right, list);
  }
  if (list[left] > list[middle]) {
    swap(left, right, list);
  }
  // 把middle放到right-1的位置
  swap(middle, right - 1, list);
  return list[right - 1];
}

function _quickSortImpl(left, right, list) {
  if (left >= right) return;
  if (right - left + 1 <= 4) {
    return;
  }
  const pivot = countPivot(left, right, list);
  let i = left + 1;
  let j = right - 2;
  while (i < j) {
    while (i < j && list[i] < pivot) {
      i++;
    }
    while (i < j && list[j] > pivot) {
      j--;
    }
    if (i >= j) {
      break;
    }
    swap(i, j, list);
  }
  console.log(i, j);
  swap(i, right - 1, list);
}

function quickSort(listFromParams) {
  const list = [...listFromParams];
  if (list?.length <= 4) {
    return bubbleSort(list);
  } else {
    _quickSortImpl(0, list.length - 1, list);
  }
  return list;
}

const arr = [1, 20];
console.log(quickSort(arr));
console.log(quickSort(arr));
