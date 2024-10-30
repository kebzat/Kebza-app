const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');

const paths = {
    styles: {
        src: 'src/styles/**/*.css',
        dest: 'dist/'
    },
    html: {
        src: 'src/**/*.html',
        dest: 'dist/'
    },
    assets: {
        src: 'src/imgs/*',
        dest: 'dist/imgs/'
    }
};

function styles() {
    console.log('Compiling SCSS...');
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([tailwindcss, autoprefixer]))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function html() {
    console.log('Copying HTML...');
    return gulp.src(paths.html.src)
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

function assets() {
    console.log('Copying assets...');
    return gulp.src('src/imgs/*', { allowEmpty: true })
        .pipe(gulp.dest('dist/imgs/'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.html.src, gulp.series(html, styles));
    //gulp.watch(paths.assets.src, assets);
}

exports.default = gulp.series(gulp.parallel(styles, html), watch);
