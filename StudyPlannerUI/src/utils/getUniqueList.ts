// TODO: Remove?
export function getUniqueListBy<T>(arr: T[], key: keyof T): T[] {
    return [...new Map(arr.map(item => [item[key], item])).values()];
}

export default getUniqueListBy;
