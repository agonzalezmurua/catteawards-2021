import { MongoClient } from "mongodb";

// Database Name
const dbName = "2020";
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.skymo.mongodb.net/${dbName}?retryWrites=true&w=majority`;

/** @type {import('mongodb').MongoClient} */
let cachedClient = null;
/** @type {import('mongodb').Db} */
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export const DatabaseClient = {
  /**
   * Stores the anwsers of a given user on DB
   * @param {string} email User's identifier
   * @param {Record<string, string>} choices User's choices
   */
  sendChoices: async (email, choices) => {
    const { db } = await connectToDatabase();
    const collection = db.collection("answers");

    await collection.insertOne({ email: email, choices: choices });
  },
  /**
   * @param {String} email
   */
  didAnswer: async (email) => {
    const { db } = await connectToDatabase();
    const collection = db.collection("answers");

    const found = await collection.findOne({ email: email });

    return found !== undefined;
  },
};
