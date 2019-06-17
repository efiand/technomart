import env from '../../js/env';

export default class PerfectPixel {
  constructor(el) {
    const self: any = this;
    self.$el = el;

    self.applyVisible();

    window.addEventListener(`resize`, () => {
      self.setHeight();
    });

    window.addEventListener(`keydown`, (evt) => {
      if (evt.ctrlKey && evt.keyCode === PP_KEY) {
        evt.preventDefault();

        if (self.$el.classList.contains(`hidden`)) {
          localStorage.setItem(`ppShow`, `1`);
        } else {
          localStorage.setItem(`ppShow`, `0`);
        }

        self.applyVisible();
      }
    });
  }

  setHeight() {
    const self: any = this;

    self.$el.style.height = `${document.body.scrollHeight}px`;
  }

  applyVisible() {
    const self: any = this;

    self.setHeight();

    if (env.isStorageSupport) {
      const flag = +localStorage.getItem(`ppShow`);
      if (flag) {
        self.$el.classList.remove(`hidden`);
      } else {
        self.$el.classList.add(`hidden`);
      }
    } else {
      self.$el.classList.toggle(`hidden`);
    }
  }
}
