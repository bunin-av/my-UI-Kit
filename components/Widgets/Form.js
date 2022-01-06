import Widget from "./index.js";
import {compose} from "../utils/compose.js";

class Form extends Widget {
  type = 'form';
  widgets;

  constructor(widgets, valueDecorators = []) {
    super();

    this.widgets = widgets;
    this[Symbol.iterator] = this.iter;

    if (valueDecorators != null) {
      for (let {element} of this.widgets) {
        element = new Proxy(element, {
          get(target, key) {
            return compose(...valueDecorators)(target[key]);
          },
          set(target, key, value) {
            target[key] = value;
            return true;
          }
        });
      }
    }
  }

  * iter() {
    for (const {element} of this.widgets) {
      yield element;
    }
  }
}

export default Form;