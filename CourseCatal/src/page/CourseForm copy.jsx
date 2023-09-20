import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { 
    TextField, DatePicker, Dropdown, DropdownItem, Checkbox, Button, 
     FormControlLabel 
} from '@ellucian/react-design-system/core';

//newly added

// const styles = theme => ({
//     formGroup: {
//         margin: theme.spacing(2),
//     },
//     formControl: {
//         margin: theme.spacing(1),
//         fullWidth: true,
//     },
//     buttonGroup: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         margin: theme.spacing(2),
//     }
// });

/////////////////////////////////////////////

function CourseForm() {
    // const { classes } = props;
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
        isOpenForRegistration: true,
        courseNameError: false,
        courseNameErrorMessage: '',
        courseNumberError: false,
        courseNumberErrorMessage: '',
        courseDescriptionError: false,
        courseDescriptionErrorMessage: '',
        typeError: false
    });

    const history = useHistory();
    const { id } = useParams();

    
    // const calculateDuration = (startDate, endDate) => {
    //     let start = new Date(startDate);
    //     const end = new Date(endDate);
    //     let daysCount = 0;
    
    //     while (start <= end) {
    //         if (start.getDay() !== 6 && start.getDay() !== 0) { // 6 is Saturday and 0 is Sunday
    //             daysCount++;
    //         }
    //         start = new Date(start.setDate(start.getDate() + 1)); // Increment the date
    //     }
    
    //     // Convert days count to years, months, and days
    //     const years = Math.floor(daysCount / 365);
    //     daysCount %= 365;
    
    //     const months = Math.floor(daysCount / 30);
    //     const days = daysCount % 30;
    
    //     let duration = '';
    //     if (years) duration += `${years} years `;
    //     if (months) duration += `${months} months `;
    //     if (days) duration += `${days} days`;
    
    //     return duration.trim();
    // };
    
    function countDaysExcludingWeekends(startDate, endDate) {
        let dayCount = 0;
        let currentDay = new Date(startDate);
        
        while (currentDay <= endDate) {
            // If it's not Saturday (6) or Sunday (0)
            if (currentDay.getDay() !== 6 && currentDay.getDay() !== 0) {
                dayCount++;
            }
            
            currentDay.setDate(currentDay.getDate() + 1);
        }
        
        return dayCount;
    }

    function daysToYearsMonthsDays(days) {
        const daysInYear = 365; // ignoring leap years for simplicity
        const daysInMonth = 30; // approximation
    
        const years = Math.floor(days / daysInYear);
        days -= years * daysInYear;
    
        const months = Math.floor(days / daysInMonth);
        days -= months * daysInMonth;
    
        return `${years} years ${months} months ${days} days`;
    }

    const displayedDuration = daysToYearsMonthsDays(course.courseDuration);

    

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3005/api/courses/${id}`)
                .then((response) => {
                    setCourse(response.data);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            setCourse(prevCourse => ({ ...prevCourse, [name]: checked }));
        } else {
            if (name === 'type' && value === '') {
                setCourse(prevCourse => ({ ...prevCourse, [name]: value, typeError: true }));
            } else {
                setCourse(prevCourse => ({ ...prevCourse, [name]: value, typeError: false }));
            }
        }
    };
    

    const typeOptions = [
        'Graduate',
        'Undergraduate'
    ];

    const handleNumberChange = (name) => (value) => {
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: parseFloat(value)
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response;
        if (id) {
            response = await axios.put(`http://localhost:3005/api/courses/${id}`, course);
        } else {
            response = await axios.post('http://localhost:3005/api/courses', course);
        }
        if (response.status !== 201 && response.status !== 200) {
            alert(`API Error: ${response.status} - ${response.statusText}`);
            return;
        }
        history.push('/');
    };

    const handleBack = () => {
        history.push('/');
    };

    const handleBlur = (e) => {
        if (e.target.name === 'type' && e.target.value === '') {
            setCourse(prevCourse => ({
                ...prevCourse,
                typeError: true
            }));
        }
    };
    const handleBlurText = (event) => {
        const { name, value } = event.target;
        const errorKey = `${name}Error`;
        const errorMessage = `${name}ErrorMessage`;
    
        if (value.trim() === '') {
            setCourse(prevState => ({
                ...prevState,
                [errorKey]: true,
                [errorMessage]: 'This field is required',
            }));
        } else {
            setCourse(prevState => ({
                ...prevState,
                [errorKey]: false,
                [errorMessage]: '',
            }));
        }
    };
    

    const handleDateChange = (name) => (date) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);  // Resetting time to compare only dates
    
        let isOpenForReg = course.isOpenForRegistration;
    
        if (name === 'startDate') {
            const duration = countDaysExcludingWeekends(date, course.endDate);
            isOpenForReg = date > currentDate;
            setCourse(prevCourse => ({
                ...prevCourse,
                startDate: date,
                courseDuration: duration,
                isOpenForRegistration: isOpenForReg
            }));
        } else if (name === 'endDate') {
            const duration = countDaysExcludingWeekends(course.startDate, date);
            isOpenForReg = date >= currentDate && course.startDate > currentDate;
            setCourse(prevCourse => ({
                ...prevCourse,
                endDate: date,
                courseDuration: duration,
                isOpenForRegistration: isOpenForReg
            }));
        }
    };
    
    
    console.log('Course State:', course);


    return (
        <div>
            <Button onClick={handleBack}>Back</Button>
            <br /> {/* Line break for spacing */}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Course Number"
                    name="courseNumber"
                    value={course.courseNumber}
                    onChange={handleChange}
                    onBlur={handleBlurText}
                    error={course.courseNumberError}
                    helperText={course.courseNumberErrorMessage}
                    required
                />
                <TextField
                    label="Course Name"
                    name="courseName"
                    value={course.courseName}
                    onChange={handleChange}
                    onBlur={handleBlurText}
    error={course.courseNameError}
    helperText={course.courseNameErrorMessage}
    required
                />
                <TextField
                    label="Course Description"
                    name="courseDescription"
                    value={course.courseDescription}
                    onChange={handleChange}
                    onBlur={handleBlurText}
                    error={course.courseDescriptionError}
                    helperText={course.courseDescriptionErrorMessage}
                    multiline
                    required
                />
                <DatePicker
                    label="Start Date"
                    name="startDate"
                    value={course.startDate}
                    onDateChange={handleDateChange('startDate')}
                    maxDate={course.endDate}  // Ensure start date is always before the end date
                />
                <DatePicker
                    label="End Date"
                    name="endDate"
                    value={course.endDate}
                    onDateChange={handleDateChange('endDate')}
                    minDate={course.startDate} // Ensure end date is always after the start date
                />
                <TextField
                    label="Course Duration"
                    type="number"
                    name="courseDuration"
                    value={course.courseDuration}
                    onChange={(value) => handleNumberChange('courseDuration')(value)}
                />

<div>
   Course Duration: {displayedDuration}
</div>
                <TextField
                    label="Credits"
                    type="number"
                    name="credits"
                    value={course.credits}
                    onChange={(value) => handleNumberChange('credits')(value)}
                />
                <Dropdown
                    error={course.typeError}
                    id="typeDropdown"
                    helperText={
                        course.typeError ? 'A type must be selected' : null
                    }
                    label="Type"
                    name="type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={course.type}
                    required
                >
                    <DropdownItem
                        key="placeholder"
                        label="Select Type"
                        value=""
                        disabled
                    />
                    {typeOptions.map(option => (
                        <DropdownItem
                            key={option}
                            label={option}
                            value={option}
                        />
                    ))}
                </Dropdown>
                <FormControlLabel
                    control={
                        <Checkbox 
                            name="isMandatory"
                            checked={course.isMandatory}
                            onChange={handleChange}
                        />
                    }
                    label="Is Mandatory?"
                />

<div>
    Open for Registration: {course.isOpenForRegistration ? 'OPEN' : 'CLOSED'}
</div>

                <Button color="primary" variant="contained" type="submit">
                    {id ? 'Save Changes' : 'Add Course'}
                </Button>
                
            </form>
        </div>
    );
}

export default CourseForm;

// CourseForm.propTypes = {
//     classes: PropTypes.object.isRequired,
// };
// export default withStyles(styles)(CourseForm);


