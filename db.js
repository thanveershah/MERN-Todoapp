const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  process.env.DB_API,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) throw err;
    console.log("Database connected");
    db.close();
  }
);
