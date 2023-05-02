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
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Retrieving course data for programme: ' + programme + ' and class: ' + kull + '...');
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

main({
    programmeCode: ['B', 'C', 'D', 'E', 'F', 'M', 'MD', 'I', 'K', 'L', 'N', 'Pi', 'V', 'W'],
    classes: ['H07', 'H08', 'H09', 'H10', 'H11', 'H12', 'H13', 'H14', 'H15', 'H16', 'H17', 'H18', 'H19', 'H20']
});