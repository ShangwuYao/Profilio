/**
 * Grunt file for project automation.
 *
 * Author:  David Qiu
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */


var gruntConfig = function (grunt) {

  grunt.initConfig({

    clean: {
      all: 'build/**/*'
    },

    copy: {
      build_imports: {
        files: [
          { expand: true, cwd: 'bower_components/jquery/dist', src: ['*.min.js', '*.min.map'], dest: 'build/public/imports/jquery' },
          { expand: true, cwd: 'bower_components/bootstrap/dist', src: ['css/*.min.css', 'css/*.min.map', 'fonts/*', 'js/bootstrap.min.js'], dest: 'build/public/imports/bootstrap' },
          { expand: true, cwd: 'bower_components/bootswatch-dist', src: ['css/*.min.css', 'fonts/*', 'js/bootstrap.min.js'], dest: 'build/public/imports/bootswatch' },
          { expand: true, cwd: 'bower_components/components-font-awesome', src: ['css/*.min.css', 'fonts/*'], dest: 'build/public/imports/font-awesome' }
        ]
      },
      src_imports: {
        files: [
          { expand: true, cwd: 'bower_components/jquery/dist', src: ['*.min.js', '*.min.map'], dest: 'src/public/imports/jquery' },
          { expand: true, cwd: 'bower_components/bootstrap/dist', src: ['css/*.min.css', 'css/*.min.map', 'fonts/*', 'js/bootstrap.min.js'], dest: 'src/public/imports/bootstrap' },
          { expand: true, cwd: 'bower_components/bootswatch-dist', src: ['css/*.min.css', 'fonts/*', 'js/bootstrap.min.js'], dest: 'src/public/imports/bootswatch' },
          { expand: true, cwd: 'bower_components/components-font-awesome', src: ['css/*.min.css', 'fonts/*'], dest: 'src/public/imports/font-awesome' }
        ]
      },
      node: {
        files: [
          { expand: true, cwd: 'src', src: ['bin/**/*', 'lib/**/*', 'routes/**/*', 'views/**/*', '*.*'], dest: 'build' }
        ]
      },
      public: {
        files: [
          { expand: true, cwd: 'src/public', src: ['images/**/*', '*.*'], dest: 'build/public' },
          { expand: true, cwd: 'data', src: ['files/**/*'], dest: 'src/public' },
          { expand: true, cwd: 'data', src: ['files/**/*'], dest: 'build/public' }
        ]
      }
    },

    uglify: {
      options: {
        banner: '/* Copyright (C) 2016, David Qiu. All rights reserved. */\n'
      },
      javascripts: {
        files: [
          { expand: true, cwd: 'src/public/javascripts', src: '**/*.js', dest: 'build/public/javascripts' }
        ]
      }
    },

    cssmin: {
      options: {
        banner: '/* Copyright (C) 2016, David Qiu. All rights reserved. */\n'
      },
      stylesheets: {
        files: [
          { expand: true, cwd: 'src/public/stylesheets', src: ['**/*.css'], dest: 'build/public/stylesheets' }
        ]
      }
    },

    htmlmin: {
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true
      },
      views: {
        files: [
          { expand: true, cwd: 'src/views', src: ['**/*.ejs'], dest: 'build/views' }
        ]
      }
    },

    watch: {
      src: {
        files: ['src/**/*'],
        tasks: ['default']
      },
      bower: {
        files: ['bower_components/**/*'],
        tasks: ['copy:src_imports', 'copy:build_imports']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'copy', 'uglify', 'cssmin', 'htmlmin']);

};


module.exports = gruntConfig;
