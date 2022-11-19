# Movies App with Helm

This example shows how to leverage [Okteto](https://github.com/okteto/okteto) to develop a Node.js + React Sample App directly in Kubernetes. The Node + React Sample App is deployed using a [Helm Chart](https://github.com/okteto/movies/tree/main/chart). It creates the following components:

- A *React* based front-end, using [webpack](https://webpack.js.org) as bundler and *hot-reload server* for development.
- A very simple Node.js API using [Express](https://expressjs.com).
- A [MongoDB](https://www.mongodb.com) database.

Once the CodeSpace is running, open a terminal, and run `okteto context --token $TOKEN` to log in to your Okteto Cloud account.

In the same terminal, run `okteto namespace` to activate your Okteto namespace and download your credentials. With this, you are ready to run any okteto (or kubernetes) command directly from your CodeSpace terminal. 

Last but not least you want to build and deploy the application using `okteto deploy --build`. This will first build the application from your current code (this is important.. It will used your saved code, not the one which you PUSHED to the repository), then deploy the application and make it available und the endpoint mentioned. Use the one without the /api to see the frontend.
