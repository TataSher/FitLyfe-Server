## Steps

Add test dependencies
`npm install --save-dev jest supertest`

Added test script to package.json

Created jest.config.js and add:
```javascript
module.exports = {
	testEnvironment: "node",
}
```

created server.js and added test server code.

Created server.test.js 
Creates connection and cleans up