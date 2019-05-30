'use strict';

const { task } = require(`gulp`);
const { source, build, uglify } = require(`../../package.json`);

// Повторное считывание для применения без перезапуска сборки
const { readFileSync } = require(`fs`);
const projectSrc = `${source}/data/project.json`;
const DATA = () => JSON.parse(readFileSync(projectSrc)).js;

task(`js`, async () => {
  const compile = await require(`rollup`).rollup({
    input: `${source}/js/script.ts`,
    context: `window`,
    plugins: [
      require(`rollup-plugin-replace`)(DATA()),
      require(`rollup-plugin-typescript`)(),
      require(`rollup-plugin-uglify`).uglify(uglify)
    ]
  });

  await compile.write({
    file: `${build}/js/script.min.js`,
    format: `iife`,
    sourcemap: !process.env.NODE_ENV
  });
});
