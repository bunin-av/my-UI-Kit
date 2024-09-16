import Widget from "./index.js";

export default class Tip extends Widget{
  type = 'span';
  content;

  constructor(props) {
    super();

    this.content = props.content;

    this.createWidget();

    this.keyElement.textContent = this.content;

    this.render();
  }
}
