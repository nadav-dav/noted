module.exports = {
    compile: {
        options: {
            paths: ["app/public/assets/less"]
        },
        files: {
            "dist/assets/css/main.css": [
            	"app/public/assets/less/main.less"
            ]
        }
    }
};
