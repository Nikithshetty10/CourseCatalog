import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { TextInput, Button, Checkbox, Select, Paper } from '@ellucian/react-design-system/core';

function CourseForm() {
    const [course, setCourse] = useState({
        courseNumber: '',
        courseName: '',
        courseDescription: '',
        startDate: '',
        endDate: '',
        courseDuration: '',
        type: '',
        credits: '',
        isMandatory: false,
        isOpenForRegistration: true
    });

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3005/api/courses/${id}`)
                .then((response) => {
                    setCourse(response.data);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setCourse({
            ...course,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:3005/api/courses/${id}`, course);
            } else {
                await axios.post('http://localhost:3005/api/courses', course);
            }
            history.push('/');
        } catch (error) {
            console.error('Could not save course:', error);
        }
    };

    const handleBack = () => {
        history.push('/');
    };

    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Course Number"
                    name="courseNumber"
                    value={course.courseNumber}
                    onChange={handleChange}
                />
                <TextInput
                    label="Course Name"
                    name="courseName"
                    value={course.courseName}
                    onChange={handleChange}
                />
                <TextInput
                    label="Course Description"
                    name="courseDescription"
                    value={course.courseDescription}
                    onChange={handleChange}
                    multiline
                />
                <TextInput
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={course.startDate}
                    onChange={handleChange}
                />
                <TextInput
                    label="End Date"
                    type="date"
                    name="endDate"
                    value={course.endDate}
                    onChange={handleChange}
                />
                <TextInput
                    label="Course Duration"
                    type="number"
                    name="courseDuration"
                    value={course.courseDuration}
                    onChange={handleChange}
                />
                <Select label="Type" name="type" value={course.type} onChange={handleChange}>
                    <option value="" disabled>Select Type</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                </Select>
                <TextInput
                    label="Credits"
                    type="number"
                    name="credits"
                    value={course.credits}
                    onChange={handleChange}
                />
                <Checkbox 
                    label="Is Mandatory?"
                    name="isMandatory"
                    checked={course.isMandatory}
                    onChange={handleChange}
                />
                <Button variant="primary" type="submit">Save</Button>
                <Button variant="text" onClick={handleBack}>Back</Button>
            </form>
        </Paper>
    );
}

export default CourseForm;
