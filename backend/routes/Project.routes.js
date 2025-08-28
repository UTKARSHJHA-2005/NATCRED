import express from "express"
import { createProject, getProjects,getSingleReport,deleteProject, getcontribute, dashboard } from "../controllers/Project.controller.js"

const router=express.Router()
router.get("/",getProjects)
router.get("/dashboard",dashboard)
router.post("/",createProject)
router.post("/:id/contribute",getcontribute)
router.delete('/:id', deleteProject);
router.get("/:id",getSingleReport)

export default router;