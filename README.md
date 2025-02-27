# Playwright TypeScript Framework POC: "UI and API Testing using demoqa site"

## Description

This project is an intial POC of automating demoqa site UI and bookstore API with help of playwright, typescript and playwright test as test executor.

## Getting Started

### Tools & Frameworks

- **[TypeScript](https://www.typescriptlang.org/)**: A statically typed superset of JavaScript programming language, enhancing code quality and understandability.
- **[Playwright Test](https://playwright.dev/docs/test-configuration)**: A modern end-to-end testing framework, facilitating [test creation](https://playwright.dev/docs/api/class-test), [execution](https://playwright.dev/docs/running-tests), [fixture management](https://playwright.dev/docs/test-fixtures), and [report generation](https://playwright.dev/docs/test-reporters).
- **[Playwright Assertions](https://playwright.dev/docs/assertions)**: Provides robust assertion capabilities for validating test outcomes.

### Prerequisites

Ensure you have the following software installed on your machine:

- **[npm (v8.0.0 or later)](https://docs.npmjs.com/cli/v9/configuring-npm)**: Package manager for JavaScript, used to install and manage software packages.
  - To verify your current version, use the command `npm -v`.
  - If npm isn't installed, follow the [npm installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- **[Node.js (v16.0.0 or later)](https://nodejs.org/en/download)**: JavaScript runtime built on Chrome's V8 JavaScript engine, allowing the execution of JavaScript server-side.
  - To verify your current version, use the command `node -v`.
- **VSCode Settings**: To ensure consistency with the prettier format settings, apply the following configurations in your VSCode settings (use Cmd + , to access settings):
  - **Quote Style**: Set `typescript.preferences.quoteStyle` to `single` for consistent quote usage across your code.
  - **Format On Save**: Enable `Format On Save Mode` and set it to `file`. This ensures your code is automatically formatted every time you save, enhancing readability and consistency.

### Installing

Get started with the project by following the step-by-step installation guide. Please refer the below for complete instructions on setting up the project on your local machine.

1. Download ZIP file/Checkout to your local.

2. Delete node-modules folder

2. Navigate to the project directory:

3. Install the dependencies:

```bash
npm install
```
```bash
npm playwright install
```

## Usage

### Page Objects

Page objects are utilized to encapsulate information about the elements present on each page of your application. They also provide a structured way to write action and assertion functions for various functionalities on each page. This approach promotes code reusability and makes the tests easier to maintain and understand. Page objects can be found in the `pages` directory.

## Utilities

The Utilities section in this project encompasses a variety of functions designed to enhance the efficiency of your testing process. These utilities include:

1. [commonReusableFunctions Utilities]: Functions that encapsulate common actions like clicking, getting a list, or comparing, providing a more concise way to express these operations in your tests.
2. [commonWait Utilities]: Functions that assist in waiting for specified time, waiting for element or waiting for load state

## Executing Tests

We have the flexibility to execute a single test, a specific set of tests, or the entire test suite. Testing can be carried out on a single browser or across multiple browsers simultaneously. By default, tests run in a headless mode, and the test outcomes are displayed in the terminal.

### Run tests using plugin

### Parallel Execution

Playwright allows you to execute tests in parallel across multiple workers. This can significantly speed up your test suite.

To enable parallel execution,there are multiple ways. Below is one of the way which we adopted in this framework as this is at configuration level and can be maintained easily.
Add below config to playwright.config file

```typescript
import { defineConfig} from '@playwright/test';

export const testConfig = defineConfig({
  fullyParallel: true,
  workers: 1,
  },});
```
The number of workers can be configured will help execute the scripts in multiple threads.

### Running Tests via the Command-Line Interface

Utilize a variety of commands to execute your tests in different modes. Below are a few illustrative examples:

Run all the tests
```bash
npx playwright test
```
Run a single test file

```bash
npx playwright test path of spec file
```

## Authors

Mounika Karicharla  

## Version History

* 0.1
    * Initial Release
