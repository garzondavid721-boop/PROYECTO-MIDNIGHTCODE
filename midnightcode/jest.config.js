// jest.config.js
module.exports = {
  testMatch: ['**/__tests__/**/*.e2e.test.js', '**/__tests__/**/*.test.js'], 
  testPathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: './coverage',
};