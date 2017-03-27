const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

gulp.task('es6-bundle', function() {
  gulp.src(['./frontend/app.js','./frontend/**/*.js'])
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(concat('all.js'))
  .pipe(gulp.dest('./frontend/dist'))
})
gulp.task('sass', function () {
    gulp.src('./*.sass')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./frontend/dist'));
});
gulp.task('watch', function(){
  gulp.watch('styles.sass', ['sass']);
  gulp.watch('./frontend/**/*.js', ['es6-bundle']);
})
