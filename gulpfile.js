const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gulpMocha = require('gulp-mocha');

gulp.task('default', function(){
   nodemon({
       script: "./src/app.js",
       ext: 'js',
       env: {
           PORT: 3000
       },
       ignore: ['./node_modules/**'],
   }).on('restart', function(){
        console.log('Restarting server');
   });

});

gulp.task('test', function(){
    gulp.src('./src/tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}));
});