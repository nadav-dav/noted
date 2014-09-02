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
        spawn: task('spawn'),
        mochacli: task('mochacli'),
        waitServer: task('waitServer')
    });

    grunt.registerTask('build', [
        'clean:dist',
        'less:compile',
        'copy:projectfiles'
    ]);

    grunt.registerTask('webapp', function () {
        rek('app');
    });

    grunt.registerTask('run', [
        'build',
        'webapp',
        'waitServer',
        'open:server',
        'watch:less'
    ]);


    grunt.registerTask('api', [
        'build',
        'webapp',
        'watch:statics'
    ]);

    grunt.registerTask('default', ['run']);

    grunt.registerTask('test', ['build','mochacli','watch:test']);

};

