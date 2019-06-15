'use strict';

const { task, src, dest } = require(`gulp`);
const {
  cssBase64,
  plumber,
  sass,
  combineMq,
  postcss,
  rename
} = require(`gulp-load-plugins`)();
const { source, build, base64 } = require(`../../package.json`);

const isDev = !process.env.NODE_ENV;

task(`css`, () => {
  return src(`${source}/scss/style.scss`, { sourcemaps: isDev })
    .pipe(plumber())
    .pipe(sass())
    .pipe(combineMq())
    .pipe(postcss([
      require(`autoprefixer`)(),
      require(`postcss-csso`)({ comments: false })
    ]))
    .pipe(cssBase64(base64))
    .pipe(rename({ suffix: `.min` }))
    .pipe(dest(`${build}/css`, { sourcemaps: isDev ? `.` : false }));
});
