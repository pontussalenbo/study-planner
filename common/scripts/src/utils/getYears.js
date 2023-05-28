"use strict";
exports.__esModule = true;
function generateArrayOfYears(START_YEAR, END_YEAR) {
    var years = [];
    for (var i = END_YEAR; i >= START_YEAR; i -= 1) {
        years.push("H".concat(i.toString().slice(-2)));
    }
    return years;
}
exports["default"] = generateArrayOfYears;
