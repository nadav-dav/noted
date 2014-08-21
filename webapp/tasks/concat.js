module.exports = {
    options: {
        banner: '<%= banner %>',
        stripBanners: true
    },
    dist: {
        src: ['<%= folder.components %>/requirejs/require.js',
            'dist/assets/js/require.js'
        ],
        dest: 'dist/assets/js/require.js'
    }
};
