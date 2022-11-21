import { test, expect } from '@playwright/test';

test('Homepage Shows movies for cindy', async ({ page }) => {
  await page.goto('https://movies-sussdorff.cloud.okteto.net/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Movies/);

  // create a locator
  const movieToWatch = page.getByRole('heading', { name: 'New movies to watch for Cindy' });

  // Expect an attribute "to be strictly equal" to the value.
  await expect(movieToWatch).toBeVisible();

});
