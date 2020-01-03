const gulp = require('gulp')
const clean = require('gulp-clean')

// map file 移动任务，该任务将map文件夹移动到build文件夹下以供使用
gulp.task('move', ['clean'], function (done) {
    gulp.src('public/map/*.json')
        .pipe(gulp.dest('build/map'));
    done();
})

gulp.task('clean', function () {
    gulp.src('./build/map')
        .pipe(clean())
})
