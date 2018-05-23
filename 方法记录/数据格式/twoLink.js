class Node {
  constructor(node) {
    this.node = node;
    this.prev = null;
    this.next = null;
  }
}

class DoubleLinkList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    let node = new Node(value);

    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.length++
  }

  insert(position, value) {
    if (position >= 0 && position <= this.length) {
      let node = new Node(value),
        current,
        previous,
        index = 0;

      if (position == 0) {
        if (this.head == null) {
          this.head = node;
          this.tail = node;
        } else {
          this.head.prev = node;
          node.next = this.head;
          this.head = node;
        }
      } else if (position == this.length) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        current = this.head;
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = node;
        node.prev = previous;
        node.next = current;
        current.prev = node;
      }
      this.length++
      return true
    } else {
      return false;
    }
  }

  removeAt(position) {
    if (position >= 0 && position <= this.length) {
      let current = this.head, index, previous;

      if (position === 0) {
        current = this.head.next;
        current.prev = null;
        this.head = current;
      }
    }
  }

  toString() {
    let current = this.head,
      s = current.node;

    while (current.next) {
      current = current.next;
      s += ', ' + current.node;
    }
    return s
  }

  print() {
    console.log(this.toString())
  }
}