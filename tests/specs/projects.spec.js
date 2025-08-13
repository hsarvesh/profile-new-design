import { test, expect } from '@playwright/test';

test.describe('Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('verify project links', async ({ page }) => {
    const projects = [
      { url: 'https://calc.sarvesh.site', text: 'Calculator' },
      { url: 'https://ocr.sarvesh.site', text: 'OCR using Google Drive' },
      { url: 'https://nomophobia.sarvesh.site', text: 'Nomophobia' }
    ];

    for (const project of projects) {
      const element = await page.locator(`a[href="${project.url}"]`);
      await expect(element).toBeVisible();
      await expect(element).toContainText(project.text);
      await expect(element).toHaveAttribute('target', '_blank');
    }
  });
});