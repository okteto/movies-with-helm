# Movies App with Helm

This example shows how to leverage [Okteto](https://github.com/okteto/okteto) to develop a Node.js + React Sample App directly in Kubernetes. The Node + React Sample App is deployed using a [Helm Chart](https://github.com/okteto/movies/tree/main/chart). It creates the following components:

- A *React* based front-end, using [webpack](https://webpack.js.org) as bundler and *hot-reload server* for development.
- A very simple Node.js API using [Express](https://expressjs.com).
- A [MongoDB](https://www.mongodb.com) database.

# Setup

## Okteto for running the application
Once the CodeSpace is running, open a terminal, and run `okteto login --token $TOKEN` to log in to your Okteto Cloud account. Ignore the warning

In the same terminal, run `okteto namespace create atd<insert your team number>-sussdorff` to activate your Okteto namespace and download your credentials. With this, you are ready to run any okteto (or kubernetes) command directly from your CodeSpace terminal. 

Last but not least you want to build and deploy the application using `okteto deploy --build`. This will first build the application from your current code (this is important.. It will used your saved code, not the one which you PUSHED to the repository), then deploy the application and make it available und the endpoint mentioned. Use the one without the /api to see the frontend.



## Playwright for our testing

Hit the F1 key to access the command pallet and then enter "Install Playwright". This will install playwright for you to use and create a bunch of folders. Just use the default checkboxes when asked.

Try out tests are running with `npx playwright test`. This will run all tests which are found in the "tests" folder. Currently this is one simple test, executed across three browser engines. 

### One browser engine 
As this is somewhat time consuming, for our development sessions we might only want to run it using chromium `npx playwright test --project=chromium`. Yet, as we are lazy and know for today, chromium is the only thing we want to verify on, let's change this generally in the playwright.config.ts

ACTION: Uncomment the other two browsers and verify you are only running one test.

### List reports
If you try to run npx playwright show-report you will realize that playwright can't open the localhost to display the report. This is due to the fact, that we running the coding environment not on your local machine but in the cloud. There are options around this, but there is a talk on playwright Thursday, so attend that workshop and ask how (and hopefully get an anwer ;-) ).

For our needs we will have the reports generate with a list. `npx playwright test --reporter=list` is your friend.

ACTION: Configure this in playwright.config.ts for general use. 

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

# Adding testing
To ensure we are not accidently reintroducing the bug in the backend which showed the same movies for watched and available to watch, we want to add an automated test to prevent regression to sneak up on us.
In order to do this we are going to leverage playwright right here in our codespaces environment.

Hit the F1 key to access the command pallet and then enter "Install Playwright". This will install playwright for you to use and create a bunch of folders. Just use the default checkboxes when asked.

Try out tests are running with `npx playwright test`. This will run all tests which are found in the "tests" folder. Currently this is one simple test, executed across three browser engines. 

## One browser engine 
As this is somewhat time consuming, for our development sessions we might only want to run it using chromium `npx playwright test --project=chromium`. Yet, as we are lazy and know for today, chromium is the only thing we want to verify on, let's change this generally in the playwright.config.ts

ACTION: Uncomment the other two browsers and verify you are only running one test.

## List reports
If you try to run npx playwright show-report you will realize that playwright can't open the localhost to display the report. This is due to the fact, that we running the coding environment not on your local machine but in the cloud. There are options around this, but there is a talk on playwright Thursday, so attend that workshop and ask how (and hopefully get an anwer ;-) ).

For our needs we will have the reports generate with a list. `npx playwright test --reporter=list` is your friend.

ACTION: Configure this in playwright.config.ts for general use. 




