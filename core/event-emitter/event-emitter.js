export default class EventEmitter {
  emitter;

  constructor(emitter) {
    this.emitter = emitter;
  }

  on(type, handler, params) {
    return this.emitter.on(type, handler, params);
  }

  off(type, handler) {
    return this.emitter.off(type, handler);
  }

  emit(type, payload) {
    this.emitter.emit(type, payload);
  }

  once(type, handler) {
    this.emitter.once(type, handler);
  }

  /**
   * Представляет события в виде async iterator
   * @param type{string} - название события
   */
  stream(type) {
    return async function* () {
      while (true) {
        yield new Promise(res => {
          this.element.addEventListener(type, res, {once: true});
        });
      }
    }.call(this);
  }
}
