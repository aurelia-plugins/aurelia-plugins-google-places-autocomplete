// REQUIRES
const babel = require('gulp-babel');
const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const run = require('run-sequence');
const ts = require('gulp-typescript');


// PRIVATE PROPERTIES
const modules = ['amd', 'commonjs', 'es2015', 'system'];
const paths = { html: 'src/**/*.html', js: 'src/**/*.js', output: 'dist/' };


// TASK - DEFAULT
gulp.task('default', ['build']);


// TASK - BUILD
gulp.task('build', () => run('clean', 'build-html', modules.map(module => `build-babel-${module}`), 'build-dts'));


// TASKS - BUILD BABEL
modules.forEach(module => {
  gulp.task(`build-babel-${module}`, () =>
    gulp.src(paths.js)
      .pipe(babel({
        comments: false,
        plugins: module === 'es2015' ? ['transform-decorators-legacy'] : ['transform-decorators-legacy', `transform-es2015-modules-${module === 'system' ? 'systemjs' : module}`],
        presets: module === 'es2015' ? ['stage-1'] : [['env', { loose: true }], 'stage-1']
      }))
      .pipe(gulp.dest(`${paths.output}${module}`))
  );
});


// TASK - BUILD D.TS
gulp.task('build-dts', () => {
  const project = ts.createProject('tsconfig.json');
  const result = gulp.src(paths.js).pipe(rename(path => { if (path.extname === '.js') path.extname = '.ts'; })).pipe(project());
  modules.forEach(module => result.dts.pipe(gulp.dest(`${paths.output}${module}`)));
});


// TASK - BUILD HTML
gulp.task('build-html', () => modules.forEach(module => gulp.src(paths.html).pipe(gulp.dest(`${paths.output}${module}`))));


// TASK - CLEAN
gulp.task('clean', () => del([paths.output]));