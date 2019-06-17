import functions from './functions';
import blocks from '../blocks/blocks';

export * from '../../node_modules/picturefill/dist/picturefill.min.js';

export * from '../../node_modules/svg4everybody/dist/svg4everybody.min.js';
svg4everybody();

Object.keys(blocks).forEach((selector) => {
  functions.applyAll(selector, (item) => new blocks[selector](item));
});
