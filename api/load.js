const { MongoClient } = require("mongodb");

const url = `mongodb://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_HOST}:27017/admin`;

async function insertData(collection, dataFile) {
  const data = require(dataFile);
  data.results.forEach((doc) => {
    doc._id = doc.id;
  });
  
  try {
    await collection.insertMany(data.results);
    console.log(`Inserted ${data.results.length} documents from ${dataFile}`);
  } catch (err) {
    if (err.code !== 11000) { // Ignore duplicate key errors
      throw err;
    }
    console.log(`Some documents from ${dataFile} already exist, skipping duplicates`);
  }
}

async function loadWithRetry() {
  try {
    const client = new MongoClient(url, { 
      connectTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    
    await client.connect();
    console.log("Connected to MongoDB successfully");
    
    const db = client.db(process.env.MONGODB_DATABASE);
    
    await Promise.all([
      insertData(db.collection('movies'), "./data/movies.json"),
      insertData(db.collection('watching'), "./data/watching.json")
    ]);
    
    console.log('All data loaded successfully');
    await client.close();
    process.exit(0);
    
  } catch (err) {
    console.error(`Error connecting, retrying in 300 msec: ${err}`);
    setTimeout(loadWithRetry, 300);
  }
}

loadWithRetry();
