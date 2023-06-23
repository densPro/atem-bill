import { useState } from 'react';
/***
 * Hook that persist a value in the local storage.
 * @param {string} key that will be saved in local storage.
 * @param {string} initialValue that will be saved in the local storage.
 * @returns {[S, any]} - The stored value and a function to set the value.
 */
export function useLocalStorage<S>(key: string, initialValue: S):  [S, any] {
  const [storedValue, setStoredValue] = useState<S>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const setValue = (value: S) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
}
