module.exports = {
  bail: true,
  coverageReporters: [
    'text',
    'cobertura',
    'lcov'
  ],
  errorOnDeprecated: true,
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  preset: 'ts-jest',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'reports'
      }
    ]
  ],
  roots: ["test", "src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
	testMatch: [
		'**/test/**/*.test.(ts|tsx|js)'
  ],
  testEnvironment: 'node'
};