/*ПОДКЛЮЧЕНИЕ GULP*/
/*Переменная src берет исходные данные, dest помещает полученные для gulp*/
/*watch следит за изменениями данных*/
/*parallel выполняет параллельно обновления*/
/* series выполняет последователоьно и попорядку обновления*/
const{src, dest, watch, parallel, series} = require('gulp');


/*ПОДКЛЮЧЕНИЕ ПЛАГИНОВ GULP*/

/*HTML*/
/*BROWSER-SYNC, для работы с html-файлами*/
const browserSync = require('browser-sync').create();
/*GULP INCLUDE, для объединения html-файлов*/
const include = require('gulp-include')

/*CSS*/
/*GULP-SASS, для преобразования файлов из scss в .css*/
const scss = require('gulp-sass')(require('sass'));
/*GULP-CONCAT, для объединения файлов и переменования в один .css файл*/
const concat = require('gulp-concat');
/*GULP-AUTOPREFIXER, добавляет префиксы к свойствам в .css файлах*/
const autoprefixer = require('gulp-autoprefixer');

/*JAVASCRIPT*/
/*GULP-UGLIFY-ES, для работы с JS-файлами*/
const uglify = require('gulp-uglify-es').default;

/*IMAGE*/
/*Плагины для конвертации изображений*/
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
        'assets/scss/section_kviz.scss',
        'assets/scss/section_cards.scss',
        'assets/scss/footer.scss',
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
        'assets/js/main.js'
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

/*Start version 2*/
/*IMAGE*/

/*Функция для конвертации картинок*/
function images(){
    return src(['assets/images/src/*.*','!assets/images/src/*.svg'])

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