import ClassList from "./class-list.js";
import {renderDOM} from "./render-strategies/render-dom.js";
import {renderString} from "./render-strategies/render-string.js";


export default class VNode {
  tag;
  #content;
  attributes = new Set();
  children = [];
  #style;
  classList = new ClassList();
  #renderStrategies = {
    dom: renderDOM,
    string: renderString,
  };

  static DOM = 'dom';
  static string = 'string';

  constructor(tag, {attrs, content} = {}) {
    this.tag = tag;

    for (const attr in attrs) {
      this.attributes.add({name: attr, value: attrs[attr]});
    }

    if (content) this.textContent = content;
  }

  get textContent() {
    return this.#content;
  }

  set textContent(value) {
    this.#content = value;
    this.children = [value];
  }

  set style(value) {
    this.setAttribute('style', value);
  }

  setAttribute(name, value) {
    this.attributes.add({name, value});
  }

  append(VNode) {
    this.children.push(VNode);
  }

  prepend(VNode) {
    this.children.unshift(VNode);
  }

  render(strategy = VNode.DOM) {
    return this.#renderStrategies[strategy].call(this);
  }
}
