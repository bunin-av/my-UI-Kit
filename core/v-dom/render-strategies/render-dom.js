import VNode from "../v-node.js";

export function renderDOM() {
  const element = document.createElement(this.tag);
  if (this.attributes.size > 0) {
    this.attributes.forEach(({name, value}) => {
      element.setAttribute(name, value);
    });
  }

  if (this.classList.size > 0) {
    this.classList.forEach(className => {
      element.classList.add(className);
    });
  }

  if (this.children.length > 0) {
    this.children.forEach(child => {
      let node = child;

      if (child instanceof VNode) {
        node = child.render(VNode.DOM);
      }

      element.append(node);
    });
  }

  return element;
}
