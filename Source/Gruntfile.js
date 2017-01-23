module.exports = function ( grunt ) {
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-nodemon' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-concurrent' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.initConfig( {
		cssmin: {
			target: {
				files: {
					'public/css/style.min.css': [ 'public/css/bootstrap.min.css', 'public/css/font-awesome.min.css', 'public/css/toastr.min.css', 'public/css/style.css' ]
				}
			}
		},
		concat: {
			js: {
				files: {
					'public/js/forum.min.js': [ 'public/js/jquery.min.js', 'public/js/bootstrap.min.js', 'public/js/toastr.min.js', 'public/js/angular.min.js', 'public/js/angular-route.min.js', 'public/js/angular-animate.min.js', 'public/js/angular-local-storage.min.js', 'public/js/ngFacebook.js', 'public/frontend/**/*.js' ],
					'public/js/socket.io.min.js': [ 'public/js/socket.io.js' ]
				}
			},
			dev: {
				files: {
					'public/js/forum.min.js': [ 'public/js/jquery.min.js', 'public/js/bootstrap.min.js', 'public/js/toastr.min.js', 'public/js/angular.min.js', 'public/js/angular-route.min.js', 'public/js/angular-animate.min.js', 'public/js/angular-local-storage.min.js', 'public/js/ngFacebook.js', 'public/frontend/**/*.js' ],
					'public/js/socket.io.min.js': [ 'public/js/socket.io.js' ]
				}
			}
		},
		uglify: {
			options: {
				mangle: false,
				sourceMap: false,
				compress: true,
				report: 'gzip',
				drop_console: true
			},
			my_target: {
				files: {
					'public/js/forum.min.js': 'public/js/forum.min.js',
					'public/js/socket.io.min.js': 'public/js/socket.io.min.js'
				}
			}
		},
		jshint: {
			all: [ 'Gruntfile.js', 'public/frontend/**/*.js' ]
		},
		concurrent: {
			dev: {
				tasks: [ 'nodemon', 'watch' ],
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
					callback: function ( nodemon ) {
						// opens browser on initial server start
						nodemon.on( 'config:update', function () {
							// Delay before server listens on port
							require( 'open' )( 'http://localhost:8000' );
						} );
						// refreshes browser when server reboots
						nodemon.on( 'restart', function () {
							require( 'fs' )
								.writeFileSync( '.rebooted', 'rebooted' );
						} );
					}
				}
			}
		},
		watch: {
			scripts: {
				files: [ 'public/frontend/**/*.js' ],
				tasks: [ 'clean:js', 'concat:dev', 'jshint', 'uglify' ],
				options: {
					spawn: false,
					reload: true
				}
			},
			css: {
				files: [ 'public/css/*.css', '!public/css/*.min.css' ],
				tasks: [ 'clean:css', 'cssmin' ],
				options: {
					reload: true
				}
			},
			server: {
				files: [ '.rebooted' ],
				options: {
					livereload: true
				}
			}
		},
		clean: {
			js: [ 'public/js/forum.min.js', 'public/js/socket.io.min.js' ],
			css: [ 'public/css/style.min.css' ]
		}
	} );

	grunt.log.write( 'Grunt is running\n' );
	grunt.registerTask( 'default', [ 'clean:css', 'cssmin', 'clean:js', 'jshint', 'concat:js', 'uglify', 'concurrent' ] );
	grunt.registerTask( 'development', [ 'cssmin:combine', 'clean:js', 'jshint', 'concat:js', 'uglify' ] );
};
