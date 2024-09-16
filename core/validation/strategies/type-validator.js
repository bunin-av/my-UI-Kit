import ValidationResult from "../validation-result.js";

export default class TypeValidator {

  /**
   * Валидирует тип данных
   * @param data {any} - данные для валидации
   * @param type {string} - тип для проверки соответствия
   * @returns {ValidationResult}
   */
  validateType(data, type) {
    let
      validity,
      message;

    if (typeof data !== type) {
      validity = false;
      message = 'Invalid data type';
    }

    return new ValidationResult(validity, message);
  }

  /**
   * Осуществляет кастомную валидацию
   * @param data {any} - данные для валидации
   * @param attrs {{
   *      validator: function,
   *      message?: string
   *      }}
   *     validator - кастомная функция для валидации. Должна примать данные и возвращать true|false в зависимости от того, валидны данные или нет
   *     message - кастомное сообщение об ошибке
   * @returns {ValidationResult}
   */
  customValidate(data, {validator, message} = {}) {
    if (typeof validator !== 'function') {
      throw new TypeError('Validator must be a function');
    }

    let validity;

    const isValid = validator(data);

    if (!isValid) {
      validity = false;
      message ??= 'Invalid data';
    }

    return new ValidationResult(validity, !isValid && message);
  }

  /**
   * Вызывает валидацию типа и кастомную валидацию
   * @param data {any} - данные для валидации
   * @param type {string} - тип для проверки соответствия
   * @param attrs? {string} - атрибуты для валидации
   * @returns {ValidationResult}
   */
  prevalidate(data, type, attrs) {
    const typeResult = this.validateType(data, type);

    return (
      typeResult.validity
        ? this.customValidate(data, attrs)
        : typeResult
    );
  }
}
