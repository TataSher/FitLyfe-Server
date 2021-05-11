## Steps

Add test dependencies
`npm install --save-dev jest supertest`

Added test script to package.json

Created jest.config.js and add:
```javascript
module.exports = {
	testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ['src/models/**/*.{js,jsx}', 'src/routes/**/*.{js,jsx}'],
}
```

created server.js and added test server code.

Created server.test.js 
Creates connection to db and cleans up connection

server.test.js has all tests and everything.


