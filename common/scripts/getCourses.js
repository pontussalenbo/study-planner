const axios = require('axios');
const fs = require('fs');

/**
 * @typedef Course
 * @type {object}
 * @property {string} courseCode
 * @property {string} courseName
 */
/**
 *
 * @param {Object} queryObj
 * @param {string} queryObj.programmeCode
 * @param {string} queryObj.kull
 * @returns {Promise<Course[]>}
 */
async function getCourses(queryObj) {
    const queries = Object.keys(queryObj)
        .map((key) => `${key}=${queryObj[key]}`)
        .join('&');
    const url = `https://api.lth.lu.se/lot/courses?${queries}}`;
    const resp = await axios.get(url);
    return resp.data;
}

async function main({ programmeCode, classes }) {
    // [][PROGRAM][KULL][COURSE]
    const x = programmeCode.map(async (programme) => {
        // Promise<[][]>
        const y = classes.map(async (kull) => {
            const courses = await getCourses({ programmeCode: programme, kull });
            // []
            const coursesWithCLass = courses.map((course) => ({
                ...course,
                class: kull,
            }));
            return coursesWithCLass;
        });
        return Promise.all(y);
    });
    const unwrap = await Promise.all(x);
    fs.writeFileSync('courses.json', JSON.stringify(unwrap.flat(2)));
}

main({ programmeCode: ['D'], classes: ['H19', 'H18'] });
