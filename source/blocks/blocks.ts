import Slider from './slider/slider';
import PerfectPixel from './perfect-pixel/perfect-pixel';

const blocks = {
  '.slider': Slider
};

if (isDev) {
  blocks[`.perfect-pixel`] = PerfectPixel;
}

export default blocks;
