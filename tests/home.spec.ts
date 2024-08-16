import { test, expect } from '@playwright/test';

test('home navigation', async ({ page }) => {

    await page.goto(`${process.env.BASE_URL}`);
    const exploreButton = await page.locator('text=Explore Courses');
    await exploreButton.click();
    await expect(page).toHaveURL(`${process.env.BASE_URL}/explore`);

});