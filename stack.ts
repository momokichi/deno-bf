export class Stack<T> {
  private arr: T[] = [];

  push(val: T) {
    this.arr.push(val);
  }

  get top(): T {
    return this.arr[this.arr.length -1]
  }

  pop(): T | undefined {
    return this.arr.pop();
  }

  empty(): boolean {
    return this.arr.length === 0;
  }
}
