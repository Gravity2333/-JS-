class QueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }
  enqueue(element, priority) {
    if(this.isEmpty()){
        this.items[0] = new QueueElement(element, priority);
    }else{
        for(let i=0;i<this.items.length;i++){
            const item = this.items[i]
            if(item.priority>priority){
                this.items.splice(i,0,new QueueElement(element, priority))
                return
            }
        }
        this.items[this.items?.length] = new QueueElement(element, priority);
    }
  }
  dequeue(){
    return this.items.shift()?.element
  }
  size(){
    return this.items?.length
  }
  isEmpty(){
    return this.size() === 0
  }
  front(){
    return this.items[0]
  }
  toString(){
    return this.items?.map(item=>item.element)?.join(',')
  }
}

const priorityQueue = new PriorityQueue();
priorityQueue.enqueue('a',1)
priorityQueue.enqueue('b',-1)
priorityQueue.enqueue('c',10)
priorityQueue.enqueue('d',99)
priorityQueue.enqueue('e',99)
priorityQueue.enqueue('f',67)
priorityQueue.enqueue('g',100)
priorityQueue.enqueue('h',-21)
console.log(priorityQueue)