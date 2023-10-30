# Movies App with Helm

This example shows how to leverage [Okteto](https://github.com/okteto/okteto) to develop a Node.js + React Sample App directly in Kubernetes. The Node + React Sample App is deployed using a [Helm Chart](https://github.com/okteto/movies/tree/main/chart). It creates the following components:

- A *React* based front-end, using [webpack](https://webpack.js.org) as bundler and *hot-reload server* for development.
- A very simple Node.js API using [Express](https://expressjs.com).
- A [MongoDB](https://www.mongodb.com) database.

## Tutorial

- Deploy https://github.com/okteto/movies-with-helm in a namespace called `integration`
- Deploy this brnach in your personal namespace

Note that only frontend is deployed, but it talks to the api in `integration` without changing the service discovery logic