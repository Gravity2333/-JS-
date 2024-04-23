function swap(index1, index2, list) {
  if (index1 >= list.length || index2 >= list.length) return;
  const temp = list[index1];
  list[index1] = list[index2];
  list[index2] = temp;
}

function quickSort(left, right, list) {
  if (left >= right) return;
  const pivot = list[right];
  let i = left;
  let j = right;
  while (i < j) {
    while (i < j && list[i] <= pivot) {
      i++;
    }
    swap(i, j, list);
    while (i < j && list[j] > pivot) {
      j--;
    }
    swap(i, j, list);
  }
  quickSort(left, i - 1, list);
  quickSort(i + 1, right, list);
}

const arr = [
  1, 10, 2, 20, 10, 1, 1, 100, 0, -1, 24, 1, 23494, 1230, 10, 303, 40, 530, 6,
  1, -1, 0, 0, 0, 4, 2, 3, 4, 5, 1, 11, 111, 22, 2334,
];
quickSort(0, arr.length - 1, arr);
console.log(arr);
