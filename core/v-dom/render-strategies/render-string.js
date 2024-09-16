import VNode from "../v-node.js";

export function renderString() {
  let
    attributes = '',
    children = '',
    classNames = '';

  if (this.attributes.size > 0) {
    this.attributes.forEach(({name, value}) => {
      const attr = `${name}="${value}"`;

      if (attributes === '') attributes += attr;
      else attributes += ' ' + attr;
    });
  }

  if (this.classList.size > 0) {
    this.classList.forEach(className => {
      if (classNames === '') classNames += className;
      else classNames += ' ' + className;
    });
  }

  if (this.children.length > 0) {
    this.children.forEach(child => {
      let node = child;

      if (child instanceof VNode) {
        node = child.render(VNode.string);
      }

      children += node;
    });
  }

  if (classNames !== '') {
    if (attributes.includes('class')) {
      attributes = attributes.replace(/class="(.+?)"/, (s, $1) => {
        return `class="${$1} ${classNames}"`;
      });

    } else {
      attributes += ` class="${classNames}"`
    }
  }

  return `<${this.tag} ${attributes}>${children}</${this.tag}>`;
}
