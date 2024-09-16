export default class ValidationResult {
  /**
   * @type {boolean}
   */
  ok;

  /**
   * @type {string}
   */
  message;

  /**
   * Создает объект с данными о результате валидации
   * @param ok {boolean}
   * @param message {string}
   */
  constructor(ok = true, message = '') {
    this.ok = ok;
    this.message = message;
  }
}
