import EventEmitter from "../../core/event-emitter/event-emitter.js"
import DomEventEmitter from "../../core/event-emitter/dom-event-emitter.js";
import ComponentEventEmitter from "../../core/event-emitter/component-event-emitter.js";


class Widget {
  props;
  widget;
  styles;
  type;
  validation;
  keyElement;
  valueDecorators;

  /**
   * @type {EventEmitter<ComponentEventEmitter>}
   */
  emitter = new EventEmitter(new ComponentEventEmitter());

  /**
   * @type {EventEmitter<DomEventEmitter>}
   */
  envEvents;

  constructor(props = {}) {
    this.props = props;

    this.styles = this.makeStyles(props.styles);
  }

  createElement(tagName, classNames, content) {
    const elem = document.createElement(tagName);

    if (classNames != null) elem.classList.add(...classNames);

    if (content != null) elem.innerHTML = content;

    return elem;
  }

  createWidget(elements) {
    const wrapper = this.createElement('div', [`${this.type}__wrapper`]);
    const container = this.createElement('div', [`${this.type}__container`]);
    const keyElement = this.createElement(this.type, [`${this.type}__${this.type}`]);

    if (elements != null) {
      for (let item of elements) {
        wrapper.append(this.createElement(item.tag, [item.className], item.content));
      }
    }

    wrapper.append(container);
    container.append(keyElement);

    if (this.styles != null) {
      this.addStyles(wrapper, this.styles);
    }

    this.keyElement = keyElement;
    this.widgetElement = wrapper;

    this.envEvents = new EventEmitter(new DomEventEmitter(this.keyElement));
  }

  // makeStyles(styles) {
  //   return (styles)
  //     ? Object
  //       .entries(styles)
  //       .map(el => el.join(':'))
  //       .join(';')
  //     : null;
  // }
  makeStyles(styles) {
    if (styles != null) {
      return JSON.stringify(styles)
        .replace(/[{}",]/g, (str) => str === ',' ? ';' : '');
    }
  }

  addStyles(element, styles) {
    if (this.styles != null) element.style.cssText = styles;
  }

  render() {
    if (this.props.render === 'string') {
      this.widget = this.widgetElement.outerHTML;
    } else {
      this.widget = this.widgetElement;
    }

    return this.widget;
  }

  mount(element, method = 'append') {
    element[method](this.widget);
  }

  unmount() {
    this.widgetElement.remove();
  }

  on(type, handler) {
    return this.envEvents.on(type, handler);
  }

  off(type, handler) {
    return this.envEvents.off(type, handler);
  }
}


export default Widget;
