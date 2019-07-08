module.exports = {
  verbose: true,
  clearMocks: true,
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/app/**/*.js',
    '!src/app/jobs/index.js',
    '!src/app/validators/index.js',
    '!src/app/models/index.js'
  ],
  testRegex: '__tests__/.*\\.test\\.js$'
}
