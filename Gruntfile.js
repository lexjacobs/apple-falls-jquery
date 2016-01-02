module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            dist: {
                files: {
                    'bundle.js': './app/script/gameLoop'
                },
                options: {
                    alias: {
                        'game': './app/script/gameLoop'
                    }
                }
            }
        },

        less: {
            development: {
                options: {
                    compress: true,
                    cleancss: false,
                    sourceMap: true,
                    sourceMapFilename: 'app/styles/style.map',
                    sourceMapBasepath: 'app/styles',
                    sourceMapRootpath: ''
                },
                files: {
                    "app/styles/style.css": "app/styles/style.less"
                }
            }
        },

        notify: {
            browserify: {
                options: {
                    message: 'browserify bundle done'
                }
            },
            oops: {
                options: {
                    message: 'completed clean up'
                }
            }
        },

        serve: {
            options: {
                port: 9000
            }
        },

        watch: {
            js: {
                files: ['app/styles/style.less'],
                tasks: ['less']
            },
            styles: {
                files: ['app/script/*.js', 'Gruntfile.js'],
                tasks: ['browserify', 'notify:browserify']
            }
        }

    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-serve');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('oops', ['concat', 'uglify', 'less', 'notify:oops']);
};
