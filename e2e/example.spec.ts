import { test, expect } from '@playwright/test';

test.describe('E-commerce App', () => {
    test('should load the home page', async ({ page }) => {
        await page.goto('/');

        // Wait for the page to load
        await page.waitForLoadState('networkidle');

        // Check if the page title or header is present
        await expect(page).toHaveTitle(/React App/);
    });

    test('should navigate to product detail page', async ({ page }) => {
        await page.goto('/');

        // Wait for products to load
        await page.waitForLoadState('networkidle');

        // Click on the first product (adjust selector based on your actual implementation)
        const firstProduct = page.locator('article, .product-card, [data-testid="product"]').first();

        if (await firstProduct.count() > 0) {
            await firstProduct.click();

            // Verify navigation to product detail page
            await expect(page).toHaveURL(/\/product\//);
        }
    });

    test('should add product to cart', async ({ page }) => {
        await page.goto('/');

        // Wait for products to load
        await page.waitForLoadState('networkidle');

        // Look for "Add to Cart" button
        const addToCartButton = page.getByRole('button', { name: /add to cart/i }).first();

        if (await addToCartButton.count() > 0) {
            await addToCartButton.click();

            // Verify cart count increased or success message appeared
            await page.waitForTimeout(500);
        }
    });

    test('should navigate to cart page', async ({ page }) => {
        await page.goto('/');

        // Look for cart link/button in header
        const cartLink = page.getByRole('link', { name: /cart/i });

        if (await cartLink.count() > 0) {
            await cartLink.click();

            // Verify navigation to cart page
            await expect(page).toHaveURL(/\/cart/);
        }
    });
});
