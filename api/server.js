const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const url = `mongodb://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_HOST}:27017/admin`;

let db;

async function startWithRetry() {
  try {
    const client = new MongoClient(url, { 
      connectTimeoutMS: 1000,
      socketTimeoutMS: 1000,
    });
    
    await client.connect();
    console.log("Connected to MongoDB successfully");
    
    db = client.db(process.env.MONGODB_DATABASE);

    app.listen(8080, () => {
      app.get("/api/healthz", (req, res, next) => {
        res.sendStatus(200);
      });

      app.get("/api/movies", async (req, res, next) => {
        console.log(`GET /api/movies`);
        try {
          const results = await db.collection('movies').find().toArray();
          res.json(results);
        } catch (err) {
          console.log(`failed to query movies: ${err}`);
          res.json([]);
        }
      });

      app.get("/api/watching", async (req, res, next) => {
        console.log(`GET /api/watching`);
        try {
          const results = await db.collection('watching').find().toArray();
          res.json(results);
        } catch (err) {
          console.log(`failed to query watching: ${err}`);
          res.json([]);
        }
      });

      console.log("Server running on port 8080.");
    });

    app.get("/api", (req, res, next) => {
      res.sendStatus(418);
    });
    
  } catch (err) {
    console.error(`Error connecting, retrying in 1 sec: ${err}`);
    setTimeout(startWithRetry, 1000);
  }
}

startWithRetry();
