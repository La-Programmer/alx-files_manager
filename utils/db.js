const {MongoClient} = require('mongodb');
require('dotenv').config();

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST;
    this.port = process.env.DB_PORT;
    this.db == process.env.DB_DATABASE;
    this.url = `mongodb://${this.host}:${this.port}`
    this.client = new MongoClient(this.url);
    this.client.connect()
      .then(() => {
        this.db = this.client.db(this.db);
      })
      .catch((err) => {
        console.log(`Error connecting to MongoDB: ${err}`);
      });
  }

  isAlive() {
    try {
      this.client.connect();
      return true;
    } catch (error) {
      return false
    }
  }

  async nbUsers() {
    const collection = this.db.collection('users');
    const documentNo = await collection.countDocuments();
    return documentNo;
  }

  async nbFiles() {
    const collection = this.db.collection('files');
    const documentNo = await collection.countDocuments();
    return documentNo;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
