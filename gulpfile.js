const { src, dest, parallel, watch } = require("gulp") /* Require говорит Node.js проверить папку node_modules и найти там папку gulp.
 Если такая имеется, то ее содержимое записывается в переменную gulp */,
  browserSync = require("browser-sync").create(),
  pug = require("gulp-pug"),
  sass = require("gulp-sass")(require("sass")),
  csso = require('gulp-csso'),
  concat = require("gulp-concat"), // обьединение файлов в один
  uglify = require("gulp-uglify-es").default, // Minify JavaScript
  autoprefixer = require("gulp-autoprefixer"),
  cleancss = require("gulp-clean-css"),
  plumber = require("gulp-plumber"), /* Gulp - plumber поможет нам без прекращения gulp watch продолжить работать
  и выдаст нам все наши критические ошибки. */
  imagemin = require("gulp-imagemin"),
  htmlmin = require("gulp-htmlmin"),
  panini = require("panini"), //сборки файлов HTML из общих элементов
  notify = require("gulp-notify"), // сообщения об ошибках
  webp = require("gulp-webp"), // конверт в webp
  newer = require("gulp-newer"); // провер было ли ранее сжато изобр

function html() {
  // panini.refresh();
  return (
    src("*.html")
      /*  .pipe(
      panini({
        root: "app/",
        layouts: "app/layouts/",
        partials: "app/partials/",
      })
    ) */
      .pipe(
        htmlmin({
          collapseWhitespace: true,
        })
      )
      .pipe(dest("docs"))
  ); // создаст docs экспорт туда готов html
}

/* function serve() {
  browserSync.init({
    browserSync: { baseDir: "./docs" },
    //port: 9000,
    //host: 'localhost',
    notify: false,
    online: true,
  });
} */

function scripts() {
  return (
    src("js/*.js")
      // destPath + 'js/*.js', {dot: true, ignore: '/**/*min.js'}
      .pipe(concat("min.js"))
      .pipe(uglify()) // минификация
      .pipe(dest("docs/js/"))
  );
}

function styles() {
  return (
    src("css/style.scss")
      .pipe(plumber())
      .pipe(eval("sass")()) // eval преобр строку sass в код/функцию sass
      .pipe(concat("style.min.css"))
      .pipe(cleancss({ level: { 1: { specialComments: 0 } } /*, format:"beautify" */ }))
      // level: {1: {specialComments: 0} в 1 строку удалит коментарии
      .pipe(autoprefixer("last 10 versions", "safari 5", "ie6", "ie7", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"))
      .pipe(dest("docs/css/"))
  );
}

function normalize() {
  return (
    src("css/normalize.css")
      .pipe(plumber()) // покажет ошибку а gulp продолжит работу
      .pipe(cleancss({ level: { 1: { specialComments: 0 } } /*, format:"beautify" */ }))
      // level: {1: {specialComments: 0} в 1 строку и удалит коментарии
      .pipe(csso())
      .pipe(dest("docs/css/"))
  );
}

function images() {
  return (
    src("img/*")
      .pipe(newer("docs/img/"))
      .pipe(imagemin())
      //.pipe(webp())
      .pipe(dest("docs/img/"))
  );
}

/* function startwatch() { */
//  watch(["app/**/*.js", "!app/**/*.min.js"], scripts).on("change", browserSync.reload);
//// (!app/**/*.min.js) кроме файлов min.js
//  watch("app/**/*.scss", styles).on("change", browserSync.reload);
//  watch("app/**/*.html", html).on("change", browserSync.reload);
//}

exports.html = html;
//exports.serve = serve;
exports.scripts = scripts;
exports.styles = styles;
exports.normalize = normalize;
exports.images = images;
//exports.startwatch = startwatch;

exports.default = parallel(html, scripts, styles, normalize, images); //startwatch, serve,

//parallel запускаем паралельно
// для запуска вэбсервера пишем в коман стр gulp

//***************************************************** */
