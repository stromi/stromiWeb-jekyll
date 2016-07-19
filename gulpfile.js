var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');


var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function(done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn(jekyll, ['build'], { stdio: 'inherit' })
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'scripts', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        port: 4444
    });
});

gulp.task('clean', function() {
    return gulp.src(['./css', './js'], { read: false })
        .pipe(clean());
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function() {
    gulp.src('_src/sass/main.scss')

    .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass({
            includePaths: ['sass'],
            onError: browserSync.notify
        }))

    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(gulp.dest('css'));

});




gulp.task('scripts', function() {
    return gulp.src(['./_src/js/vendor/*.js', './_src/js/stromi.js'])
        // .pipe(plumber())
        .pipe(concat('stromi.min.js'))
        .pipe(gulp.dest('_site/js'))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(gulp.dest('js'));



});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function() {
    gulp.watch('_src/sass/*.scss', ['sass']);
    gulp.watch('_src/js/**/*.js', ['scripts']);
    gulp.watch(['_includes/*.html', '*.html', '_layouts/*.html', '_posts/*', '_works/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch', 'clean']);
gulp.task('prod', ['sass-min', 'scripts-min', 'jekyll-build']);
