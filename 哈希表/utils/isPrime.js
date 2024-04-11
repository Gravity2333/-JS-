function isPrime(num) {
  if (num === 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

const list = [];
for (let i = 1; i < 100; i++) {
  if (isPrime(i)) {
    list.push(i);
  }
}
console.log(list);

/** 找到最近的质数
 * @params val
 * @params direction 'asc' 'desc' 向两个方向找
 */
function _getNearestPrime(val, directon = "asc") {
  let index = val;
  switch (directon) {
    case "asc":
      // 向上找最近的质数
      while (!this.isPrime(index)) {
        index++;
      }
      return index;
    case "desc":
      // 向下找最近的质数
      while (!this.isPrime(index) && index > 1) {
        index--;
      }
      return index;
    default:
      return val;
  }
}
