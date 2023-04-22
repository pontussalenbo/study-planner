const express = require('express');
const data = require('../datasets/get_course_by_master_year_programme_response.json');

const router = express.Router();

function findCoursePeriods(course) {
    return course.timePlans.map((timePlan) => {
        const periods = timePlan.studyPeriods.map((period, idx) => (period !== null ? idx + 1 : 0))
            .filter((_) => !!_);
        const periodStart = Math.min(...periods);
        const periodEnd = Math.max(...periods);

        return { Start: periodStart, End: periodEnd };
    });
}

/* GET users listing. */
router.get('/courses', async (req, res) => {
    res.json({ courses: data });
});

module.exports = router;
