const express = require("express");

const dbProject = require("./data/helpers/projectModel.js");
const dbAction = require("./data/helpers/actionModel.js");

const server = express();

const port = 9000;

server.get("/", (req, res) => {
    res.json("alive");
});

server.get("/api/projects", (req, res) => {
    dbProject.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({ error: "The Projects info could not be retrieved." });
        });
});

server.get("/api/projects/:id", (req, res) => {
    dbProject.get(req.params.id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The Projects info could not be retrieved." });
        });
});

server.get("/api/actions", (req, res) => {
    dbAction.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json({ error: "The Actions info could not be retrieved." });
        });
});

server.get("/api/actions/:id", (req, res) => {
    dbAction.get(req.params.id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            res.status(500).json({ error: "The Projects info could not be retrieved." });
        });
});

server.post("/api/projects", (req, res) => {
    let projData = req.body;
    if (!projData.name || !projData.description) {
        res.status(400).json({ error: "Please provide a name and description." });
    } else {
        projData = {
            completed: false,
            ...projData
        };
        dbProject.insert(projData)
            .then()
            .catch();
    }
});

server.listen(port, () => console.log(`API running on port ${port}`));