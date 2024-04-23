function swap(index1, index2, list) {
  if (index1 >= list.length || index2 >= list.length) return;
  const temp = list[index1];
  list[index1] = list[index2];
  list[index2] = temp;
}

function partition(left, right, list) {
  let storageIndex = left;
  let pivot = list[right];
  for (let i = left; i < right; i++) {
    if (list[i] < pivot) {
      swap(storageIndex++, i, list);
    }
  }
  swap(storageIndex, right, list);
  return storageIndex;
}

function _quickSortImpl(left, right, list) {
  if (left >= right) return;
  const pivotIndex = partition(left, right, list);
  _quickSortImpl(left, pivotIndex - 1, list);
  _quickSortImpl(pivotIndex + 1, right, list);
}

function quickSort(listFromParam) {
  const list = [...listFromParam];
  _quickSortImpl(0, list.length - 1, list);
  return list;
}
