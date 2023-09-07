const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  courseNumber: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  courseDescription: {
    type: String,
    required: false
  },
  startDate: {
    type: Date,
    required: false
  },
  endDate: {
    type: Date,
    required: false
  },
  courseDuration: {
    type: Number,
    required: false
  },
  type: {
    type: String,
    enum: ['Online', 'Offline'], // You can add more types here
    required: false
  },
  credits: {
    type: Number,
    required: false
  },
  isMandatory: {
    type: Boolean,
    required: false
  },
  isOpenForRegistration: {
    type: Boolean,
    default: true // You can update this logic based on your needs
  }
});

module.exports = mongoose.model('Course', CourseSchema);
