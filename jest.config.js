module.exports = {
  testMatch: ["**/src/**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
    "^.+\\.js": "<rootDir>/node_modules/babel-jest"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!@baltimorecounty)"]
};
