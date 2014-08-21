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
    resources: {
        files: [
            // FONTS
            components("/bootstrap/dist/fonts", "/fonts"),
            components("/font-awesome/fonts", "/fonts"),

            // BOOSTRAP
            components("/bootstrap/dist/css", "/css", ["*.min.css"]),
            components("/bootstrap/dist/js", "/js", ["*.min.js"]),

            // JQUERY
            components("/jquery/dist", "/js", ["*.min.js"]),

            // FASTCLICK
            components("/fastclick/lib", "/js"),

            // KNOCKOUT
            components("/knockout.js", "/js", ["knockout.js"]),
            components("/knockout.validation/Dist", "/js", ["*.min.js"]),

            // FONT-AWESOME
            components("/font-awesome/css", "/css", ["*.min.css"]),
        ]
    },
    projectfiles: {
        files: [{
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
