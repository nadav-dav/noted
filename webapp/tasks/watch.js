

module.exports =  {
    less: {
        files: ['<%= folder.app %>/assets/**/*.less'],
        tasks: ['less']
    },
    test: {
        files: ['src/**/*.js', 'test/**/*.js', 'package.json'],
        tasks: ['mochacli']
    }
};
