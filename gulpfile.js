/** Gulp file for tasks */

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');  
var uglify = require('gulp-uglify');  

var paths = {
  public: {
    source: 'public/css/source',
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

// Sass
gulp.task('sass', function () {
  return compile_sass(paths.public.source + '/profiles.scss', paths.public.css);
});

// Watch
gulp.task('watch', function() {
  gulp.watch(paths.public.source + '/**/*.scss', ['sass']);
});

// Default
gulp.task('default', [
  'sass',
]);