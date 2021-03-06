'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super-duper ' + chalk.red('Es6LibraryBoilerplate') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'user',
      message: 'What is your github username/organization? (eg. thejameskyle)'
    }, {
      type: 'input',
      name: 'repo',
      message: 'What is your repo/projects name? (eg. my-module)'
    }, {
      type: 'input',
      name: 'description',
      message: 'What is a description of this project? (eg. A nice module.)'
    }, {
      type: 'input',
      name: 'author',
      message: 'Who is the author of this project? (eg. James Kyle <james@example.com>)'
    }, {
      type: 'input',
      name: 'global',
      message: 'What would you like the global to be (in browsers)? (eg. MyModule)'
    }];

    this.prompt(prompts, function (props) {
      this.user = props.user;
      this.repo = props.repo;
      this.description = props.description;
      this.author = props.author;
      this.global = props.global;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.template('jshintrc', '.jshintrc');
      this.template('travis.yml', '.travis.yml');
      this.template('_package.json', 'package.json');
      this.template('LICENSE.md', 'LICENSE.md');
      this.template('README.md', 'README.md');
      this.template('gulpfile.js', 'gulpfile.js');
      this.mkdir('config');
      this.template('config/index.json', 'config/index.json');
      this.mkdir('src');
      this.template('src/index.js', 'src/' + this.repo + '.js');
      this.mkdir('test');
      this.template('test/jshintrc', 'test/.jshintrc');
      this.template('test/runner.html', 'test/runner.html');
      this.mkdir('test/setup');
      this.template('test/setup/browserify.js', 'test/setup/browserify.js');
      this.template('test/setup/node.js', 'test/setup/node.js');
      this.template('test/setup/setup.js', 'test/setup/setup.js');
      this.mkdir('test/unit');
      this.template('test/unit/index.js', 'test/unit/' + this.repo + '.js');
    }
  },

  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install']
    });
  }
});
