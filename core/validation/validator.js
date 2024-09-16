import DateValidator from "./strategies/date-validator.js";
import EmailValidator from "./strategies/email-validator.js";
import PhoneValidator from "./strategies/phone-validator.js";


export default class Validator {
  validators;
  #validationStrategies = {
    date: new DateValidator(),
    email: new EmailValidator(),
    phone: new PhoneValidator(),
  }

  /**
   * Создает валидатор
   * @param validators{{
   *    type: 'data' | 'email' | 'phone',
   *    attrs: {
   *      validator: function,
   *      message: string
   *      }
   *    }} - объект с типом валидатора и доп. параметрами
   */
  constructor(validators) {
    this.validators = validators;
  }

  /**
   * Обходит список с типами валидаторов и возвращает результат
   * @param data {any} - данные для валидации
   * @returns {ValidationResult}
   */
  validate(data) {
    let result;

    for (const {type, attrs} of this.validators) {
      result = this.#validationStrategies[type].validate(data, attrs);

      if (!result.ok) return result;
    }

    return result;
  }
}





// export class Validator {
//   constructor([rule, mask] = []) {
//
//     this.rules = {
//       date: /^([0-2][0-9]\.02|([0-2][0-9]|3[0-1])\.(0[0-13-9]|1[0-2]))\.(19[0-9]{2}|2[0-1][0-9]{2})$/,
//       mobile: /^\+7 (\d{3}) \d{3}-\d{2}-\d{2}$/,
//       email: /((?<!\.)[-+!#$%&'*/=?^`{|}~\w]+(?!\.)|".+")@((?<!-)[a-z0-9-]+(?!-)|(?<!-)[a-z0-9-]+(?!-)\.[a-z]+)/i,
//       custom: rule,
//     }
//     this.masks = {
//       date: 'XX.XX.XXXX',
//       mobile: '+7 XXX XXX-XX-XX',
//       custom: mask,
//     }
//   }
// }
