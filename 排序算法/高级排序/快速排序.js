function swap(index1, index2, list) {
  if (index1 >= list.length || index2 >= list.length) return;
  const temp = list[index1];
  list[index1] = list[index2];
  list[index2] = temp;
}

// // function countPivot(left, right, list) {
// //   let middle = Math.floor((left + right) / 2);
// //   if (list[left] > list[middle]) {
// //     swap(left, right, list);
// //   }
// //   if (list[middle] > list[right]) {
// //     swap(middle, right, list);
// //   }
// //   if (list[left] > list[middle]) {
// //     swap(left, right, list);
// //   }
// //   // 把middle放到right-1的位置
// //   swap(middle, right - 1, list);
// //   return list[right - 1];
// // }

// // function _quickSortImpl(left, right, list) {
// //   if (left >= right) return;
// //   const pivot = countPivot(left, right, list);

// // }

// // function quickSort(listFromParams) {
// //   const list = [...listFromParams];
// //   _quickSortImpl(0, list.length, list);
// //   return list;
// // }

// function findPivot(left, right, arr) {
//   // 记录数组中间位置
//   let center = Math.floor((left + right) / 2);

//   // 如果最左边的数大于中间的数则交换位置
//   if (arr[left] > arr[center]) {
//     swap(left, center, arr);
//   }

//   // 如果最中间的数大于右边的数则交换位置
//   if (arr[center] > arr[right]) {
//     swap(center, right, arr);
//   }

//   // 如果最左边的数大于中间的数则交换位置
//   if (arr[left] > arr[center]) {
//     swap(left, center, arr);
//   }

//   // 再将中位数和数组的倒数第二个位置交换,因为最后一个位置比枢纽的值大
//   swap(center, right - 1, arr);

//   // 返回枢纽的位置
//   return right - 1;
// }

// // 递归交换数组
// function recursion(left, right, arr) {
//   if (left >= right) return;

//   // 枢纽的位置
//   let pivot = findPivot(left, right, arr);

//   // 定义两个迭代器，i寻找大于枢纽位置的数，k寻找小于枢纽位置的数
//   let i = left;
//   console.log(i);
//   let k = pivot;

//   if (i !== k) {
//     i++;
//     k--;
//     // 开始一直寻找，在找到特定条件的值时会跳出
//     while (true) {
//       // 如果左边的迭代器小于枢纽位置的值则一直向右寻找
//       while (arr[i] < arr[pivot]) {
//         i++;
//       }

//       // 如果右边的迭代器大于枢纽位置的值则一直向左寻找
//       while (arr[k] > arr[pivot]) {
//         k--;
//       }
//       // 如果左边的迭代器和右边的迭代重合了或者大于了则退出循环
//       if (i >= k) {
//         break;
//       }

//       // 如果两个都找到了对应的值，则让他们进行交换位置
//       swap(i, k, arr);
//     }
//     swap(i, pivot, arr);
//   }

//   // 在枢纽找到合适的位置后，将枢纽左边和右边的数也按照同样的方法交换
//   recursion(left, i - 1, arr);
//   recursion(i + 1, right, arr);
// }

// // const arr = [0, 10, 2, 15, 15, 200];

// recursion(0, arr.length - 1, arr);
// console.log(arr);

// [1,10,80,20]
// [1,80,10,20]

// // [1,70,10,60,100]
// // [1,70,60,10,100]

// function quickSort(arrParams) {
//   const arr = [...arrParams];
//   if (arr.length<=1) return arr
//   const pivotIndex = Math.floor(arr.length / 2);
//   const pivot = arr.splice(pivotIndex, 1)[0];
//   const left = [];
//   const right = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] < pivot) {
//       left.push(arr[i]);
//     } else {
//       right.push(arr[i]);
//     }
//   }
//   return [...quickSort(left), pivot, ...quickSort(right)];
// }

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
  _quickSortImpl(left, pivotIndex - 1,list);
  _quickSortImpl(pivotIndex + 1, right,list);
}

function quickSort(listFromParam) {
  const list = [...listFromParam];
  _quickSortImpl(0, list.length - 1, list);
  return list;
}

const arr = [0, 10, 2, 15, 15, 200];
console.log(quickSort(arr));
console.log(quickSort(arr));
