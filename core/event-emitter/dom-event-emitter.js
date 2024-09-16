export default class DomEventEmitter {
  /**
   * Ключевой элемент, который будет совершать и слушать события
   * @type {Element}
   */
  element;

  /**
   *  Создает объект для работы с событиями DOM
   * @param element: HTMLElement;
   */
  constructor(element) {
    this.element = element;
  }

  /**
   * Добавляет обработчик событий
   * @param type{string} - название события
   * @param handler{Function} - обработчик
   * @param params{Object} - объект с настройками обработчика
   * @returns {Function} - функция для удаления обработчика
   */
  on(type, handler, params) {
    this.element.addEventListener(type, handler, params);

    return () => this.element.removeEventListener(type, handler, params);
  }

  /**
   * Удаляет обработчик событий
   * @param type{string} - название события
   * @param handler{Function} - обработчик
   */
  off(type, handler) {
    return this.element.removeEventListener(type, handler);
  }

  /**
   * Создает и запускает событие
   * @param type{string | Event} - название события или объект события
   * @param type{string} - название события
   * @param payload{EventInit} - параметры события
   */
  emit(type, payload = {bubbles: true, cancelable: true}) {
    if (!type) throw Error('UNSPECIFIED_EVENT_TYPE_ERR');

    const event = type instanceof Event
      ? type
      : new Event(type, payload);

    this.element.dispatchEvent(event);
  }

  /**
   * Добавляет обработчик событий на одно событие
   * @param type{string} - название события
   * @param handler{Function} - обработчик
   */
  once(type, handler) {
    this.on(type, handler, {once: true});
  }
}
