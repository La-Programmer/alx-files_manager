const redis = require('redis');

class RedisClient {
   constructor() {
    this.client = redis.createClient();
    this.connection = this.client.connect();
    this.client.on('error', (err) => {
      console.log(`Error connecting to redis: ${err}`);
    });
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (error) {
     throw error; 
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, {EX: duration});
    } catch (error) {
      throw error;
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      throw error;
    }
  }
};

const redisClient = new RedisClient();
module.exports = redisClient;
