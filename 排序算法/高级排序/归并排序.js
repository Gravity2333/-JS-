// 迭代法
function mergeSort(arguList) {
    let list = [...arguList]
    const length = list.length
    if (length <= 1) return list
    const temp = []
    // 组长度，每次
    for (let groupLen = 1; groupLen < length; groupLen *= 2) {
        // 对每相邻的2组处理
        for (let i = 0; i < length; i += 2 * groupLen) {
            const left = i
            const mid = Math.min(length, left + groupLen)
            const right = Math.min(length, mid + groupLen)


            let leftIndex = left, rightIndex = mid, k = leftIndex
            while (leftIndex < mid && rightIndex < right) {
                if (list[leftIndex] < list[rightIndex]) {
                    temp[k++] = list[leftIndex++]
                } else {
                    temp[k++] = list[rightIndex++]
                }
            }

            while (leftIndex < mid) {
                temp[k++] = list[leftIndex++]
            }

            while (rightIndex < right) {
                temp[k++] = list[rightIndex++]
            }
        }
        list = [...temp]
    }
    return temp
}

// 递归法 recursion
function mergeSortRecrustion(listFromParams){
    const list = [...listFromParams]
    const length = list.length
    if(length<=1) return list
    const mid = Math.floor(length/2)
    const leftList = mergeSortRecrustion(list.slice(0,mid))
    const rightList = mergeSortRecrustion(list.slice(mid))

    const result = []
    let i=0,j=0,k=0;
    while(i<leftList.length&&j<rightList.length){
        if(leftList[i]<=rightList[j]){
            result[k++] = leftList[i++]
        }else{
            result[k++] = rightList[j++]
        }
    }
    return result.concat(leftList.slice(i)).concat(rightList.slice(j))
}

// const list = [100, 33, 3, 45,
//     // 2, 3, 100, 3, 4, 6, 55, 7, 11, 22, 0, 0, 0, 1, 10, 4, 37, 34, 1018, 1225, 17
// ]
const list = [
    1, 10, 2, 20, 10, 1, 1, 100, 0, -1, 24, 1, 23494, 1230, 10, 303, 40, 530, 6,
    1, -1, 0, 0, 0, 4, 2, 3, 4, 5, 1, 11, 111, 22, 2334,
  ];

console.log(mergeSort(list))
console.log(mergeSortRecrustion(list))