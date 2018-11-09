const express = require("express");

const serverFile = require("./api/server.js");
const dbProject = require("./data/helpers/projectModel.js");
const dbAction = require("./data/helpers/actionModel.js");

const server = express();

const port = 9000;

server.use(express.json());

server.get("/", (req, res) => {
    res.json("alive");
});

serverFile.listen(port, () => console.log(`API running on port ${port}`));