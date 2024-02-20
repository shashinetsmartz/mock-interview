import { errorHandler } from "utils/errorHandler";

const useSessionStorage = () => {
  const setItem = (key, value) => {
    try {
      sessionStorage.setItem(key, value);
    } catch (error) {
      errorHandler(error);
    }
  };
  const getItem = (key) => {
    try {
      const value = sessionStorage.getItem(key);
      return value;
    } catch (error) {
      errorHandler(error);
    }
  };
  const removeItem = (key) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      errorHandler(error);
    }
  };
  return { setItem, getItem, removeItem };
};

export default useSessionStorage;
