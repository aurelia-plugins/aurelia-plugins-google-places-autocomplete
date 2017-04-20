// REQUIRES
const babel = require('gulp-babel');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const run = require('run-sequence');


// PRIVATE PROPERTIES
const modules = ['amd', 'commonjs', 'es2015', 'system'];
const paths = { html: 'src/**/*.html', js: 'src/**/*.js', output: 'dist/' };


// TASK - BUILD
gulp.task('build', () => run('clean', 'build-html', modules.map(module => `build-babel-${module}`)));


// TASKS - BUILD BABEL
modules.forEach(module => {
  gulp.task(`build-babel-${module}`, () =>
    gulp.src(paths.js)
      .pipe(babel({
        comments: false,
        plugins: ['transform-decorators-legacy', 'transform-class-properties'],
        presets: module === 'es2015' ? ['stage-1'] : [['env', {
          include: ['transform-es2015-template-literals'],
          loose: true,
          modules: module === 'es2015' ? false : module === 'system' ? 'systemjs' : module,
          targets: { browsers: ['last 2 versions', 'not ie <= 11'] }
        }]]
      }))
      .pipe(gulp.dest(`${paths.output}${module}`))
  );
});


// TASK - BUILD HTML
gulp.task('build-html', () => modules.forEach(module => gulp.src(paths.html).pipe(gulp.dest(`${paths.output}${module}`))));


// TASK - CLEAN
gulp.task('clean', () => del([paths.output]));