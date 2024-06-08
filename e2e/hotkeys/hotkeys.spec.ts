import { expect, test } from '@playwright/test';

test.describe('test theme', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/sign-in');
    await page.waitForLoadState('networkidle');
  });

  test('default theme is light', async ({ page }) => {
    // 确认页面上存在特定元素
    const html = await page.$('html');
    const className = await html?.getAttribute('class');
    expect(className).toEqual('light');
  });

  test('clicking on the theme toggle changes the theme', async ({ page }) => {
    await page.keyboard.press('Alt+T');
    const html = await page.$('html');
    const className = await html?.getAttribute('class');
    expect(className).toEqual('dark');
  });
});
