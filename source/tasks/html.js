'use strict';

const { task, src, dest, series } = require(`gulp`);
const {
  plumber,
  data,
  nunjucksRender,
  htmlhint,
  htmlmin,
  w3cHtmlValidator
} = require(`gulp-load-plugins`)();
const {
  source,
  build,
  htmlhint: htmlhintConfig,
  htmlmin: htmlminConfig
} = require(`../../package.json`);

// Повторное считывание для применения без перезапуска сборки
const getJson = (json) => JSON.parse(require(`fs`).readFileSync(json));

const exec = require(`child_process`).exec;

task(`html:compile`, () => {
  return src(`${source}/pages/**/*.njk`)
    .pipe(plumber())
    .pipe(data((page) => {
      const pageName = require(`path`).win32.basename(page.path, `.njk`);

      return {
        ...getJson(`${source}/data/project.json`),
        ...getJson(`${source}/data/pages/${pageName}.json`),
        page: pageName,
        source,
        isDev: !process.env.NODE_ENV,
        template: `${source}/blocks/blocks.njk`
      };
    }))
    .pipe(nunjucksRender({
      manageEnv: (env) => {
        env.opts.autoescape = false;

        env.addFilter(`onlyDigits`, (str = ``) => str.replace(/\D/g, ``));

        env.addFilter(`bem`, (str = ``, blockName = ``) => {
          return str.replace(/("| )(\-\-|__)/g, `$1${blockName}$2`);
        });

        env.addFilter(`nowhereHref`, (str = ``) => {
          return str.replace(/="#"/g, `="#nowhere"`);
        });

        env.addFilter(`blockPath`, (blockName = ``) => {
          return `${source}/blocks/${blockName}/${blockName}.njk`;
        });

        env.addFilter(`editDict`, (dict, key, value) => {
          dict[key] = value;
          return dict;
        });
      }
    }))
    .pipe(htmlhint(htmlhintConfig))
    .pipe(htmlhint.reporter())
    .pipe(htmlmin(htmlminConfig))
    .pipe(dest(build))
    .pipe(w3cHtmlValidator())
    .pipe(w3cHtmlValidator.reporter());
});

task(`bem:validate`, (done) => {
  exec(`npm run bem:validate`, (err, stdout, stderr) => {
    console.log(stdout); // eslint-disable-line
    console.log(stderr); // eslint-disable-line
    done(err);
  });
});

task(`html`, series(`html:compile`, `bem:validate`));
