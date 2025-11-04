import { useState, useEffect, useCallback } from 'react';

export default function useApi(fn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const call = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fn(...args);
      setData(res.data ?? res);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err.response?.data || err.message);
      setLoading(false);
      throw err;
    }
  }, deps); // eslint-disable-line

  useEffect(() => {
    // optional: auto-call if fn is "get"
  }, [call]);

  return { data, loading, error, call, setData };
}
