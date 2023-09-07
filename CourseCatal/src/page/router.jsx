import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import CourseTable from './CourseTable';
import CourseForm from './CourseForm';

const RouterPage = (props) => {
    return (
        <Router basename={props.pageInfo.basePath}>
            <Switch>
                <Route path='/' exact>
                    <CourseTable {...props} />
                </Route>
                <Route path='/course-form'>
                    <CourseForm {...props} />
                </Route>
                {/* Add more Routes here as needed */}
            </Switch>
        </Router>
    );
};

RouterPage.propTypes = {
    pageInfo: PropTypes.object
};

export default RouterPage;
