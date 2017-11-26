const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

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