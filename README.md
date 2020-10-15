# What's this project about?

This project aims to be an example application showing the Platform capabilities, as well as a starting project/boilerplate for your project, and a quick guide about how to build applications with Cells Platform.

## What it does contains?

- It showcases a functional sample apllication built with [LitElement](https://lit-element.polymer-project.org/) and declarative pages, using our latest stack (Cells Cli 3.0 & Cells Bridge), and it does cover: [application i18n](https://platform.bbva.com/en-us/developers/engines/cells/documentation/basic-features/components/components-in-depth/internationalization#content0), [data publication/subscription between pages](https://platform.bbva.com/en-us/developers/engines/cells/documentation/basic-features/application-state-management/channels), [routing](https://platform.bbva.com/en-us/developers/engines/cells/documentation/basic-features/routing/routes), data managers (mimic a real service!), and much more!

- Built entirely with components from [Cells Catalog](https://catalogs.platform.bbva.com/cells/) - BBVA Experience & Cells Architecture.

- If desired, a set of E2E functional tests for this application, built with Cells Pepino V2 ([WebdriverIO 5.0](https://v5.webdriver.io/)), and [Global QE Testing Framework](https://globaldevtools.bbva.com/bitbucket/projects/BGT/repos/e2e-js-framework/browse), that will serve as a boilerplate/starting point for your requirements and custom use cases.

To go deeper, please check our [Platform Documentation](https://platform.bbva.com/en-us/developers/engines/cells/documentation/getting-started/what-is-cells).

# CELLS (**cells-cli**)

**cells-cli** is the command line tool that provides you with common tasks and commands for working in a cells project.

## Installation

To install the application just run:

~~~sh
npm -g install @cells/cells-cli
~~~

Once installed, `cells` command will be available to you.

## Usage

When you execute `cells` will result in a menu like this:

~~~

Available Commands

  cells app:build                                Builds an application
  cells app:changelog                            Create a changelog of a Cells application
  cells app:create                               Creates an application with a minimum scaffolding
  cells app:e2e                                  Run E2E of a Cells application (Cells Pepino V1)
  cells app:install                              Installs applications dependencies
  cells app:lint                                 Static analysis for applications
  cells app:package                              Packages a web application into a Cells Cordova application
  cells app:serve                                Serves an application
  cells component:changelog                      Create a changelog of a Cells component
  cells component:create                         Creates the scaffolding of a Cells component from scratch.
  cells component:documentation                  Generates the documentation of a Cells component
  cells component:install                        Installs components dependencies
  cells component:lint                           Static analysis for components
  cells component:serve                          Serves a component
  cells component:test                           Test a component
  cells lit-component:create <name> <namespace>  Create a new LitElement WebComponent.
  cells lit-component:css:doc                    Generate the styling documentation.
                                                 Use the placeholder ##styling-doc in your README.md and <component-name>.js files.
  cells lit-component:serve                      Serve your LitElement WebComponent optimized
  cells lit-component:test:watch                 Watch test to run any specified tests when it sees changes in your component
  cells lit-component:test                       Test your LitElement WebComponent
~~~

where you can select one of the available operations.


## Usage

let's see in detail the more used cell commands

### <a name="app:build"></a>app:build

~~~
$ cells app:build
~~~

Generates a distribution of the application.

Parameters:

  --autoprefixerConfigFile  Path to JSON file containing autoprefixer configuration
                            [default: $CELLS_LITE_DIR/configs/autoprefixer.json]
  --config, -c              Filename of the config file allocated in 'app/config' folder
                            [string] [required] [choices: "composer-mock-local.json"]
  --hostname, -H            The hostname to serve from 
                            [string] [default: "localhost"]
  --lintConfigFile          Path to JSON file containing lint configuration
                            [default: $CELLS_LITE_DIR/configs/lint.json]
  --nobuild                 Flag to not build the application before serving it
                            [default: false]
  --port, -p                The port to serve from. If it is busy, then the port to serve from                              will be the next free port
                            [number] [default: "8001"]
  --build, -b               Specify which built app to serve
                            [string] [choices: "develop", "vulcanize", "novulcanize"] [default: "develop"]
  --nowatch                 Flag to not watch the application while serving it     


### <a name="app:create"></a>app:create

~~~
$ cells app:create
~~~

Creates the scaffolding of a Cells application.

The generator will ask you for the following:

? **Choose an App scaffold** (Answer by typing the choice number)
  1) Scaffold an example App based on Polymer 2 (Dynamic Pages)
  2) Scaffold an example App based on Polymer 2 (Declarative Pages)
  3) Scaffold an empty App based on Polymer 2 (Dynamic Pages)
  4) Scaffold an example App based on LitElement (Declarative Pages)

? **Do you want an E2E project to be created?** (Y/n) 

? **Choose mobile platforms if you want (Choosing one will create a mobile project)** (Answer by typing the choice number)

?**App name ...** 

The newly created application will create a folder taking the helloWorld template as scaffold  and will have the following structure:

~~~
project_name/
    .bowerrc
    .cellsrc
    .editorconfig
    .eslintignore
    .eslintrc.json
    .gitattributes
    .gitignore
    .piscosour    
    README.md
    app/
    bower.json
    browserslist
    components/
    mocks/
    node_modules/
    package.json
    package-lock.json
    sonar-project.properties
~~~

Parameters:
- **appName**: the name of the app to create. Required


### <a name="app:e2e"></a>app:e2e

~~~
$ cells app:e2e -u <url> -c <config_file>
~~~

Run the e2e tests with [Cell Pepino V1](https://platform.bbva.com/en-us/developers/engines/cells/documentation/testing/cells-pepino-v1-maintenance) legacy test runner on given url and given configuration file.

If you want to run e2e tests with [Cells Pepino V2](https://platform.bbva.com/en-us/developers/engines/cells/documentation/testing/cells-pepino-v2), you must install it as a dependency inside your e2e test project, and then, execute it from the root of your e2e project.

#### Installation (inside your e2e test project)

```shell
npm install @cells-pepino/cli
```

#### Execution (from the root of your e2e project)

```shell
./node_modules/@cells-pepino/cli/bin/cli.js -c ./config/wdio5.local.conf.js
```

or simply, through provided npm script in e2e scaffold project:

```shell
npm run test
```

Follow given documentation, and e2e project readme file for more information about how to do it.

__If you are going to run your e2e tests against a local application (you are hosting it in your local workspace), remember to serve it first__ - otherwise e2e test runner won't be able to run the tests against it - See more information about `cells app:serve` command above.

__REMEMBER! You must install all required npm dependencies first inside your E2E project__

```shell
npm install
```

Parameters:

- **url**: url for testing. Required
- **config_file**: javascript configuration file. This configuration must exists in the path `./app/config/{environment}.js`. Required.

**WARNING:**

To run the test yo must move on a e2e folder project. You can create it answer `Y' to the question
`Do you want an E2E project to be created? (Y/n)` in the creation app process.
See `cells app:create` above.


### <a name="app:serve"></a>app:serve

~~~
$ cells app:serve -c <environment_file>
~~~

Opens a server for a distribution type, with mocks/no mocks, and with a environment configuration.

Parameters:

- **type**: is the distribution type. Three possible values:
  - *novulcanize*: Generate a distribution no vulcanized in a new folder 'dist'.
  - *vulcanize*: Generate a distribution vulcanized in a new folder 'dist'.
  - *default*: Just generate temporal files likes css based in scss files.

- **environment_file**: is the configuration according environment type. This configuration must exists in the path `./app/config/{environment}.json`

- **mocks**: ask for open a server just for mocks. Values:
  - *mocks*: open the mocks server.
  - *nomocks*: Doesn't open the mocks server.

**WARNING:** To serve the test yo must be inside of a folder cells app. You can create it executing `cells app:create` and folowing its steps.
See `cells app:create` above.


### <a name="component:create"></a>component:create

~~~
$ cells component:create
~~~

Creates the scaffolding of a Cells component from scratch.

The component will have the following structure:

~~~
component-name/
    .editorconfig
    .gitignore
    README.md
    bower.json
    demo/
    index.html
    locales/
    test/
    component-name.html
    component-name.js
    component-name.scss
~~~

Parameters:
- **componentName**: must contain a hyphen

~~~

### <a name="component:serve"></a>component:serve

~~~
$ cells component:serve
~~~

This command serves your component locally, lints your javascript code and builds a polymer style component from your .scss files. It also watches for changes in your code to lint and build again when detected.

### <a name="component:lint"></a>component:lint

~~~
$ cells component:lint
~~~

Runs a lint validation on the source code of the component. It uses [ESLint](http://eslint.org/) as linter, applying a set of rules you can find in this [.eslintrc.json file](https://descinet.bbva.es/stash/projects/CTOOL/repos/cells-eslintrc/browse/.eslintrc.json).


### <a name="component:test"></a>component:test

~~~
$ cells component:test
~~~

Runs [web-component-tester](https://github.com/Polymer/web-component-tester) unit tests in the component. **If all the tests pass**, then it executes a code coverage analysis based on [istanbul](https://github.com/gotwarlost/istanbul).












