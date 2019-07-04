module.exports = {
  verbose: true,
  collectCoverageFrom: [
    'src/app/**/*.js',
    '!src/app/jobs/index.js',
    '!src/app/validators/index.js'
  ],
  testRegex: '__tests__/.*\\.test\\.js$'
}

