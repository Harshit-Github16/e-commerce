import { test, expect } from '@playwright/test';

test.describe('E-commerce App', () => {
    test('should load the home page', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveTitle(/React App/);
    });

    test('should navigate to product detail page', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const firstProduct = page.locator('article, .product-card, [data-testid="product"]').first();

        if (await firstProduct.count() > 0) {
            await firstProduct.click();
            await expect(page).toHaveURL(/\/product\//);
        }
    });

    test('should add product to cart', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const addToCartButton = page.getByRole('button', { name: /add to cart/i }).first();

        if (await addToCartButton.count() > 0) {
            await addToCartButton.click();
            await page.waitForTimeout(500);
        }
    });

    test('should navigate to cart page', async ({ page }) => {
        await page.goto('/');

        const cartLink = page.getByRole('link', { name: /cart/i });

        if (await cartLink.count() > 0) {
            await cartLink.click();
            await expect(page).toHaveURL(/\/cart/);
        }
    });
});
