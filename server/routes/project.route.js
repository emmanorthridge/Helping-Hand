const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");

const Project = require("../models/project.model");

router.post("/projects", (req, res) => {
    const { title, description } = req.body;
  
    Project.create({
      title,
      description,
      tasks: [],
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  module.exports = router;