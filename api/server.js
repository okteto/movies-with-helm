const express = require("express");
const mongo = require("mongodb").MongoClient;

const app = express();

const url = `mongodb+srv://arsh4:ZJaOi0K2vYXvlw4F@cluster0.fojd8ak.mongodb.net/?retryWrites=true&w=majority`;

function startWithRetry() {
  mongo.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 1000,
    socketTimeoutMS: 1000,
  }, (err, client) => {
    if (err) {
      console.error(`Error connecting, retrying in 1 sec: ${err}`);
      setTimeout(startWithRetry, 1000);
      return;
    }

    const db = client.db(process.env.MONGODB_DATABASE);

    app.listen(8080, () => {
      app.get("/api/healthz", (req, res, next) => {
        res.sendStatus(200)
        return;
      });

      app.get("/api/movies", (req, res, next) => {
        console.log(`GET /api/movies`)
        db.collection('movies').find().toArray((err, results) => {
          if (err) {
            console.log(`failed to query movies: ${err}`)
            res.json([]);
            return;
          }
          res.json(results);
        });
      });

      app.get("/api/search", (req, res, next) => {
        const query = req.query.q;
        console.log(`GET /api/movies`)
        const agg = [
          { $search: { autocomplete: { query: query, path: "original_title" } } },
          { $limit: 20 },
        ];
        db.collection('movies').aggregate(agg).toArray((err, results) => {
          if (err) {
            console.log(`failed to query movies: ${err}`)
            res.json([]);
            return;
          }
          res.json(results);
        });
      });

      console.log("Server running on port 8080.");
    });
  });
};

startWithRetry();
