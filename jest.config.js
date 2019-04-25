module.exports = {
  setupFiles: ['core-js'],
  coverageReporters: ['text-summary', 'html'],
  testResultsProcessor: './node_modules/jest-html-reporter',
  reporters: [
    'default',
    ['./node_modules/jest-html-reporter', {
      pageTitle: '日付解析テストの結果',
      outputPath: './test/test-report.html',
    }],
  ],
};
