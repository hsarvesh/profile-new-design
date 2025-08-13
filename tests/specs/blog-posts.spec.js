import { test, expect } from '@playwright/test';

test.describe('Blog Posts Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('verify blog post links', async ({ page }) => {
    const blogPosts = [
      'artificial-intelligence-business-challenges-ahead',
      'digital-transformation-using-aiml-think-cohesively',
      'google-vision-api-only-ocr-using-python',
      '70-hours-week-facts-vs-mindset-towards-your-work',
      'breaking-ego-chambers',
      'end-saas-how-ai-agents-redefining-software'
    ];

    for (const post of blogPosts) {
      const link = await page.locator(`a[href*="${post}"]`);
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('target', '_blank');
    }
  });
});