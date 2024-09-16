import Widget from "./index.js";
import {compose} from "../../core/utils/compose.js";

export default class Form extends Widget {
  type = 'form';
  widgets;

  constructor(widgets, valueDecorators = []) {
    super();

    this.widgets = widgets;
    this[Symbol.iterator] = this.iter;

    if (valueDecorators != null) {
      for (let {keyElement} of this.widgets) {
        keyElement = new Proxy(keyElement, {
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
