function generateArrayOfYears(START_YEAR: number, END_YEAR: number) {
    const years = [];

    for (let i = END_YEAR; i >= START_YEAR; i -= 1) {
        years.push(`H${i.toString().slice(-2)}`);
    }
    return years;
}

export default generateArrayOfYears;
