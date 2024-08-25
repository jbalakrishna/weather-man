jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  }),
  multiSet: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  }),
  getItem: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(JSON.stringify({}));
    });
  }),
  multiGet: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  }),
  removeItem: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  }),
  getAllKeys: jest.fn(() => {
    return new Promise((resolve) => {
      resolve(["one", "two", "three"]);
    });
  }),
}));
