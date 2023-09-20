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
    const currentDate = new Date();

    const coursesWithStatus = courses.map(course => {
      let isOpenForRegistration = "CLOSED";
      if (currentDate <= new Date(course.endDate) && currentDate >= new Date(course.startDate)) {
        isOpenForRegistration = "OPEN";
      }

      return {
        ...course._doc,
        isOpenForRegistration
      };
    });

    res.send(coursesWithStatus);
  } catch (err) {
    res.status(500).send();
  }
});

// Get a single course by ID
router.get('/api/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).send({ error: 'Course not found' });
    }

    let isOpenForRegistration = "CLOSED";
    const currentDate = new Date();
    if (currentDate <= new Date(course.endDate) && currentDate >= new Date(course.startDate)) {
      isOpenForRegistration = "OPEN";
    }

    const courseWithStatus = {
      ...course._doc,
      isOpenForRegistration
    };

    res.json(courseWithStatus);
  } catch (err) {
    res.status(500).send({ error: 'Internal server error' });
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
