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
