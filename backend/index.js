const express = require('express');
const connectDB = require('./db');
const customerRoute = require('./Routes/customerRoute');
const run = require('./task1');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use('/api/customers', customerRoute);

app.listen(PORT, async () => {
  try{
      await connectDB();
      console.log(`Server running on http://localhost:${PORT}`);
  }catch(error){
    console.error('Failed to start server : ', error);
  }
});

