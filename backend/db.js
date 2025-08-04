const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'ecommerce';

const client = new MongoClient(uri);

async function connectDB(){
  try{
    await client.connect();
    console.log('Connected to mongoDB');
    
    const db = client.db(dbName);
    return db;
  }catch(err){
    console.error('Mongodb connection error: ', err);
    process.exit(1);
  }
}

module.exports = connectDB;
