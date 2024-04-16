class MinHeap {
  constructor() {
    this.heap = [];
  }

  contains(name) {
    return this.heap.some((node) => node.getPerson === name);
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  insert(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;
    while (
      this.hasParent(currentIndex) &&
      this.heap[currentIndex].cost <
        this.heap[this.getParentIndex(currentIndex)].cost
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  removeMin() {
    if (this.heap.length === 0) {
      throw new Error("Heap is empty");
    }
    const minValue = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();
    return minValue;
  }

  heapifyDown() {
    let currentIndex = 0;
    while (this.getLeftChildIndex(currentIndex) < this.heap.length) {
      let smallerChildIndex = this.getLeftChildIndex(currentIndex);
      if (
        this.getRightChildIndex(currentIndex) < this.heap.length &&
        this.heap[this.getRightChildIndex(currentIndex)].cost <
          this.heap[smallerChildIndex].cost
      ) {
        smallerChildIndex = this.getRightChildIndex(currentIndex);
      }

      if (this.heap[currentIndex].cost < this.heap[smallerChildIndex].cost) {
        break;
      } else {
        this.swap(currentIndex, smallerChildIndex);
      }

      currentIndex = smallerChildIndex;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  get length() {
    return this.heap.length;
  }
  //this method to clear the heap
  clear() {
    this.heap = [];
  }
}

module.exports = MinHeap;
