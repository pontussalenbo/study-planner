const axios = require('axios');
const fs = require('fs');

const { FILE_PATHS, PROGRAMMES } = require('./utils/constants');

/**
 * Type definition for a course object.
 * @typedef Course
 * @type {object}
 * @property {string} courseCode
 * @property {string} courseName
 */

/**
 * Fetches courses for a given programme and class from the official LTH API and returns them as an array of Course objects.
 * @param {Object} queryObj - Object containing query parameters, i.e programmeCode and kull
 * @param {string} queryObj.programmeCode - Programme code to query courses for.
 * @param {string} queryObj.kull - Class to query courses for (H19, H18, H17, etc).
 * @returns {Promise<Course[]>} - Promise resolving to an array of courses for the given programme and class.
 */
async function getCourses(queryObj) {
    try {
        const queries = Object.keys(queryObj)
            .map((key) => `${key}=${queryObj[key]}`)
            .join('&');
        const url = `https://api.lth.lu.se/lot/courses?${queries}`;
        const resp = await axios.get(url);
        return resp.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    }
}

/**
 * Fetches courses for a given programme within the specific class
 * (i.e courses given that specific term/semester)
 * @param {string} programmeCode - Programme code for the specific program to query courses for.
 * @param {string} kull - Class-specific term to query courses for (H19, H18, H17, etc).
 * @returns {Promise<Object>} Promise resolving to an array of course objects
 * for the given programme njected with the class the course was given for.
 */
async function getCoursesForClass(programmeCode, kull) {
    const courses = await getCourses({ programmeCode, kull });
    const coursesWithCLass = courses.map((course) => ({
        ...course,
        class: kull,
    }));
    return coursesWithCLass;
}

async function main({ programmeCode, classes }) {
    // [][PROGRAM][KULL][COURSE]
    // Get all courses for each class in each programme
    const programmeCourses = programmeCode.map(async (programme) => {
        // Promise<[][]>
        const y = classes.map(async (kull) => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Retrieving course data for programme: ' + programme + ' and class: ' + kull + '...');
            const courses = await getCourses({ programmeCode: programme, kull });
        // Get all courses for each class in each programme
        // eslint-disable-next-line arrow-body-style
        const coursesWithinClass = classes.map(async (kull) => {
            // []
            return getCoursesForClass(programme, kull);
        });
        // flatten the responses into a single array
        // thus every course of a programme is in 1d array independent of class
        // Return an object holding which programme the coursesData belong to
        // as this makes it easier to write to file
        return Promise.all(coursesWithinClass).then((x) => ({ programme, data: x.flat() }));
    });
    // Now we have an array of promises, each promise must be resolved to acutally get the data
    const allProgrammesCourses = await Promise.all(programmeCourses);
    // Write each programmes courses to file
    allProgrammesCourses.forEach(({ programme, data }) => {
        const filepath = `${FILE_PATHS.COURSES_DATA_OUT_DIR}/courses_${programme}.json`;
        fs.writeFileSync(filepath, JSON.stringify(data), 'utf8');
    });
}

main({
    programmeCode: ['B', 'C', 'D', 'E', 'F', 'M', 'MD', 'I', 'K', 'L', 'N', 'Pi', 'V', 'W'],
    classes: ['H07', 'H08', 'H09', 'H10', 'H11', 'H12', 'H13', 'H14', 'H15', 'H16', 'H17', 'H18', 'H19', 'H20']
});
