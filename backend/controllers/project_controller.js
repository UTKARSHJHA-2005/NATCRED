import Project from "../model/project_model.js";
import User from "../model/user_model.js"; 

export const createProject = async (req, res) => {
    try {
        const { title, amountGot, description, amountRaised, contributors, image } = req.body;
        const ownerId = req.id; 
        if (!title || !amountGot || !description || !amountRaised || !image) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const user = await User.findById(ownerId);
        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false });
        }
        const project = await Project.create({
            title,
            owner: ownerId, 
            amountGot,
            description,
            amountRaised,
            contributors: contributors || 0,
            image,
        });
        user.projects.push(project._id);
        await user.save();
        return res.status(201).json({
            message: "Project created successfully",
            project,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate("owner", "username email profilePicture").sort({ createdAt: -1 });
        return res.status(200).json({ projects, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate("owner", "username email profilePicture");
        if (!project) {
            return res.status(404).json({ message: "Project not found", success: false });
        }
        return res.status(200).json({ project, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const getUserProjects = async (req, res) => {
    try {
        const userId = req.id; 
        const projects = await Project.find({ owner: userId }).populate("owner", "username email profilePicture");
        return res.status(200).json({ projects, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found", success: false });
        }

        return res.status(200).json({
            message: "Project updated successfully",
            updatedProject,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found", success: false });
        }
        await User.findByIdAndUpdate(project.owner, { $pull: { projects: project._id } });
        await project.deleteOne();
        return res.status(200).json({ message: "Project deleted successfully", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};