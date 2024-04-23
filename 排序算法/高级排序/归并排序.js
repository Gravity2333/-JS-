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

const list = [100, 33, 3, 45,
    // 2, 3, 100, 3, 4, 6, 55, 7, 11, 22, 0, 0, 0, 1, 10, 4, 37, 34, 1018, 1225, 17
]

console.log(mergeSort(list))