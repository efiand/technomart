export default class Field {
  constructor(el: any) {
    const self: any = this;
    self.input = el.querySelector(`field__input`);

    if (self.input.classList.contains(`field__input--message`)) {
      self.setHeight();
      self.input.addEventListener(`input`, () => self.setHeight());
      window.addEventListener(`resize`, () => self.setHeight());
    }
  }

  setHeight() {
    const self: any = this;
    const { style, clientHeight, scrollHeight } = self.input;

    style.height = `${Math.max(clientHeight, scrollHeight)}px`;
  }
}
