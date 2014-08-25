module.exports = {
    echo: {
        command: "echo",
        commandArgs: ["{0}"],
        directory: "./app",
        pattern: "**/*.js",
        useQuotes: true,
        quoteDelimiter: "\"",
        groupFiles: true,
        fileDelimiter: " ",
        ignore: ["notNeededFile.js"]
    },
    list: {
        command: "ls",
        commandArgs: ["-la", "{0}"],
        directory: "./app"
    },
    test: {
        command: "mocha",
        commandArgs: ["--reporter", "spec", "{0}"],
        directory: "./tests",
        pattern: "**/*.js"
    }
};