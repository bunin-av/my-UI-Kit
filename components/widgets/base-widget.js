import VNode from "../../core/v-dom/v-node.js";
import EventEmitter from "../../core/event-emitter/event-emitter.js";
import DomEventEmitter from "../../core/event-emitter/dom-event-emitter.js";
import ComponentEventEmitter from "../../core/event-emitter/component-event-emitter.js";


export default class BaseWidget {
  props;
  style;
  widget;
  keyElement;
  emitter = new EventEmitter(new ComponentEventEmitter());
  type = this.constructor.name.toLowerCase();

  /**
   *
   * @param props {{
   *   style: Object,
   *   render: 'string' | 'DOM',
   *   validation: {
   *     type: string,
   *     attrs?: {
   *       validator: Function: boolean,
   *       message: string,
   *     }
   *   }
   * }}
   */
  constructor(props = {}) {
    this.props = props;

    this.prepareStyle();

    this.createContainer();
  }

  prepareStyle() {
    if (this.props.style == null) return;

    this.style = JSON.stringify(this.props.style)
      .replace(/[{}",]/g, str => str === ',' ? ';' : '');
  }

  createElement(tagName, classNames, content) {
    const elem = new VNode(tagName);

    if (classNames != null) elem.classList.add(...classNames);

    if (content != null) elem.textContent = content;

    return elem;
  }

  createWidget() {
   this.keyElement.setAttribute('class', `${this.type}-${this.type}`);

   if (this.style != null) this.keyElement.setAttribute('style', this.style);

   this.widget.append(this.keyElement);
  }

  createContainer() {
    this.widget = this.createElement('div', [`${this.type}-container`]);
  }

  createLabel() {
    const label = this.createElement('label');
    label.textContent = this.props.label;
    label.classList.add(`${this.type}-label`);

    this.widget.prepend(label);
  }

  render() {
    this.createWidget();

    return this.widget.render(this.props.render);
  }
}
