import functions from '../../js/functions';

export default class Slider {
  constructor(el: any) {
    const self: any = this;

    self.$el = el;
    self.slider = el.querySelector(`.slider__slides`);
    self.slides = self.slider.querySelectorAll(`.slider__slide`);
    self.prev = el.querySelector(`.slider__browsing--prev`);
    self.next = el.querySelector(`.slider__browsing--next`);
    self.dotsBlock = el.querySelector(`.slider__dots`);
    self.dots = self.dotsBlock.querySelectorAll(`.slider__dot`);

    self.currentSlide = 0;
    self.slide();

    // Прогрессивное улучшение
    functions.unhide(self.dotsBlock);
    functions.unhide(self.prev);
    functions.unhide(self.next);

    self.next.addEventListener(`click`, () => {
      self.currentSlide++;
      self.slide();
    });

    self.prev.addEventListener(`click`, () => {
      self.currentSlide--;
      self.slide();
    });

    functions.applyAll(self.dots, (item) => {
      item.addEventListener(`click`, () => {
        self.currentSlide = +item.getAttribute(`data-index`);
        self.slide();
      });
    });
  }

  slide() {
    const self: any = this;

    self.slider.style.transform = `translateX(-${self.currentSlide * 100}%)`;

    functions.disableElem(self.prev, self.currentSlide < 1);
    functions.disableElem(self.next, self.currentSlide >= self.slides.length - 1);
    self.checkDots();
  }

  checkDots() {
    const self: any = this;

    functions.applyAll(self.dots, (item) => {
      functions.disableElem(item, +item.getAttribute(`data-index`) === self.currentSlide);
    });
  }
}
