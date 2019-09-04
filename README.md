## Introduction

Home of site, template and page specific javascript for the Baltimore County [website](https://www.baltimorecountymd.gov/). Allows developers to use modern javascript to generate cross browser compatible files.

## Getting Started

1. Clone the repository - `git clone https://github.com/baltimorecounty/dotgov-javascript.git`
2. `npm install`

## Development

1. Determine whether your script is `site`, `template` or `page-specific`
2. Based on your decision in #1 add your new files to the corresponding folder in `src`
    - **{file}.js** - The actual script you are developing
    - **{fileName}.md** - Adds documentation for your script
    - **{fileName}.test.js** - Unit and/or Integration tests for your script
3. Go the `webpack.config.js` file and add a friendly name for your script to the `entry`. Reference the path `js` file from step 2, to generate your file during the build process

### Demo

```npm start```

In order to test your scripts it is recommended you create a local demo in the `dist/demos` folder. That file should reference a built js file. To make it easier to access your demo, add it to the list of demo pages in the `dist/demos/index.html` file.

### Other Development Notes

Since we still support IE11 it is possible we will need to include some polyfills. It is recommended that you import these polyfills so that they are included in our scripts. If we find that some polyfills are being included over and over again, we can add a site or template wide polyfill. Otherwise, the polyfill required should be included in your script.

We are using axios AJAX. In order to ensure this work we are polyfilling this, which can be found in `./src/lib/axios.js`. By importing this file, the polyfill is automatically handled.


## Build and Test

### ```npm test```

We are using [Jest](https://jestjs.io/) and [dom-testing-library](https://github.com/testing-library/dom-testing-library) for testing. Each file should contain at least one test to verify it's functionality. More than one test is welcomed, but we don't need to go overboard.

If a bug is found, if possible its good to try and create a test that confirms the bug, so we can fix it, and test for it in the future.

### ```npm run-script build```

We are using [webpack](https://webpack.js.org/) to build our cross browser compatible scripts. They will be exported to the `dist` folder.
