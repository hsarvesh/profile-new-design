import { test, expect } from '@playwright/test';

test.describe('Contact Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('verify contact information', async ({ page }) => {
    const contactInfo = [
      { selector: '.bx-map', text: 'Sarjapur Main Road, Bangalore' },
      { selector: '.bx-envelope', text: 'admin@sarvesh.site' },
      { selector: '.bx-phone-call', text: '+91-********33' }
    ];

    for (const info of contactInfo) {
      const element = await page.locator(`i${info.selector}`).locator('..');
      await expect(element).toContainText(info.text);
    }
  });
});