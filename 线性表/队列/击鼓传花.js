const { Queue } = require("./queue");

function play(nameList = [], count = 0) {
  if (nameList?.length === 0 || count === 0) return;
  const queue = new Queue();
  nameList.forEach((name) => queue.enqueue(name));
  let i = 0;
  while (queue.size() !== 1) {
    if (i === count - 1) {
      console.log(queue.dequeue(), "出局");
      i = 0;
      continue
    } else {
      queue.enqueue(queue.dequeue());
    }
    i++;
  }
  return queue.dequeue();
}

console.log(
  "获胜者：",
  play(["lily", "lucky", "jack", "bill", "puppy", "tom", "jasmine", "nacy"], 5)
);
