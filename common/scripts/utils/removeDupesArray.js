/**
 * Generate array of unique entries by given key
 * @param {array} arr array to remove duplicates entries from
 * @param {*} key key to use for comparison when filtering duplicates
 * @returns array of unique entries
 */
function getUniqueListBy(arr, key) {
    // Generate 2d array holding key value pairs
    const MapItems = arr.map((item) => [item[key], item]);
    // Create a map from the 2d array
    const map = new Map(MapItems);
    // Spread the map into an array and return it
    return [...map.values()];
}

module.exports = getUniqueListBy;
module.exports.default = module.exports;