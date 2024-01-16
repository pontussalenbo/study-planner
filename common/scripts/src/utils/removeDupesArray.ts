/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

/**
 * Generate array of unique entries by given key
 * @param arr array to remove duplicates entries from
 * @param key key to use for comparison when filtering duplicates
 * @returns array of unique entries
 */
function getUniqueListBy<T>(arr: T[], key: keyof T) {
    // Generate 2d array holding key value pairs
    const MapItems = arr.map((item) => [item[key], item] as [T[keyof T], T]);
    // Create a map from the 2d array
    const map = new Map(MapItems);
    // Spread the map into an array and return it
    return [...map.values()];
}

module.exports = getUniqueListBy;
module.exports.default = module.exports;
