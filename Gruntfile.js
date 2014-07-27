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
        dest: '<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %>, now 83% smaller! <%= grunt.template.today("dd-mmmm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
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
    watch: {
      js: {
        files: ['app/styles/style.less'],
        tasks: ['less']
      },
      styles: {
        files: ['app/script/*.js'],
        tasks: ['concat', 'uglify']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('oops', ['concat', 'uglify', 'less']);
};