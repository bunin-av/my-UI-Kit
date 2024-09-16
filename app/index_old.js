// import Input from "../components/Widgets/Input.js";
// import Form from "../components/Widgets/Form.js";
import VNode from "../core/v-dom/v-node.js";

// import Button from "./Widgets_old/Button.js";

const input = new Input({
  styles: {
    width: '300px',
  },
  validation: {
    rule: 'date', mask: 'date',
  },
  label: 'Expiration date',
  render: 'string',
});

// input.mount(document.body);

document.body.innerHTML = input.render();
// new Button({styles: {width: '100px'}});

const form = new Form(
  [input],
  [
    (value) => value + 10,
    (value) => +value,
  ],
);

const vnode = new VNode('div', {
  attrs: {
    'data-x': '30',
  }});

vnode.setAttribute('style', 'background: red; height: 30px');
vnode.setAttribute('class', 'v-node');

vnode.append(new VNode('div',{
  attrs: {
    'data-x': '50',
  }}));

vnode.classList.add('wrapper')
document.body.append((vnode.render('DOM')));
console.log(vnode)
