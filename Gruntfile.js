module.exports = function (grunt) {

	/**
	 * Initialize grunt
	 */
	grunt.initConfig({

		/**
		 * Read package.json
		 */
		pkg: grunt.file.readJSON('package.json'),


		/**
		 * Set banner
		 */
		banner: '/**\n' +
		'<%= pkg.title %> - <%= pkg.version %>\n' +
		'<%= pkg.homepage %>\n' +
		'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
		'License: <%= pkg.license %>\n' +
		'*/\n',


		dir: {
			dist_frontend: 'dist/public',
			dist_backend: 'dist/server',
			dist_applications: 'dist/server/filesystem/bin/applications',
			dev_frontend: 'src/frontend',
			dev_backend: 'src/backend',
			dev_applications: 'src/applications/__compiled'
		},

		jshint: {
			gruntfile: 'Gruntfile.js',
			files: ['<%= dir.dev_frontend %>/js/main.js', '<%= dir.dev_frontend %>/js/src/**/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		concat: {
			options: {
				stripBanners: true,
				banner: '<%= banner %>'
			},
			main: {
				src: '<%= jshint.files %>',
				dest: '<%= dir.dist_frontend %>/js/main.js'
			},
			vendor_css: {
				dest: '<%= dir.dist_frontend %>/css/vendor.css',
				src: [
					'node_modules/normalize.css/normalize.css',
					'bower_components/jquery-ui/themes/base/jquery-ui.css',
					'node_modules/font-awesome/css/font-awesome.min.css',
					'node_modules/bootstrap/dist/css/bootstrap.css',
					'node_modules/xterm/dist/xterm.css',
					'node_modules/codemirror/lib/codemirror.css',
					'node_modules/angular-toastr/dist/angular-toastr.min.css',
					'node_modules/angular-ui-switch/angular-ui-switch.css',
					'<%= dir.dev_frontend %>/css/vendor/wmks.min.css'
				]
			},
			vendor_js: {
				dest: '<%= dir.dist_frontend %>/js/vendor.js',
				src: [
					'node_modules/jquery/dist/jquery.min.js',
					'bower_components/jquery-ui/jquery-ui.min.js',
					'node_modules/masonry-layout/dist/masonry.pkgd.min.js',
					'node_modules/peity/jquery.peity.min.js',
					'node_modules/sparkline/lib/sparkline.js',
					'node_modules/xterm/dist/xterm.js',
					'node_modules/xterm/dist/addons/fit/fit.js',
					'node_modules/codemirror/lib/codemirror.js',
					'<%= dir.dev_frontend %>/js/vendor/wmks.min.js',
					'node_modules/angular/angular.js',
					'node_modules/angular-bootstrap-contextmenu/contextMenu.js',
					'node_modules/angular-socket-io/socket.js',
					'node_modules/angular-toastr/dist/angular-toastr.tpls.js',
					'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
					'node_modules/angular-ui-codemirror/src/ui-codemirror.js',
					'node_modules/angular-uuid/angular-uuid.js',
					'node_modules/ng-file-upload/dist/ng-file-upload-shim.js',
					'node_modules/ng-file-upload/dist/ng-file-upload.js',
					'node_modules/oclazyload/dist/ocLazyLoad.min.js',
					'bower_components/ngSelectable/src/ngSelectable.js'
				]
			}
		},


		/*
    sass: {

      // Development options
      dev: {
        options: {
          style: 'expanded',
          // sourcemap: true, // Requires Sass 3.3.0 alpha: `sudo gem install sass --pre`
          trace: true,
          debugInfo: true
        },
        files: {
          '<%= dir.css %>/<%= pkg.name %>.css': '<%= dir.sass %>/global.scss'
        }
      },

      // Distribution options
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= dir.css %>/<%= pkg.name %>.css': '<%= dir.sass %>/global.scss'
        }
      }
    },
*/

		uglify: {

			// Uglify options
			options: {
				banner: '<%= banner %>'
			},

			// Minify js files in js/src/
			dist: {
				src: ['<%= concat.main.dest %>'],
				dest: '<%= dir.dist_frontend %>/js/main.min.js'
			}
		},

		clean: {
			frontend: '<%= dir.dist_frontend %>',
			backend: '<%= dir.dist_backend %>',
			apps: '<%= dir.dist_backend %>/filesystem/bin/applications'
		},

		copy: {
			frontend: {
				expand: true,
				dot: true,
				cwd: '<%= dir.dev_frontend %>',
				dest: '<%= dir.dist_frontend %>',
				src: [
					'*.{ico,png}',
					'*.html',
					'css/main.css',
					'img/{,*/}*.*'
				]
			},
			fonts: {
				expand: true,
				cwd: 'node_modules/font-awesome/fonts/',
				src: ['**/*'],
				dest: '<%= dir.dist_frontend %>/fonts/'
			},
			backend: {
				expand: true,
				dot: true,
				cwd: '<%= dir.dev_backend %>',
				dest: '<%= dir.dist_backend %>',
				src: '{,*/}*{,*/}*'
			},
			applications: {
				expand: true,
				dot: true,
				cwd: '<%= dir.dev_applications %>',
				dest: '<%= dir.dist_applications %>',
				src: '{,*/}*{,*/}*'
			}
		}

	});

	grunt.registerTask("prepareApplications", "Finds and prepares modules for concatenation.", function() {
		var concat_apps = {};

		// get all module directories
		grunt.file.expand('src/applications/*').forEach(function (dir) {

			// get the module name from the directory name
			var dirName = dir.substr(dir.lastIndexOf('/')+1);

			if (dirName === "__compiled") return;

			// create a subtask for each module, find all src files
			// and combine into a single js file per module
			concat_apps['src/applications/__compiled/application__' + dirName + '.min.js'] = [dir + '/init.js', dir + '/**/*.js'];
		});

		// get the current concat object from initConfig
		var concat = grunt.config.get('concat') || {};
		concat.applications = {};

		// create a subtask for each module, find all src files
		// and combine into a single js file per module
		concat.applications.files = concat_apps;

		// add module subtasks to the concat task in initConfig
		grunt.config.set('concat', concat);
	});


	/**
	 * Default Task
	 * run `grunt`
	 */
	grunt.registerTask('compileFrontend', [
		'clean:frontend',
		'copy:frontend',
		'copy:fonts',
		//'jshint',
		'concat:main',
		'concat:vendor_css',
		'concat:vendor_js',
		'uglify'
		//'sass:dev',
	]);

	grunt.registerTask('compileBackend', [
		'clean:backend',
		'copy:backend',
		'copy:applications'
	]);

	grunt.registerTask('compileApplications', [
		'prepareApplications',
		'concat:applications',
		'copy:applications'
	]);

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');

};
