import TypeValidator from "./type-validator.js";

export default class EmailValidator extends TypeValidator{

  validate(data, attrs) {
    const prevalidation = this.prevalidate(data, 'string', attrs);
    if (!prevalidation.validity) return prevalidation;

    if (!data.includes('@') || data.length < 6) {
      prevalidation.validity = false;
      prevalidation.message = 'Invalid e-mail';
    }

    return prevalidation;
  }
}
