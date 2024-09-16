export default class ComponentEventEmitter {
  /**
   * Хэш-таблица обработчиков событий
   * @type {Map<string, Set<function>>}
   */
  handlers = new Map();

  static instance;

  constructor() {
    if (ComponentEventEmitter.instance != null) {
      return ComponentEventEmitter.instance;
    }

    ComponentEventEmitter.instance = this;
  }

  /**
   * Добавляет обработчик событий
   * @param type{string} - название события
   * @param handler{function} - обработчик
   * @param params{Object} - объект с настройками обработчика (возможность настройки {once: true})
   * @returns {function} - функция для удаления обработчика
   */
  on(type, handler, {once}) {
    if (!type) throw Error('UNSPECIFIED_EVENT_TYPE_ERR');

    if (once) {
      this.once(type, handler);
      return;
    }

    const handlers = this.#findHandlers(type);

    handlers.add(handler);

    return () => handlers.delete(handler);
  }

  /**
   * Удаляет обработчик событий
   * @param type{string} - название события
   * @param handler{function} - название события
   * @returns true|false|undefined - true: если обработчик удален, false: если обработчик отсутвует, undefined: если событие отсутвует
   */
  off(type, handler) {
    if (!type) throw Error('UNSPECIFIED_EVENT_TYPE_ERR');

    const handlers = this.handlers.get(type);

    return handlers?.delete(handler);
  }

  /**
   * Создает и запускает событие
   * @param type{string} - название события
   * @param payload{any} - название события
   */
  emit(type, payload) {
    if (!type) throw Error('UNSPECIFIED_EVENT_TYPE_ERR');

    const handlers = this.handlers.get(type);

    handlers?.forEach(cb => cb(payload));
  }

  /**
   * Добавляет обработчик событий на одно событие
   * @param type{string} - название события
   * @param handler{Function} - обработчик
   */
  once(type, handler) {
    if (!type) throw Error('UNSPECIFIED_EVENT_TYPE_ERR');

    const handlers = this.#findHandlers(type);

    const decorator = () => {
      handler();
      handlers.delete(decorator);
    }

    handlers.add(decorator);
  }

  /**
   * Проверяет есть ли уже обработчики на искомое событие и возвращает список событий, если нет - создает список, помещает в хэш-таблицу новый список и возвращает его
   * @param type{string} - название события
   * @returns handlers{Set<function>} - список обработчиков
   */
  #findHandlers(type) {
    let handlers = this.handlers.get(type);

    if (handlers == null) {
      handlers = new Set();
      this.handlers.set(type, handlers);
    }

    return handlers;
  }
}
