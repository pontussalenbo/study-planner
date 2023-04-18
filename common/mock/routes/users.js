const express = require('express');
const { promisify } = require('util');
const db = require('../db');
const data = require('../../data/courses_D.json');

const router = express.Router();

function findCoursePeriods(course) {
    return course.timePlans.map((timePlan) => {
        const periods = timePlan.studyPeriods.map((period, idx) => (period !== null ? idx + 1 : 0))
            .filter((_) => !!_);
        const periodStart = Math.min(...periods);
        const periodEnd = Math.max(...periods);

        return { periodStart, periodEnd };
    });
}

/* GET users listing. */
router.get('/courses', async (req, res, next) => {
    const courses = data.slice(0, 20);
    // eslint-disable-next-line max-len
    const coursePeriods = courses.map((course) => ({ ...course, periods: findCoursePeriods(course) }));

    res.json({ courses: coursePeriods });
});

module.exports = router;
