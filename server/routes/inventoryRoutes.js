const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET: Fetch all projects for the portfolio site
router.get('/public-projects', async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

// POST: Add a new project from your Admin Dashboard Panel
router.post('/add-project', async (req, res, next) => {
  try {
    const { title, category, imageUrl, description } = req.body;
    if (!title || !category || !imageUrl) {
      res.status(400);
      throw new Error('Please fill in all required fields (Title, Category, Image URL)');
    }
    const newProject = await Project.create({ title, category, imageUrl, description });
    return res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

module.exports = router;