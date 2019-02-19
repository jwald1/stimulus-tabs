const buble = require("rollup-plugin-buble")
const resolve = require("rollup-plugin-node-resolve")
const babel = require("rollup-plugin-babel")
const commonjs = require("rollup-plugin-commonjs")

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",
    frameworks: ["mocha", "fixture", "sinon-chai"],

    files: [
      "src/**/*.js",
      { pattern: "spec/**/*_spec.js" },
      { pattern: "spec/fixtures/*.html" }
    ],

    preprocessors: {
      "src/**/*.js": ["webpack", "sourcemap"],
      "spec/**/*_spec.js": ["webpack", "sourcemap"],
      "spec/fixtures/*.html": ["html2js"]
    },

    webpack: {
      mode: "development",
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: [/node_modules/],
            use: [{ loader: "babel-loader" }]
          }
        ]
      }
    },

    // list of files / patterns to exclude
    exclude: [],

    client: {
      chai: {
        includeStack: true
      }
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher

    browsers: ["ChromeHeadless"],
    reporters: ["mocha"],
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    captureTimeout: 180000,
    browserDisconnectTimeout: 180000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 300000
  })
}
