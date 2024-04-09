class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(value) {
    this.items[this.items.length++] = value;
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    this.size() === 0;
  }

  toString() {
    return this.items?.join(",");
  }
}

module.exports = { Queue };
