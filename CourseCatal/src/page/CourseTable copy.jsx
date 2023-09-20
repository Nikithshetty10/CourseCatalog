import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useHistory } from 'react-router-dom';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    
} from '@ellucian/react-design-system/core';

const CourseTableIntegrated = () => {
    const [courses, setCourses] = useState([]);
const history = useHistory()
    useEffect(() => {
        axios.get('http://localhost:3005/api/courses')
            .then((response) => {
                setCourses(response.data);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3005/api/courses/${id}`);
            setCourses(courses.filter((course) => course._id !== id));
        } catch (error) {
            console.error('An error occurred while deleting the course:', error);
        }
    };

    return (
        <div style={{display:'flex',width:'100%',height:'100%',flexDirection:'column'}}>
            {/* < to="/course-form"> */}
            <div style={{display:'flex',flex:1,justifyContent:'flex-end',margin:'1rem'}}>
                <Button onClick={()=>history.push('/course-form')} >Add Course</Button>
            {/* </Link> */}
            </div>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Course Number</TableCell>
                            <TableCell>Course Name</TableCell>
                            <TableCell>Course Description</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Course Duration</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Credits</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course._id}>
                                <TableCell>{course.courseNumber}</TableCell>
                                <TableCell>{course.courseName}</TableCell>
                                <TableCell>{course.courseDescription}</TableCell>
                                <TableCell>{course.startDate}</TableCell>
                                <TableCell>{course.endDate}</TableCell>
                                <TableCell>{course.courseDuration}</TableCell>
                                <TableCell>{course.type}</TableCell>
                                <TableCell>{course.credits}</TableCell>
                                <TableCell>
                                    <Link to={`/course-form/${course._id}`}>
                                        <Button variant="text">Edit</Button>
                                    </Link>
                                    <Button variant="text" onClick={() => handleDelete(course._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default CourseTableIntegrated;
