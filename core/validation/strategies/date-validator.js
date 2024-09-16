import TypeValidator from "./type-validator.js";

class DateValidator extends TypeValidator{

  validate(data, attrs) {
    const prevalidation = this.prevalidate(data, 'string', attrs);
    if (!prevalidation.validity) return prevalidation;

    if (isNaN(Date.parse(data))) {
      prevalidation.validity = false;
      prevalidation.message = 'Invalid date format';
    }

    return prevalidation;
  }
}

export default DateValidator;
