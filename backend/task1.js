const csv = require('csvtojson');
const path = require('path');
const connectDB = require('./db');

const usersCSV = path.join(__dirname, 'users.csv');
const ordersCSV = path.join(__dirname, 'orders.csv');

async function loadCSVtoMongo(csvFilePath, collection){
  try{
    const jsonArray = await csv().fromFile(csvFilePath);
    const result = await collection.insertMany(jsonArray);
    console.log(`Inserte ${result.insertedCount} into ${collection.collectionName}`);
  }catch(err){
    console.log(err);
  }
}

async function run(){

  try{
    const db = await connectDB();
    const usersCollection = db.collection('users');
    const ordersCollection = db.collection('orders');
    
    await loadCSVtoMongo(usersCSV, usersCollection);
    await loadCSVtoMongo(ordersCSV, ordersCollection);

    console.log('Orders load successfully');

  }catch(error){
    console.error('Failed to start server : ', error);
  }
      
}

module.exports = run;
