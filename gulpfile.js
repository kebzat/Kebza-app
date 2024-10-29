const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

const paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'dist/'
    },
    html: {
        src: 'src/*.html',
        dest: 'dist/'
    }
};

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([tailwindcss, autoprefixer]))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function html() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.html.src, html);
}

exports.default = gulp.series(gulp.parallel(styles, html), watch);
