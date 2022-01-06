import Widget from './index.js'
import Tip from './Tip.js'
import {Validations} from '../utils/validation-patterns.js';

export default class Input extends Widget {

  type = 'input';
  value = '';
  inputElem;
  placeholder;
  autofocus;
  maskElem;
  label;

  /**
   * Объект с данными для валидации
   * {
   *  mask: boolean,
   *  rule: 'date' | 'email' | 'mobile' | 'custom', - правила в формате RegExp
   *  styles: object
   *  custom: string[] - [Правило, маска]
   * }
   */
  validation;

  constructor(props) {
    super(props);

    this.placeholder = props.placeholder ?? '';
    this.validation = props.validation;
    this.autofocus = props.autofocus;
    this.label = props.label;

    this.render([{tag: 'label', className: 'input__label', content: this.label}]);
    this.mount();

    this.inputElem = this.widget.querySelector('input');
    this.inputElem.placeholder = this.placeholder;

    this.inputElem.value = this.value;
    this.widget.addEventListener('input', this.changeValue.bind(this));

    if (this.focus != null) this.inputElem.focus();

    if (this.validation != null) {
      this.validation = Object.assign(this.validation, new Validations(this.validation.custom));
      this.inputElem.addEventListener('blur', this.checkValidation.bind(this));

      if (this.validation.mask != null) {
        this.maskElem = new Tip({content: this.validation.masks[this.validation.mask]});
        this.maskElem.mount(this.widget);
      }
    }
  }

  changeValue(e) {
    this.value = e.target.value;
    this.inputElem.value = e.target.value;
  }

  checkValidation() {
    //  в список готовых правил подставлыется переданная пользователем строка data | email | mobile
    const container = this.widget.querySelector('.input__container');
    if (!this.validation.rules[this.validation.rule].test(this.value)) {
      container.classList.add('_invalid');

      this.inputElem.addEventListener('focus', () => {
        container.classList.remove('_invalid');
      }, {once: true});
    } else {
      container.classList.add('_valid');

      this.inputElem.addEventListener('input', () => {
        container.classList.remove('_valid');
      }, {once: true});
    }
  }
}