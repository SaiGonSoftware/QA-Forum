module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.initConfig({
        cssmin: {
            combine: {
                files: {
                    'public/css/web-style.min.css': ['public/css/bootstrap-theme.min.css', 'public/css/bootstrap.min.css', 'public/css/font-awesome.min.css', 'public/css/style.css'],
                    'public/css/login.min.css': ['public/css/bootstrap.min.css', 'public/css/login.css']
                }
            },
            dev: {
                files: {
                    'public/css/web-style.min.css': ['public/css/bootstrap-theme.min.css', 'public/css/bootstrap.min.css', 'public/css/font-awesome.min.css', 'public/css/style.css'],
                }
            },
        },
        concat: {
            js: {
                files: {
                    'public/js/angular-app.min.js': ['public/js/angular.min.js', 'public/js/angular-route.min.js', 'public/js/angular-animate.min.js'],
                    'public/js/jquery-app.min.js': ['public/js/jquery.min.js', 'public/js/bootstrap.min.js'],
                    'public/frontend/app.min.js': ['public/frontend/**/*.js', '!public/frontend/app.min.js']
                }
            },
            dev: {
                files: {
                    'public/frontend/app.min.js': ['public/frontend/**/*.js', '!public/frontend/app.min.js']
                }
            }
        },
        uglify: {
            bundle: {
                files: {
                    'public/js/angular-app.min.js': 'public/js/angular-app.min.js',
                    'public/js/jquery-app.min.js': 'public/js/jquery-app.min.js',
                    'public/frontend/app.min.js': 'public/frontend/app.min.js'
                }
            },
            dev: {
                files: {
                    'public/frontend/app.min.js': 'public/frontend/app.min.js'
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'public/frontend/**/*.js', '!public/frontend/**/*.min.js']
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    ext: 'js,jade,css',
                    env: {
                        PORT: 8000,
                        NODE_ENV: "development"
                    },
                    // omit this property if you aren't serving HTML files and
                    // don't want to open a browser tab on start
                    callback: function(nodemon) {
                        // opens browser on initial server start
                        nodemon.on('config:update', function() {
                            // Delay before server listens on port
                            require('open')('http://localhost:8000');
                        });
                        // refreshes browser when server reboots
                        nodemon.on('restart', function() {
                            require('fs').writeFileSync('.rebooted', 'rebooted');
                        });
                    }
                }
            },
        },
        watch: {
            scripts: {
                files: ['public/frontend/**/*.js', '!public/frontend/**/*.min.js'],
                tasks: ['jshint', 'clean:js', 'concat:dev', 'uglify:dev'],
                options: {
                    spawn: false,
                    reload: true
                }
            },
            css: {
                files: ['public/css/*.css', '!public/css/*.min.css'],
                tasks: ['clean:css', 'cssmin:dev'],
                options: {
                    reload: true
                }
            },
            server: {
                files: ['.rebooted'],
                options: {
                    livereload: true
                }
            }

        },
        clean: {
            js: ['public/frontend/app.min.js'],
            css: ['public/css/web-style.min.css']
        }
    });

    grunt.log.write('Grunt is running\n');
    grunt.registerTask('default', ['jshint', 'cssmin:combine', 'concat:js', 'uglify:bundle', 'concurrent']);
    grunt.registerTask('minfile', ['uglify']);
};