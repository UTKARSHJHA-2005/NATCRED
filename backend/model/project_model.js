const mongoose = require("mongoose");

// Define the Project schema
const projectSchema = new mongoose.Schema({
  title: {type: String, required: true, trim: true},
  owner: {type: String, required: true, trim: true},
  amountGot: {type: String, required: true, trim: true},
  description: {type: String, required: true, trim: true},
  amountRaised: {type: String, required: true, trim: true},
  contributors: {type: Number, required: true, min: 0},
  image: {type: String, required: true},
});

// Create the Project model
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
