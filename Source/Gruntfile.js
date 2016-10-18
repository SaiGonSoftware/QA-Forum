module.exports = function (grunt) {
    grunt.initConfig({
        cssmin: {
            combine:{
                files:{
                    'public/css/web-style.min.css':['public/css/*.css', '!css/*.min.css']
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
                    'public/js/jquery-app.min.js':['public/js/jquery.min.js', 'public/js/bootstrap.min.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.log.write('Grunt is running\n');
    grunt.registerTask('default',['cssmin','uglify']);
};