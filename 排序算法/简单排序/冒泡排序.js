function swap(index1, index2, list) {
    const temp = list[index1]
    list[index1] = list[index2]
    list[index2] = temp
}

// Function Programming Implements
function BubbleSort(listFromParams) {
    const list = [...listFromParams]
    const length = list.length
    // i： 即 把多少个数字已经放到右边确定的位置 (冒了几个🫧) 
    // 只需要冒 length - 1 个即可让整个list有序
    for (let i = 0; i < length; i++) {
        // 每一次冒泡，冒到 length - 1 - i
        for (let j = 0; j < length - 1 - i; j++) {
            if (list[j] > list[j + 1]) {
                swap(j, j + 1, list)
            }
        }
    }
    return list
}

const arr = [
    1, 10, 2, 20, 10, 1, 1, 100, 0, -1, 24, 1, 23494, 1230, 10, 303, 40, 530, 6,
    1, -1, 0, 0, 0, 4, 2, 3, 4, 5, 1, 11, 111, 22, 2334,
];

console.log(BubbleSort(arr));
