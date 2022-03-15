import { test, expect } from '@playwright/test';

const getTomorrowDate = () => {
  const oneDay = 1000 * 60 * 60 * 24;
  const [date] = new Date(Date.now() + oneDay).toISOString().split('T');
  return date;
};

test('success page is not directly accessible', async ({ page }) => {
  await page.goto('http://localhost:3000/success', { waitUntil: 'networkidle' });
  expect(page.url()).toBe('http://localhost:3000/');
});

test('date input must not be in the future', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const dateInput = page.locator('input[type=date]');
  await dateInput.fill(getTomorrowDate());
  const helperText = page.locator('input[type=date] + .input__helper-text');
  await page.pause();
  await expect(helperText).toHaveText('You have entered date in the future');
});
