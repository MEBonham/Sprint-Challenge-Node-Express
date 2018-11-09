const express = require("express");

const dbProject = require("./data/helpers/projectModel.js");
const dbAction = require("./data/helpers/actionModel.js");

const server = express();

const port = 9000;

server.get("/", (req, res) => {
    res.json("alive");
});

server.listen(port, () => console.log(`API running on port ${port}`));