// LOAD PLUGINS
var gulp = require('gulp')
var sass = require('gulp-sass')
var cleanCSS = require('gulp-clean-css')
var jshint = require('gulp-jshint')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var livereload = require('gulp-livereload')
var notify = require('gulp-notify')

// PATH VARIABLES
var sassFiles = './app/styles/scss/**/*.scss'
var cssDest = './dist/styles'
var jsDest = './dist/scripts'

// STYLES
gulp.task('styles', function () {
  return gulp.src(sassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssDest))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS())
    .pipe(livereload())
    .pipe(gulp.dest(cssDest))
    .pipe(notify({ message: 'Styles task complete' }))
})

// SCRIPTS
gulp.task('scripts', function () {
  return gulp.src([
    './app/scripts/main.js',
    './app/scripts/color-generation.js',
    './app/scripts/color-array.js',
    './app/scripts/color-contrast.js',
    './app/scripts/utils.js',
    './app/scripts/mobile-behavior.js',
    './app/scripts/interaction.js',
    './app/scripts/mode-selector.js',
    './app/scripts/copy-btn.js'
  ])
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename({ suffix: '.min' }))
    // .pipe(uglify().on('error', function(e){
    //         console.log(e);
    //      }))
    // .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    // .pipe(livereload())
    .pipe(gulp.dest(jsDest))
    .pipe(notify({ message: 'Scripts task complete' }))
})

// DEFAULT TASK
gulp.task('default', ['clean'], function () {
  gulp.run('styles', 'scripts', 'images')
})

// WATCH FOR STYLES CHANGES
gulp.task('watch', function () {
  gulp.watch(sassFiles, ['styles'])

  // gulp.watch(sassFiles, function(event) {
  //   console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  //   gulp.run('styles');
  // });
})
