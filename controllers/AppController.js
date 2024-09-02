const redis = require('../utils/redis');
const db = require('../utils/db');
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  static getStatus = async (req, res) => {
    const redisAlive = await redisClient.isAlive();
    const dbAlive = await dbClient.isAlive();

    res.json({
      redis: redisAlive,
      db: dbAlive
    })
  };

  static getStats = async (req, res) => {
    const users = await db.nbUsers();
    const files = await db.nbFiles();
    res.json({users: users, files: files});
  };
}

module.exports = AppController;
