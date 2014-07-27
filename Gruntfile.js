module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/script/*.js'],
        dest: '<%= pkg.name %>.js'
      }
    },
    less: {
      options: {
        compress: true,
        cleancss: false
      },
      files: {
        "app/styles/style.css": "app/styles/style.less"
      }
    },

    watch: {
      files: ['app/styles/style.less'],
      tasks: ['less'],
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('con', ['concat']);

};