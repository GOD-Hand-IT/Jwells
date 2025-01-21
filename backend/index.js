import cors from 'cors'
import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import client from './db/db.js';


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


const port = process.env.PORT;
const server = express();


server.use(cors());
server.use(express.json());


server.listen(port, (req, res) => {
  console.log("Server running on port " + port);
});

mongoose.connect
