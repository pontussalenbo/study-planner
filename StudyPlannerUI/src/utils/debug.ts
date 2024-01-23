/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

export default function debug(module: string, ...msg: unknown[]) {
    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`%c[${module}]:`, 'color: #0484d9', `${JSON.stringify(msg)}`);
    }
}
