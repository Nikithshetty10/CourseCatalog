const express = require('express');
const router = express.Router();
const Course = require('./Models/Course');

// Create a new course
router.post('/api/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all courses
router.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find({});
    res.send(courses);
  } catch (err) {
    res.status(500).send();
  }
});

// Update a course by ID
router.put('/api/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a course by ID
router.delete('/api/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
