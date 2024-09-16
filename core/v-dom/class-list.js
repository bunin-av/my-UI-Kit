export default class ClassList extends Set {

  remove(className) {
    this.delete(className);
  }

  toggle(className) {
    if (this.has(className)) {
      this.delete(className);

    } else {
      this.add(className);
    }
  }

  contains(className) {
    return this.has(className);
  }
}
