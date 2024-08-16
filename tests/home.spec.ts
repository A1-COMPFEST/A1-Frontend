import { test, expect } from '@playwright/test';

const baseUrl = "https://a1-frontend-brown.vercel.app";

test('home navigation', async ({ page }) => {

    await page.goto(baseUrl);
    const exploreButton = await page.locator('text=Explore Courses');
    await exploreButton.click();
    await expect(page).toHaveURL(baseUrl + "/explore");

});

test('login navigation', async ({ page }) => {

    await page.goto(baseUrl);
    const loginButton = await page.locator('text=sign in');
    await loginButton.click();
    await expect(page).toHaveURL(baseUrl + "/auth/sign-in");

});

test('register navigation', async ({ page }) => {

    await page.goto(baseUrl);
    const loginButton = await page.locator('text=sign in');
    await loginButton.click();
    await expect(page).toHaveURL(baseUrl + "/auth/sign-in");

    const registerButton = await page.locator('text=sign up');
    await registerButton.click();
    await expect(page).toHaveURL(baseUrl + "/auth/sign-up");
});