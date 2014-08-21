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
    clean:  task('clean'),
    copy:   task('copy'),
    concat: task('concat'),
    uglify: task('uglify'),
    jshint: task('jshint'),
    open:   task('open'),
    less:   task('less'),
    waitServer:   task('waitServer')
  });

  grunt.registerTask('build', [
    'jshint',
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
    'wait-forever'
  ]);

  grunt.registerTask('build2', [
    'clean:dist',
    'replace:dist',
    'compass:dist',
    'requirejs',
    'concat',
    'copy',
    'uglify'
  ]);
  
  grunt.registerTask('default', ['jshint', 'build', 'open:server']);

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run([
        'jshint',
        'build',
        'open:server'
      ]);
    }

    grunt.task.run([
      'replace:server',
      'compass:server',
      'connect:livereload',
      'open:server'
    ]);
  });

  grunt.registerTask('test', function (isConnected) {
    // isConnected is true when started from watch
    isConnected = Boolean(isConnected);
    var testTasks = ['clean', 'replace:server', 'compass', 'connect:test', 'mocha', 'open:test', 'focus:test'];

    if (isConnected) {
      // already connected so not going to connect again, remove the connect:test task
      testTasks.splice(testTasks.indexOf('open:test'), 1);
      testTasks.splice(testTasks.indexOf('connect:test'), 1);
    }

    return grunt.task.run(testTasks);
  });
};

