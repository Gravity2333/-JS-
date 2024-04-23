function insertSort(listFromParams) {
    const list = [...listFromParams]
    const length = list.length
    // 认为第一个元素有序
    for (let i = 1; i < length; i++) {
        // 将待插入元素记录
        const temp = list[i]
        for (let j = i - 1; j >= 0; j--) {
            if (list[j] > temp) {
                // 后移
                list[j + 1] = list[j]
            } else {
                // 找到插入位置
                list[j + 1] = temp
                break;
            }

            // 如果找到头，放到头一个
            if (j === 0) {
                list[0] = temp
            }
        }
    }
    return list
}

const arr = [
    1, 10, 2, 20, 10, 1, 1, 100, 0, -1, 24, 1, 23494, 1230, 10, 303, 40, 530, 6,
    1, -1, 0, 0, 0, 4, 2, 3, 4, 5, 1, 11, 111, 22, 2334,
];

console.log(insertSort(arr));