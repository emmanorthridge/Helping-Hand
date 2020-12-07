const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");

const User = require("../models/user.model");


    router.put("/profile/:id", (req, res) => {
        const { id } = req.params;
        const { type, description, location, imageURL, firstName, lastName  } = req.body;
      
        // Check if the incoming id is a valid ObjectId type
        if (!mongoose.Types.ObjectId.isValid(id)) {
          res.status(400).json({ message: "Specified id is not valid" });
          return;
        }

  User.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.status(200).json({
        message: `Project with ${id} is updated successfully.`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });

  })

  router.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    console.log('hello', id)
    // if (!mongoose.Types.ObjectId.isValid({id})) {
    //   console.log('id is not valid');
    //   res.status(400).json({ message: "Specified id is not valid" });
    //   return;
    // }
    const id2 = id.substring(1);
    User.findOne({ _id: id2 })
    .then((profileDetails) => {
      console.log(profileDetails);
      res.status(200).json(profileDetails);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

});

  module.exports = router;

