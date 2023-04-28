import Control from "./common/control";
const board = {
  Digit1: "1",
  Digit2: "2",
};
export class Keyboard extends Control {
  private output: Output;
  private board: Board;
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.output = new Output(this.node);
    this.board = new Board(this.node, board, (char) => {
      this.output.content += char;
    });
  }
}
export class Key extends Control {
  constructor(
    parentNode: HTMLElement,
    data: string,
    onInput: (char: string) => void
  ) {
    super(parentNode);
    this.node.textContent = data;
    this.node.onmousedown = () => {};
    this.node.onmouseup = () => {
      onInput(data);
    };
    this.node.onmouseenter = () => {
      //   onInput(data);
    };
    this.node.onmouseleave = () => {
      onInput(data);
    };
  }
}
export class Board extends Control {
  constructor(
    parentNode: HTMLElement,
    boardConfig: Record<string, string>,
    onInput: (char: string) => void
  ) {
    super(parentNode);
    for (let keyData in boardConfig) {
      new Key(this.node, boardConfig[keyData], (char) => {
        onInput(char);
      });
    }
    // this.keys = new Key(this.node);
  }
}

export class Output extends Control {
  private _content: string = "";
  set content(value: string) {
    this._content = value;
    this.node.textContent = this.content;
  }

  get content() {
    return this._content;
  }

  constructor(parentNode: HTMLElement) {
    super(parentNode);
  }
}
