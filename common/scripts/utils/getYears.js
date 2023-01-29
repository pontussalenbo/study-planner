function generateArrayOfYears(START_YEAR, END_YEAR) {
    const years = [];

    for (let i = END_YEAR; i >= START_YEAR; i -= 1) {
        years.push(`H${i.toString().slice(-2)}`);
    }
    return years;
}

module.exports = generateArrayOfYears;
module.exports.default = module.exports;
