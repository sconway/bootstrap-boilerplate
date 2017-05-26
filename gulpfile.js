var gulp        = require('gulp'),
    autoprefixer= require('autoprefixer'),
    flexibility = require('postcss-flexibility'),
    sass        = require('gulp-sass'),
    useref      = require('gulp-useref'),
    uglify      = require('gulp-uglify'),
    cssnano     = require('gulp-cssnano'),
    gulpIf      = require('gulp-if'),
    postcss     = require('gulp-postcss'),
    imagemin    = require('gulp-imagemin'),
    del         = require('del'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create();


// Task to compile our SCSS file into CSS
gulp.task('sass', function() {
  var plugins = [
      autoprefixer({browsers: ['last 2 versions']}),
      flexibility
  ];

  return gulp.src('app/sass/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// Reloads the browser when a file is saved
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});


// Watches all changes to the scss file or any javascript files,
// and calls the sass task and the browser reload if there are any.
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/sass/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});


// Goes through our source files and concatenates/uglifies
// css and javaScript to be put in the dist folder.
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify())) 
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});


gulp.task('json', function(){
  return gulp.src('app/json/*.json')
    .pipe(gulp.dest('dist/json'))
});

gulp.task('images', function(){
  return gulp.src('app/images/*')
    .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function(){
  return gulp.src('app/fonts/*')
    .pipe(gulp.dest('dist/fonts'))
});

// Deletes previous files in the dist folder.
gulp.task('clean:dist', function() {
  return del.sync('dist');
});


// Runs the build tasks to generate a working app in the dist folder.
gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'json', 'fonts', 'useref', 'images'],
    callback
  )
});


// Default task to run when developing.
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})




