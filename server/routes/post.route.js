const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");

const Post = require("../models/post.model");
// const User = require ("../models/user.model");

router.post("/posts", (req, res) => {
    const { text } = req.body;
  
    Post.create({
      text,
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  module.exports = router;