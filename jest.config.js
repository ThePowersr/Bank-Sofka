module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transform: {
    "^.+\\.(js|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^axios$": "<rootDir>/__mocks__/axios.ts"
  }
  // moduleNameMapper: {
  //   "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/**mocks**/fileMock.js",
  // },
};