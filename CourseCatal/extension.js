module.exports = {
    name: 'CourseCatalog',
    publisher: 'Cohort',
    cards: [{
        type: 'CourseCard',
        source: './src/cards/CourseCard',
        title: 'Course Catalog',
        displayCardType: 'Course Catalog',
        description: 'This is an card to showcase the Course Catalog',
        pageRoute: {
            route: '/',
            excludeClickSelectors: ['a']
        }
    }],
    page: {
        source: './src/page/router.jsx'
    }
};