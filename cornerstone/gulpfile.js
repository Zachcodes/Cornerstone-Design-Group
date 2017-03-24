const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

gulp.task('concat', function() {
  gulp.src(['./frontend/app.js','./frontend/**/*.js'])
  .pipe(concat('all.js'))
  .pipe(gulp.dest('./dist'))
})

gulp.task('es6', function() {
  gulp.src(['./frontend/app.js','./frontend/**/*.js'])
  .pipe(babel({
    presets: ['es2015']
  }))
})
