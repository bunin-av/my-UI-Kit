import BaseWidget from "./base-widget.js";
import ComponentEventEmitter from "../../core/event-emitter/component-event-emitter.js";
import Validator from "../../core/validation/validator.js";


export default class Input extends BaseWidget {
  keyElement;
  validator;
  emitter = new ComponentEventEmitter();

  constructor(props) {
    super(props);

    this.keyElement = this.createElement('input');
    this.keyElement.setAttribute('type', 'text');

    if (this.props.placeholder) {
      this.keyElement.setAttribute('placeholder', this.props.placeholder);
    }

    if (this.props.autofocus != null) {
      this.keyElement.setAttribute('autofocus', this.props.autofocus);
    }

    if (this.props.label != null) {
      this.createLabel();
    }

    if (this.props.validation != null) {
      this.validator = new Validator(this.props.validation);
    }
  }

  get value() {
    return this.keyElement.value;
  }

  set value(val) {
    this.keyElement.value = val;
  }

  changeValue(e) {
    this.value = e.target.value;
  }

  validate() {
    const result = this.validator.validate(this.value);

    if (result.ok) {
      // do smth...
      return;
    }

    // do smth else...
  }

}
