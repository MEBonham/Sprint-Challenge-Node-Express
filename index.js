const express = require("express");

const dbProject = require("./data/helpers/projectModel.js");
const dbAction = require("./data/helpers/actionModel.js");

const server = express();

server.use(express.json());

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
    const projData = req.body;
    if (!projData.name || !projData.description) {
        res.status(400).json({ error: "Please provide a name and description." });
    } else {
        newProject = {
            completed: false,
            ...projData
        };
        dbProject.insert(newProject)
            .then(project => {
                res.status(200).json(project);
            })
            .catch(err => {
                res.status(500).json({ error: "The Project could not be added." });
            });
    }
});

server.post("/api/actions", (req, res) => {
    const actData = req.body;
    if (!actData.project_id || !actData.description || !actData.notes) {
        res.status(400).json({ error: "Please provide a description, notes, and a project ID." });
    } else if (actData.description.length > 128) {
        res.status(400).json({ error: "Description is limited to 128 characters." });
    } else {
        newAction = {
            completed: false,
            ...actData
        };
        dbAction.insert(newAction)
            .then(action => {
                res.status(200).json(action);
            })
            .catch(err => {
                res.status(500).json({ error: "The Action could not be added." });
            });
    }
});

server.delete("/api/projects/:id", (req, res) => {
    dbProject.remove(req.params.id)
        .then(count => {
            if (count) {
                res.status(200).json({ message: `${count} project(s) deleted.` });
            } else {
                res.status(404).json({ error: "The project with that ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The project could not be deleted." });
        });
});

server.delete("/api/actions/:id", (req, res) => {
    dbAction.remove(req.params.id)
        .then(count => {
            if (count) {
                res.status(200).json({ message: `${count} action(s) deleted.` });
            } else {
                res.status(404).json({ error: "The action with that ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The action could not be deleted." });
        });
});

server.put("/api/projects/:id", (req, res) => {
    let modProject = req.body;
    dbProject.get(req.params.id)
        .then(oldProject => {
            modProject = {
                name: oldProject.name,
                description: oldProject.description,
                completed: oldProject.completed,
                ...modProject
            };
            console.log("test flag", modProject);
            dbProject.update(req.params.id, modProject)
                .then(project => {
                    res.status(200).json(project);
                })
                .catch(err => {
                    res.status(500).json({ error: "The project could not be modified." });
                });
        })
        .catch(err => {
            res.status(404).json({ error: "The project with that ID does not exist." });
        });
});

server.listen(port, () => console.log(`API running on port ${port}`));