module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: '\n'
            },
            dist: {
                src: ['app/script/*.js'],
                dest: 'dist/apple-falls.js'
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
            concat: {
                options: {
                    message: 'file concat done'
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

        uglify: {
            options: {
                // the banner is inserted at the top of the output
                sourceMap:true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mmmm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/apple-falls.min.js': ['dist/apple-falls.js']
                }
            }
        },

        watch: {
            js: {
                files: ['app/styles/style.less'],
                tasks: ['less']
            },
            styles: {
                files: ['app/script/*.js', 'Gruntfile.js'],
                tasks: ['concat', 'uglify', 'notify:concat']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-serve');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('oops', ['concat', 'uglify', 'less', 'notify:oops']);
};
