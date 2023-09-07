module.exports = {
    name: 'CourseCatalog',
    publisher: 'Cohort',
    cards: [{
        type: 'CourseCard',
        source: './src/cards/CourseCard',
        title: 'Course Card',
        displayCardType: 'Course Card',
        description: 'This is an introductory card to the Ellucian Experience SDK',
        pageRoute: {
            route: '/',
            excludeClickSelectors: ['a']
        }
    }],
    page: {
        source: './src/page/router.jsx'
    }
};