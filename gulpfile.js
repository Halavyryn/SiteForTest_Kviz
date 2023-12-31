/*ПОДКЛЮЧЕНИЕ GULP*/
const{src, dest, watch, parallel, series} = require('gulp');


/*ПОДКЛЮЧЕНИЕ ПЛАГИНОВ GULP*/

/*HTML*/

const browserSync = require('browser-sync').create();
const include = require('gulp-include')

/*CSS*/

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

/*JAVASCRIPT*/
const uglify = require('gulp-uglify-es').default;

/*IMAGE*/
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
/*Плагин для очистки кэша изображений*/
const newer = require('gulp-newer');

/*SVG*/
/*GULP-SVG-SPRITE для объединения SVG-файлов в один*/
const svgSprite = require('gulp-svg-sprite');

/*FONTS*/
/*Добавление плагинов для шрифтов*/
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');

/*BUILD ПРОЕКТА*/
/*Плагин для удаления прошлой версии проекта build*/
const clean = require('gulp-clean');



/*СОЗДАНИЕ ФУНКЦИЙ*/
/*CSS*/
/*Функция для получения файла min.css из scss*/
function styles(){
    return src([
        'assets/scss/reset.scss',
        'assets/scss/style.scss',
        'assets/scss/header.scss',
        'assets/scss/header_popups.scss',
        'assets/scss/section_kviz.scss',
        'assets/scss/section_cards.scss',
        'assets/scss/footer.scss',
        'assets/scss/feedback.scss',

        'assets/scss/adaptive_header.scss',
        'assets/scss/adaptive_header_popups.scss',
        'assets/scss/header_hamburger_menu.scss',
        'assets/scss/adaptive_section_cards.scss',
        'assets/scss/adaptive_section_kviz.scss',
        'assets/scss/adaptive_footer.scss',
    ])
        .pipe(autoprefixer({overrideBrowserslist:['last 10 version']}))
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(dest('assets/css'))
        .pipe(browserSync.stream())
}

/*JavaScript*/
/*Функция для получения файла min.js из js*/
function scripts(){
    return src([
        'assets/js/main.js',
        'assets/js/hamburger_menu.js',
        'assets/js/header.js',
        'assets/js/section_kviz.js',

    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('assets/js'))
        .pipe(browserSync.stream())
}

/*ОБЩИЕ ФУНКЦИИ*/
/*Отслеживает измениния в файлах html, JS и CSS и конвертирует изображения, объединяет части html-страницы*/
function watching(){
    browserSync.init({
        server: {
            baseDir: "assets/"
        }
    });
    watch(['assets/scss/**/*.scss'], styles)
    watch(['assets/images/src'], images)
    watch(['assets/js/main.js'], scripts)
    watch(['assets/components/*', 'assets/pages/*'], pages)
    watch(['assets/*.html']).on('change', browserSync.reload)
}

/*Функция для удаления старой версии проекта build*/
function cleanDist(){
    return src('dist')
        .pipe(clean())
}

/*Функция для построения проекта*/
function building(){
    return src([
        'assets/css/style.min.css',
        '!assets/images/**/*.html',
        'assets/images/*.*',
        '!assets/images/*.svg',
        'assets/images/sprite.svg',
        'assets/fonts/*.*',
        'assets/js/main.min.js',
        'assets/**/*.html'
    ], { base : 'assets'})
        .pipe(dest('dist'))
}


/*IMAGE*/
/*Функция для конвертации картинок*/
function images(){
    return src(['assets/images/src/**.*','!assets/images/src/*.svg'])

        /*Плагин кеш для проверки существуют ли картинки, чтобы не повторять конвертацию*/
        .pipe(newer('assets/images'))
        /*Из исходного формата в avif кроме svg*/
        .pipe(avif({ quality : 50 }))

        /*Из исходного формата в webp кроме svg,avif*/
        .pipe(src('assets/images/src/*.*'))
        .pipe(newer('assets/images'))
        .pipe(webp())

        /*Из исходного формата в сжатый .jpg кроме svg, avif, webp*/
        .pipe(src('assets/images/src/*.*'))
        .pipe(newer('assets/images'))
        .pipe(imagemin())

        /*Помещает получ. файлы в указ. директорию*/
        .pipe(dest('assets/images'))
}

/*SVG*/
/*Функция для создания спрайта*/
function sprite(){
    return src('assets/images/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite:'../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('assets/images'))
}

/*FONTS*/
/*Функция для конвертации шрифтов*/
function fonts(){
    return src('assets/fonts/src/*.*')

        /*Конвертирует только из форматом .ttf в .woff2*/
        .pipe(src('assets/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('assets/fonts'))
}

/*GULP INCLUDE*/
/*Функция для объедтнеия html-файлов*/
function pages(){
    return src('assets/pages/*.html')
        .pipe(include({
            includePaths: 'assets/components'
        }))
        .pipe(dest('assets'))
        .pipe(browserSync.stream())
}



/*EXPORTS*/
/*CSS*/
exports.styles = styles;

/*JavaScript*/
exports.scripts = scripts;


/*ОБЩИЕ ФУНКЦИИ*/
/*Экспортируем функцию, которая отслеживает измениния*/
exports.watching = watching;

/*Экспортируем в командную строку по дефолту, все процессы параллельно*/
exports.default = parallel(styles, images, scripts, pages, watching);

/*Экспортируем в командную строку построение новой сборки*/
exports.building = building;

/*Экспортируем в командную строку последовательно: удаление старой сборки, затем построение новой сборки*/
exports.build = series( cleanDist, building );

/*IMAGE*/
/*Экспортируем в командную строку функцию для конвертации изображения*/
exports.images = images;

/*SVG*/
/*Экспортируем в командную строку функцию для спрайта .SVG*/
exports.sprite = sprite;

/*FONTS*/
/*Экспортируем в командную строку функцию для конвертации шрифтов*/
exports.fonts = fonts;

/*GULP INCLUDE*/
/*Экспортируем в командную строку объеденинение частей html страницы*/
exports.pages = pages;