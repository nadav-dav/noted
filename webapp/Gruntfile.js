'use strict';
var rek = require('rekuire');

function task(taskName) {
    return require('./tasks/' + taskName);
}

module.exports = function (grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({

        folder: {
            app: 'app/public',
            dist: 'dist',
            components: 'app/components'
        },

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
        clean: task('clean'),
        copy: task('copy'),
        concat: task('concat'),
        uglify: task('uglify'),
        open: task('open'),
        less: task('less'),
        watch: task('watch'),
        ftps: task('ftps'),
        waitServer: task('waitServer')
    });

    grunt.registerTask('build', [
        'clean:dist',
        'less:compile',
        'copy:resources',
        'copy:projectfiles',
    ]);

    grunt.registerTask('webapp', function () {
        rek('app');
    });

    grunt.registerTask('run', [
        'build',
        'webapp',
        'waitServer',
        'open:server',
        'watch:less',
        'wait-forever'
    ]);

    grunt.registerTask('default', ['run']);

};

