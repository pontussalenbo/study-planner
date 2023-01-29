const { END_YEAR, START_YEAR } = require('./constants');

function generateArrayOfYears() {
    const max = END_YEAR;
    const min = START_YEAR;
    const years = [];

    for (let i = max; i >= min; i -= 1) {
        years.push(`H${i.toString().slice(-2)}`);
    }
    return years;
}

console.log(generateArrayOfYears());

module.exports = generateArrayOfYears;
module.exports.default = module.exports;
