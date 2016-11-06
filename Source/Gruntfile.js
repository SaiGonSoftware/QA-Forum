module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.initConfig({
        cssmin: {
            combine:{
                files:{
                    'public/css/web-style.min.css':['public/css/bootstrap-theme.min.css', 'public/css/bootstrap.min.css','public/css/font-awesome.min.css','public/css/style.css'],
                    'public/css/login.min.css':['public/css/bootstrap.min.css', 'public/css/login.css']
                }
            }
        },
        uglify: {
            options:{
                manage:false
            },
            my_target:{
                files:{
                    'public/js/angular-app.min.js':['public/js/angular.min.js', 'public/js/angular-route.min.js'],
                    'public/js/jquery-app.min.js':['public/js/jquery.min.js', 'public/js/bootstrap.min.js'],
                    'public/frontend/app.min.js':['public/frontend/controllers/**/*.js']
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'public/frontend/**/!*.min.js']
        },
        concurrent: {
          dev: {
            tasks: ['nodemon', 'node-inspector', 'watch'],
            options: {
              logConcurrentOutput: true
            }
          }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    ext: 'js,jade',
                    env: {
                        PORT:8000
                    },
                    // omit this property if you aren't serving HTML files and 
                    // don't want to open a browser tab on start
                    callback: function(nodemon) {
                        // opens browser on initial server start
                        nodemon.on('config:update', function() {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('open')('http://localhost:8000');
                            }, 1000);
                        });

                        // refreshes browser when server reboots
                        nodemon.on('restart', function() {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            },
        },
        watch: {
          server: {
            files: ['.rebooted'],
            options: {
              livereload: true
            }
          } 
        }
    });

    grunt.log.write('Grunt is running\n');
    grunt.registerTask('default',['jshint','cssmin','uglify','nodemon']);
};
