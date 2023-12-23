import { useEffect, useReducer, useRef } from 'react';

interface State<T> {
  data?: T;
  error?: Error;
  loading: boolean;
}

type Cache<T> = Record<string, T>;

enum ActionType {
  ERROR = 'error',
  FETCHED = 'fetched',
  LOADING = 'loading'
}

// discriminated union type
type Action<T> =
  | { type: ActionType.ERROR; payload: Error }
  | { type: ActionType.FETCHED; payload: T }
  | { type: ActionType.LOADING };

function useFetch<T = unknown>(url?: string, options?: RequestInit): State<T> {
  const cache = useRef<Cache<T>>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    loading: false
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case ActionType.LOADING:
        return { ...initialState, loading: true };
      case ActionType.FETCHED:
        return { ...initialState, data: action.payload };
      case ActionType.ERROR:
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return undefined;

    cancelRequest.current = false;
    const controller = new AbortController();

    const fetchData = async (): Promise<void> => {
      dispatch({ type: ActionType.LOADING });

      // If a cache exists for this url, return it
      if (cache.current[url]) {
        dispatch({ type: ActionType.FETCHED, payload: cache.current[url] });
        return;
      }

      const optionsWithSignal = { ...options, signal: controller.signal };

      try {
        const response = await fetch(url, optionsWithSignal);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data: T = await response.json();
        // eslint-disable-next-line require-atomic-updates
        cache.current[url] = data;
        if (cancelRequest.current) {
          dispatch({ type: ActionType.ERROR, payload: new Error('Request cancelled') });
          return;
        }

        dispatch({ type: ActionType.FETCHED, payload: data });
      } catch (error) {
        if (cancelRequest.current) {
          dispatch({ type: ActionType.ERROR, payload: new Error('Request cancelled') });
        }

        dispatch({ type: ActionType.ERROR, payload: error as Error });
      }
    };

    void fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
      controller.abort();
    };
  }, [options, url]);

  return state;
}

export default useFetch;
