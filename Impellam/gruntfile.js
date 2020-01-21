
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        

        watch: {
            sass: {
                
                files: ['assets/sass/*.scss'],
                tasks: ['sass'],
            }
        },

        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'assets/css/main.css': 'assets/sass/main.scss',       // 'destination': 'source'
                }
            }
        },

        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['assets/js/jquery-3.3.1.min.js',
                      'assets/js/jquery-ui.min.js',
                      'assets/js/bootstrap.min.js',
                      'assets/js/bootstrap-select.js',
                      'assets/js/moment.js',
                      'assets/js/bootstrap-datepicker.min.js',
                      'assets/js/jquery.dataTables.js',
                      'assets/js/dataTables.responsive.min.js',
                      'assets/js/dataTables.bootstrap.min.js',
                      'assets/js/responsive.bootstrap.min.js',
                      'assets/js/calendar.js'
                    ],

                dest: 'assets/js/main.js'
            },
            // dist: {
            //     src: ['assets/css/dataTables.bootstrap.min.css',
            //           'assets/css/jquery.dataTables.min.css',
            //           'assets/css/responsive.bootstrap.min.css',
            //           'assets/css/custom.css'
            //     ],

            //     dest: 'assets/css/main.css',
            // },
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            build: {
                src: 'assets/js/main.js',
                dest: 'assets/js/main.min.js'
            },
        },
        autoprefixer: {
            options: {
                browsers: ['opera 12', 'ff 15', 'chrome 25'] // Task-specific options go here.
            },
            single_file: {
                src: 'assets/css/main.css',
                dest: 'assets/css/main.css'// Target-specific file lists and/or options go here.
            },
           
        },
        cssmin: {
            options: {
              mergeIntoShorthands: false,
              roundingPrecision: -1
            },
            target: {
              files: {
                'assets/css/main.min.css': 'assets/css/main.css'
              }
            }
          }
    });
        
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'concat','autoprefixer','cssmin', 'uglify', 'watch']);
};