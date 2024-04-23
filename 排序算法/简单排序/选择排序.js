function swap(index1, index2, list) {
    const temp = list[index1]
    list[index1] = list[index2]
    list[index2] = temp
}

// Functional Programming 
function selectionSort(listFromParams) {
    const list = [...listFromParams]
    const length = list.length
    for (let i = 0; i < length - 1; i++) {
        let maxIndex = 0
        for (let j = 0; j < length - i; j++) {
            if (list[j] > list[maxIndex]) {
                maxIndex = j
            }
        }
        swap(maxIndex, length - 1 - i, list)
    }
    return list
}

// Functional Programming 
function selectionSortFromTop(listFromParams) {
    const list = [...listFromParams]
    const length = list.length
    for (let i = 0; i < length - 1; i++) {
        let minIndex = i
        for (let j = i; j < length; j++) {
            if (list[j] < list[minIndex]) {
                minIndex = j
            }
        }
        swap(minIndex, i, list)
    }
    return list
}

const arr = [
    1, 10, 2, 20, 10, 1, 1, 100, 0, -1, 24, 1, 23494, 1230, 10, 303, 40, 530, 6,
    1, -1, 0, 0, 0, 4, 2, 3, 4, 5, 1, 11, 111, 22, 2334,
];

console.log(selectionSort(arr));
console.log(selectionSortFromTop(arr));