// HELPER FOR COPY
function components(src, dest, pattern) {
    pattern = pattern || ['*']
    return {
        expand: true,
        cwd: '<%= folder.components %>' + src,
        dest: 'dist/assets' + dest,
        src: pattern
    }
}

module.exports = {
    projectfiles: {
        files: [{
            expand: true,
            cwd: '<%= folder.app %>/assets',
            dest: 'dist/assets',
            src: ['**/*']
        },{
            expand: true,
            cwd: '<%= folder.app %>',
            dest: 'dist',
            src: [
                '*.html',
                'robots.txt',
                'favicon.ico'
            ]
        }]
    }
};
