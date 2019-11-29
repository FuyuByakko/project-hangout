# EvenTrip (With Caching)

This is a slightly modified vesion of the original app called EvenTrip.

The full details of the original app can be found at the ![EvenTrip project page](https://github.com/cc-project-hangout/project-hangout)

This Version add a simple in-memory key-value store which acts as a cache.
For more details on the cache see the ![Project hangout cache page](https://github.com/FuyuByakko/hangout-cache)

![Logo](src/assets/logo_name_black.png?raw=true)

## Available Scripts

In the project directory, you can run:

### `yarn`

Installs dependencies written in `package.json` file.

Make sure to add a .env file with the API keys.

***PRODUCTION Build***
### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
Your app is ready to be deployed!

### `yarn start`

Runs the app server without hot-reloading.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

***DEVELOPMENT Build***
### `yarn dev`

Builds the app for development.<br />
Hot-reloading enabled.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Proxy is setup to connect to the back-end server running with the below command.

### `yarn serve`

Runs the app server in DEVELOPMENT mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.
Hot-reloading enabled.

The page will reload if you make edits.<br />

## Future Features

Possibly move the business and API-call logic to the same GoLang-based server, to reduce the time.
Add concurrency to cache reading and writing.
Add a load balancer and serveral instances of the cache to speed up multiple request handling.
Add a backup Database

## Deployment

Please use this link access our deployed version: http://eventrip-ch.herokuapp.com/
