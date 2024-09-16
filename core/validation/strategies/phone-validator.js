import TypeValidator from "./type-validator.js";

export default class PhoneValidator extends TypeValidator{

  validate(data, attrs) {
    return this.prevalidate(data, 'number', attrs);
  }
}
