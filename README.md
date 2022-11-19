# Movies App with Helm

This example shows how to leverage [Okteto](https://github.com/okteto/okteto) to develop a Node.js + React Sample App directly in Kubernetes. The Node + React Sample App is deployed using a [Helm Chart](https://github.com/okteto/movies/tree/main/chart). It creates the following components:

- A *React* based front-end, using [webpack](https://webpack.js.org) as bundler and *hot-reload server* for development.
- A very simple Node.js API using [Express](https://expressjs.com).
- A [MongoDB](https://www.mongodb.com) database.

Once the CodeSpace is running, open a terminal, and run `okteto context --token $TOKEN` to log in to your Okteto Cloud account.

In the same terminal, run `okteto namespace` to activate your Okteto namespace and download your credentials. With this, you are ready to run any okteto (or kubernetes) command directly from your CodeSpace terminal. 

Last but not least you want to build and deploy the application using `okteto deploy --build`. This will first build the application from your current code (this is important.. It will used your saved code, not the one which you PUSHED to the repository), then deploy the application and make it available und the endpoint mentioned. Use the one without the /api to see the frontend.


# Do our first change in development
Okteto allows you to write your changes in codespaces and very quickly see the results. In order to do this run `okteto up` and as we want to fix a bug in the backend, choose the api for watching.

Once it states that the server is running, check that your movie system is still the same. As you will realize, the movies and the # watching section are the same. This is not what is wanted. You can fix this by looking at [api/server.js](api/server.js).

The error lies with the watching endpoint of the API, so go ahead and look for `/api/watching` in the file. In there (line 43) you will see that it is querying the "movies" db collection, yet we need "watching". so change movies to watching and save the file. 

Look at your terminal to see what it does. You will realize that it is restarting due to changes (which you just saved) and then has the server running again. Check the result on the Preview website.

Congratulations you made your first change in development. As it does what we want it to do, go ahead and commit your change. You can commit by clicking on the icon below the spy glass on the left side, enter a commit message which states what you did (and ideally why so a colleage will understand) and then hit commit.

# Frontend change
In your movies application you see the heading "Movies" and Continue watching for Cindy". This is nice, but might be misleading, as the movies are actually movies Cindy has not watched yet. Therefore your next step is to make that explicit.

## Acceptance Criteria
* It is shown who the person is who has not watched these movies.

## Change 
The file to change can be found in [frontend/src/App.jsx](frontend/src/App.jsx) and you can search for "Continue watching" to find a hint how you could the heading for the movies. Make your change and test it manually.

--------

You will realize nothing has changed. This is due to the fact, that only the backend is currently observed and automatically deployed, not the frontend.
Therefore we open a second terminal window and run `okteto up` again. Choose frontend now and wait for it to get it pulled and deployed.