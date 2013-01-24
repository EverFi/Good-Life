
module.exports = function(grunt) {

  grunt.initConfig({
    meta: {
      src: 'src/goodlife.js',
      dist:'dist/goodlife.min.js'
    },

    min: {
      dist: {
        src: ['<%= meta.src %>'],
        dest: '<%= meta.dist %>'
      }
    }
  });

  grunt.registerTask('default', 'min');

}