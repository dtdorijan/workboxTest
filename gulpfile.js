const gulp = require('gulp');
const workboxBuild = require('workbox-build');
const runSequence = require('run-sequence');


gulp.task('copyHtml', () => {
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('copyCss', () => {
    gulp.src('src/css/*.css')
    .pipe(gulp.dest('dist/css'))
})

gulp.task('copyJs', () => {
    gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/js'))
})

gulp.task('service-worker', () => {
    return workboxBuild.injectManifest({
      swSrc: 'src/sw.js',
      swDest: 'dist/sw.js',
      globDirectory: 'dist',
      globPatterns: [
        'css/main.css',
        'index.html',
        'restaurant.html',
        'js/dbhelper.js',
        'js/restaurant_info.js',
        'js/main.js'
      ]
    }).catch(err => {
      console.log('[ERROR]: ' + err);
    });
  });


gulp.task('default', cb => {
    runSequence(
        'copyHtml',
         'copyCss',
         'copyJs',
        'service-worker',
        cb
        
    );
});
  