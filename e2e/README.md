# E2E Tests with Playwright

This directory contains end-to-end tests for the e-commerce application using Playwright.

## Running Tests

### Run all tests (headless mode)
```bash
pnpm test:e2e
```

### Run tests with UI mode (interactive)
```bash
pnpm test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
pnpm test:e2e:headed
```

### Debug tests
```bash
pnpm test:e2e:debug
```

### View test report
```bash
pnpm test:e2e:report
```

## Test Structure

- `example.spec.ts` - Sample tests covering basic e-commerce functionality
  - Home page loading
  - Product navigation
  - Add to cart functionality
  - Cart page navigation

## Writing Tests

Create new test files in this directory with the `.spec.ts` extension. Follow the pattern:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
  });
});
```

## Configuration

The Playwright configuration is in `playwright.config.ts` at the project root. It includes:

- Test directory: `./e2e`
- Base URL: `http://localhost:3000`
- Browsers: Chromium, Firefox, WebKit
- Auto-start dev server before tests
- HTML reporter for test results

## Tips

- Tests run in parallel by default
- Screenshots are captured on failure
- Traces are recorded on first retry
- The dev server starts automatically before tests run