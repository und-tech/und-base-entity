module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testMatch: [
    '**/src/**.(test|spec).ts'
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}
