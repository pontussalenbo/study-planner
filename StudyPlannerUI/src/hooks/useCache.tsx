// useCachedFetch.ts
import { useState, useEffect } from 'react';

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
