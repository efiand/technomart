'use strict';

const { task, parallel, src, dest } = require(`gulp`);
const { changed, imagemin, webp, svgstore } = require(`gulp-load-plugins`)();
const {
  source,
  previews,
  build,
  temp,
  svgo,
  jpegoptim,
  webp: webpConfig,
  svgstore: svgstoreConfig
} = require(`../../package.json`);
const isDev = !process.env.NODE_ENV;

const tasks = [`img:build`];
if (isDev) {
  tasks.push(`img:dev`);
}

const end = `${build}/img`;
const previewsEnd = `${end}/previews`;

task(`img:build`, () => {
  return src(`${source}/img/*.{jpg,png,svg}`)
    .pipe(changed(end))
    .pipe(imagemin([
      require(`imagemin-jpegoptim`)(jpegoptim),
      imagemin.optipng(),
      imagemin.svgo(svgo)
    ]))
    .pipe(dest(end))
    .pipe(webp(webpConfig))
    .pipe(dest(end));
});

task(`img:dev`, () => {
  return src(`${previews}/**/*.jpg`)
    .pipe(changed(previewsEnd))
    .pipe(imagemin([
      require(`imagemin-jpegoptim`)(jpegoptim)
    ]))
    .pipe(dest(previewsEnd));
});

task(`img`, parallel(...tasks));

task(`img:icons`, () => {
  return src(`${source}/img/icons/*.{png,svg}`)
    .pipe(imagemin([
      imagemin.optipng(),
      imagemin.svgo(svgo)
    ]))
    .pipe(dest(`${temp}/icons`));
});

task(`img:sprite`, () => {
  return src(`${source}/img/sprite/*.svg`)
    .pipe(imagemin([imagemin.svgo(svgo)]))
    .pipe(svgstore(svgstoreConfig))
    .pipe(dest(end));
});
