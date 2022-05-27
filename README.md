# Javascript Unit Testing

- Short course on unit testing javascript (raw and frameworks)
- [Course Repo](https://github.com/academind/js-testing-practical-guide-code/tree/main)

## What Is Testing?

1. Verify 'if something works as intended'
1. Manual Testing
   - Tedious & cumbersome
   - Error-prone
   - Often incomplete (not all scenarious covered)
1. Automated Testing
   - Writing code to test your code
   - Initial effort, none after
   - Predictable & consitent
   - High / complete code & scenario coverage can be acheived

## Unit Tests

1. Unit
   - Building block of your app
   - Ideally, smallest possible building block
   - Function, class, component
1. App = combination of all units
1. If all units were tested, overall app should work
   - Backed up by integration tests
1. Changes are always tested against all units to avoid bugs
1. Allows us to avoid endless amounts of manual testing
1. Allows you to cover (close to) 100% of your code & scenarios
   - Very quickly
1. Write cleaner & better code
   - Makes testing easiwr

## Unit vs Integration vs E2E

1. Unit Testing
   - Test individual building blocks of an application
   - Every building block (unit) is tested standalone
   - All building blocks work, overall app works
1. Integration Testing
   - Test the combination of building blocks
   - Verify if building blocks (units) work together
   - Even if all units work standalone, combination could fail
1. E2E Testing
   - Tests entire flows and application features
   - Test the actual 'things' real users would do
   - Real users use your app and its features, not individual units

Bottom line, you should combine all kinds of tests

## Test Driven Development (TDD)

A framework/philosophy for writing tests

1. Write a failing test first
1. Implement the code to make the test succeeed
1. Refactor
1. Repeat

# Project Setup

## Application Setup & Code

1. Generally independent setup
1. All you need for manual testing
1. Testing can (and typically will be) integrated
1. Based on webpack, vite, etc

## Test Runner

1. Runs your tests (the testing code)
1. Automatically detects testing code
1. Displays results
1. Jest Karma

## Assertion Library

1. Used to define expected outcomes
1. Checks whether expectations are met
1. Supports all kinds of expectations and modes (sync / async)
1. Jest, Chai

## Jest & Vitest

1. [Jest](https://jestjs.io/)
   - Super simple to get started
   - ES modules is 'kind of' supported
1. [Vitest](https://vitest.dev/)
   - Pretty new/popular
   - Compatible w/ jest syntax
   - **What we'll be using in this course**
1. Installing Vitest
   ```node
   npm install --save-dev vitest
   ```
   ```json
   "scripts": {
       "test": "vitest --globals"
   }
   ```

# The Basics

1. Creating unit tests
1. AAA - Arrange, Act, Assert
1. What to test & organizing tests

## Writing a Test

1. Generally, your test lives alongside your class
   - math.js and math.test.js (can be math.spec.js)

```js
import { it, expect } from 'vitest';
import { add } from './math';

it('should summarize all number values in an array', () => {
	const result = add([1, 2, 3]);
	expect(result).toBe(6);
});
```

```npm
npm run test
```

## Arrange, Act, Assert

1. Arrange: Define the testing environment & values
1. Act: Run the actual code/function that should be tested
1. Assert: Evaluate the produced value/result and compare to the expected value/result

```js
import { it, expect } from 'vitest';
import { add } from './math';

it('should summarize all number values in an array', () => {
	// Arrange
	const numbers = [1, 2, 3];
	const expectedResult = numbers.reduce(
		(prevVal, curVal) => prevVal + curVal,
		0
	);

	// Act
	const result = add(numbers);

	// Assert
	expect(result).toBe(expectedResult);
});
```

# Writing Good Tests

1. Your tests should only test your code
1. Don't test third-party code
   - Don't test what you can't change
1. If the 'third-party' code is your code
   - Test it separately
1. You should test client-side reactions to different response & errors

## General Guidelines

1. Follow **AAA**
1. Only test **one thing**
   - What is 'one thing'?
   - One feature/behavior
   - Validate input OR transform it
1. Focus on the **essence** of a test when arranging
1. Keep the number of **assertions** low

## Code Coverage

1. You want to write test for the majority of your code
1. The goal is not necessarily 100% coverage
   - There is always some code that doesn't need any tests
     - it calls other functions that are tested already
1. Full code coverage isn't any guarntee that you wrote good tests
   - Code coverage is important, but not an indication that you've written good tests

# Advanced Testing Concepts

## toBe() vs toEqual()

```js
it('should return an array of number values if an array of string number values is provided', () => {
	const numberValues = ['1', '2'];

	const cleanedNumbers = cleanNumbers(numberValues);

	//expect(cleanedNumbers[0]).toBeTypeOf('number');
	expect(cleanedNumbers).toBe([1, 2]);
});
```

This fails as we are expecting two arrays to be pointing to the same reference location.

Instead use this:

```js
it('should return an array of number values if an array of string number values is provided', () => {
	const numberValues = ['1', '2'];

	const cleanedNumbers = cleanNumbers(numberValues);

	//expect(cleanedNumbers[0]).toBeTypeOf('number');
	expect(cleanedNumbers).toEqual([1, 2]);
});
```

## Async Code

You have to do some interesting things to make async code work in a test

```js
import { it, expect } from 'vitest';
import { generateToken } from './async-example';

it('should generate a token value', (done) => {
	const testUserEmail = 'test@test.com';

	generateToken(testUserEmail, (err, token) => {
		try {
			expect(token).toBeDefined();
			done();
		} catch (err) {
			done(err);
		}
	});
});
```

1. The `done` function is necessary
1. You must wrap the code you are testing an a `try/catch`
1. Have dones for success and failure

## Promises

You can use build in 'await' features in the testing framework:

```js
it('should generate a token value', () => {
	const testUserEmail = 'test@test.com';

	return expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();
});
```

Or you can manually define the test as async/await

```js
it('should generate a token value', async () => {
	const testUserEmail = 'test@test.com';

	const token = await generateTokenPromise(testUserEmail);

	expect(token).toBeDefined();
});
```

## Testing Hooks

- If you apply the hooks in the suite, they apply to that suite only
- If you add them in the file, they apply to all tests in the file

```js
import { it, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import { User } from './hooks';

const testEmail = 'test@test.com';
let user;

beforeAll(() => {
	user = new User(testEmail);
	console.log('beforeAll()');
});

beforeEach(() => {
	user = new User(testEmail);
	console.log('beforeEach()');
});

afterEach(() => {
	//user = new User(testEmail);
	console.log('afterEach()');
});

afterAll(() => {
	console.log('afterAll()');
});
```

## Concurrent Tests

- By default tests run one after the other
- Adding concurrent to the tests or suite will run them at the same time

```js
// suite
describe.concurrent();

// test
it.concurrent('should store the provided email value', () => {
	expect(user.email).toBe(testEmail);
});
```

- Even when not adding the `.concurrent` property, tests that are stored in different files are executed concurrently

# Spies & Mocks (Dealing with Side Effects)

1. Spies
   - Wrappers around functions
   - Empty replacements
   - Allow you to track if & how a function was called
1. Mocks
   - Replacement for an api that may provide test-specific behavior instead

## Spies

```js
import { describe, it, expect, vi } from 'vitest';
import { generateReportData } from './data';

describe('generateReportData()', () => {
	it('should execute logFn if provided', () => {
		const logger = vi.fn();

		generateReportData(logger);

		expect(logger).toBeCalled();
	});
});
```

- `vi` allows you to generate empty objects
- And then test to make sure they are called

## Mocks

```js
import { it, expect, vi } from 'vitest';
import { promises as fs } from 'fs';
import writeData from './io';

vi.mock('fs');

it('should execute the writeFile method', () => {
	const testData = 'Test';
	const testFileName = 'test.txt';

	writeData(testData, testFileName);

	// fs is mocked
	expect(fs.writeFile).toBeCalled();
});
```

1. Custom, global Mocks
   - Create `__mocks__` folder
   - Create a file for each mock
1. `vi.mock('fileName')` will auto resolve to the custom implementation

# Testing Environments

1. NodeJS is the default
   - NodeJS APIs and modules are available
   - Browser and browser APIs not available
1. JSDOM
   - Virtual browser env with browser APIs and DOM
1. Happy-DOM
   - Vitest only
   - Virtual browser env with browser APIs and DOM

Switch your testing environment in the package.json

```json
	"scripts": {
		"start": "http-server -c-1",
		"test": "vitest --run --environment happy-dom"
	},
```

You can also insert a comment to switch environments in a specific test

- Check the documentation of vitest

## Testing Library Package

- [Link](https://testing-library.com/)
- Worth checking out for unit testing front end
