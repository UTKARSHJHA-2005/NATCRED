import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    Fund:{
        type: Number,
        required: true,
    },
    CarbonCredits:{
        type: Number,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    contributors: [
        {
            name: String,
            createdAt: {
                type: Date,
                default: Date.now,
            },
            carboncredit: Number,
            Value: Number,
        },
    ],
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
