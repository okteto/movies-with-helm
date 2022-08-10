const mongo = require("mongodb").MongoClient;

const url = `mongodb+srv://arsh4:ZJaOi0K2vYXvlw4F@cluster0.fojd8ak.mongodb.net/?retryWrites=true&w=majority`;

var insert = function (collection, data, resolve, reject) {
  const d = require(data);
  d.results.forEach((doc) => {
    doc._id = doc.id;
  });
  collection.insertMany(d.results, (err, r) => {
    if (err) {
      if (err.code != 11000) {
        return reject(err);
      }
    }

    resolve();
  });
}

function loadWithRetry() {
  mongo.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 300,
    socketTimeoutMS: 300,
  }, (err, client) => {
    if (err) {
      console.error(`Error connecting, retrying in 300 msec: ${err}`);
      setTimeout(loadWithRetry, 300);
      return;
    }

    var promises = [];
    db = client.db(process.env.MONGODB_DATABASE);
    promises.push(new Promise((resolve, reject) => {
      insert(db.collection('movies'), "./data/movies.json", resolve, reject);
    }));

    promises.push(new Promise((resolve, reject) => {
      insert(db.collection('watching'), "./data/watching.json", resolve, reject);
    }));

    Promise.all(promises)
      .then(function () {
        console.log('all loaded');
        process.exit(0);
      })
      .catch((err) => {
        console.error(`fail to load: ${err}`);
        process.exit(1);
      });
  });
};

loadWithRetry();
