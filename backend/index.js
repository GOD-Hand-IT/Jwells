import cors from 'cors'
import express from "express";
const port = 3000;
const server = express();


server.use(cors());
server.use(express.json());


server.listen(port, (req, res) => {
  console.log("Server running on port " + port);
});
