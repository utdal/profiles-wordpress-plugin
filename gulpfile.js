/** Gulp file for tasks */

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');  
var uglify = require('gulp-uglify');  

var paths = {
  public: {
    publications: {
      source: 'public/css/source/publications',
    },
    css:   'public/css',
    fonts: 'public/fonts',
    js:    'public/js',
  },
};

/**
 * Compile Sass Helper.
 * 
 * @param  {string} sass_path : where the Sass files are
 * @param  {string} css_path  : where to put the CSS file
 */
function compile_sass(sass_path, css_path) {
  var options = {
    // Sass options
    sass: {
      style: 'nested',
      sourcemap: true,
      cacheLocation: '/tmp/sass-cache',
    },
    // AutoPrefixer options
    autoprefixer: {
      browsers: ['> 1%'],
      cascade: false,
    },
  };

  return sass(sass_path, options.sass)
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(css_path));
}

/** Tasks */

// Compile Publications Sass
gulp.task('publications-sass', function () {
  return compile_sass(paths.public.publications.source + '/profiles-publications.scss', paths.public.css);
});

// Sass
gulp.task('sass', [
  'publications-sass',
]);

// Watch
gulp.task('watch', function() {
  gulp.watch(paths.public.publications.source + '/**/*.scss', ['publications-sass']);
});

// Default
gulp.task('default', [
  'sass',
]);