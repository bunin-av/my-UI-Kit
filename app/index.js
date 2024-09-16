import Input from "../components/widgets/input.js";

const root = document.querySelector('#root');

const input = new Input({
  style: {
    width: '300px',
  },
  validation: {
    type: 'date',
    attrs: {
      validator: (data) => data > 0,
      message: 'Yoyoyo'
    }
  },
  label: 'Expiration date',
  render: 'dom',
})
  .render();

root.append(input);
