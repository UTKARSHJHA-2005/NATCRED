import Project from "../model/Project.model.js";

export const getProjects = async (req, res) => {
  try {
    const project = await Project.find({}).sort({ CarbonCredits: -1 });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching projects" });
  }
};

export const createProject = async (req, res) => {
  try {
    const { image, title, content, author,Fund,CarbonCredits } = req.body;
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  }catch(err){
    res.status(500).json({message:"Server error while creating project",err})
  }
}

export const getSingleReport = async (req, res) => {
  try {
    const project= await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const deleteProject=async(req,res)=>{
  const { id } = req.params;
  const report = await Project.findByIdAndDelete(id);
  if (!report) {
    throw new ErrorHandling('Report not found', 404);
  }
  return res.status(200).json({
    status: 'success',
    message: 'Report deleted successfully',
  });
}

export const getcontribute=async(req,res)=>{
  try {
    const { id } = req.params;
    const { name, carboncredit, Value } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    project.contributors.push({
      name,
      carboncredit,
      Value,
    });

    await project.save();

    res.json({ success: true, project });
  } catch (err) {
    console.error("Error adding contributor:", err);
    res.status(500).json({ success: false, error: "Failed to add contributor" });
  }
}

export const dashboard=async(req,res)=>{
  try {
    const { userName } = req.query; 
    const projects = await Project.find({
      $or: [
        { "author": userName },            
        { "contributors.name": userName }       
      ]
    });

    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}