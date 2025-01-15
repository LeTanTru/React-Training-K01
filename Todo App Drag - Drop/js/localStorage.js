export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function getFromLocalStorage(key) {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      console.warn(`No data found under key: "${key}"`);
      return null;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error('Error getting data from localStorage:', error);
    return null;
  }
}
