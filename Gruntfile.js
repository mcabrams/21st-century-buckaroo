module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // grunt-contrib-connect will serve the files from the folders listed in `base`
    // on specified `port` and `hostname`
    connect: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          base: '.',
          livereload: true
        }
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.all.options.port %>'
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'stylesheets/sass/',
          cssDir: 'stylesheets/compiled/',
          config: '.compass.rb',
          trace: true
        }
      }
    },

    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['compass', 'shell'],
        options: {
          livereload: true
        }
      },
      html: {
        files: 'index.html',
        options: {
          livereload: true
        }
      }
    },

    shell: {
      scssLint: {
        command: 'echo -e "\e[0;31m`scss-lint --exclude-linter Comment stylesheets/sass/`"',
        options: {
          stdout: true
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  // Creates the default task (run `grunt` on cli)
  grunt.registerTask('default', [
    'connect',
    'open',
    'watch'
  ]);
};
