/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

// useCachedFetch.ts
import { useEffect, useState } from 'react';

type FetchState<T> = {
  data?: T;
  loading: boolean;
  error?: unknown;
};

const generateCacheKey = (url: string, options?: RequestInit): string => {
  const bodyKey = options?.body ? JSON.stringify(options.body) : '';
  return `cache_${url}_${options?.method || 'GET'}_${bodyKey}`;
};

export const useCachedFetch = <T = unknown,>(
  url: string,
  options: RequestInit = {}
): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    loading: true
  });

  useEffect(() => {
    const cacheKey = generateCacheKey(url, options);
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      setState({ data: JSON.parse(cachedData), loading: false });
      return;
    }

    // Fetch the data
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        setState({ data, loading: false });
        localStorage.setItem(cacheKey, JSON.stringify(data));
      })
      .catch(error => {
        setState({ error, loading: false });
      });
  }, [url, options]);

  return state;
};
