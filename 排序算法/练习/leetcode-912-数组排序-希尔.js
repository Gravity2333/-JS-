/**
 * 
        给你一个整数数组 nums，请你将该数组升序排列。
        示例 1：

        输入：nums = [5,2,3,1]
        输出：[1,2,3,5]
        示例 2：

        输入：nums = [5,1,1,2,0,0]
        输出：[0,0,1,1,2,5]
 */

function shellSort(listFromParam){
    const list = [...listFromParam]
    const length = list.length
    let gap = Math.floor(length / 2)
    while(gap>=1){
        for(let i = gap;i<length;i++){
            const temp = list[i]
            for(let j = i - gap; j >=0 ; j-=gap){
                if(list[j]>temp){
                    list[j+gap] = list[j]
                }else{
                    list[j+gap] = temp
                    break;
                }
                if(j === i%gap){
                    list[j] = temp
                }
            }
        }
        gap = Math.floor(gap/2)
    }
    return list
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    return shellSort(nums)
};