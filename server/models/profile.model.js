const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
});


module.exports = model("Profile", profileSchema);