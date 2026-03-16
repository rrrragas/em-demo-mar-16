/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-dark. Base: hero.
 * Source: https://www.business.att.com/
 * Selectors: div.hero.aem-GridColumn:nth-of-type(2), div.hero.aem-GridColumn:nth-of-type(3)
 * Generated: 2026-03-16
 */
export default function parse(element, { document }) {
  // Extract background image
  const bgImg = element.querySelector('.bg-hero-panel img, .hero-panel-image img, .bg-art img');

  // Extract heading
  const heading = element.querySelector('h2[class*="heading-xxl"], h1[class*="heading"], .content-panel-text h2');

  // Extract eyebrow
  const eyebrowEl = element.querySelector('[class*="eyebrow-xxxl"], [class*="eyebrow-xxl"], [class*="eyebrow-lg"]');

  // Extract body text
  const bodyText = element.querySelector('.content-panel-text .type-base.wysiwyg-editor, .content-panel-text .type-base');

  // Extract legal text
  const legalText = element.querySelector('.content-panel-text .type-legal-wysiwyg-editor');

  // Extract CTA links
  const ctaLinks = Array.from(element.querySelectorAll('.cta-container a.btn-primary, .cta-container a.btn-secondary'));

  // Build cells: Row 1 = image, Row 2 = text content
  const cells = [];

  if (bgImg) {
    cells.push([bgImg]);
  }

  const contentCell = [];
  if (eyebrowEl) {
    const eyebrowText = eyebrowEl.textContent.trim();
    if (eyebrowText) {
      const em = document.createElement('em');
      em.textContent = eyebrowText;
      contentCell.push(em);
    }
  }
  if (heading) contentCell.push(heading);
  if (bodyText) contentCell.push(bodyText);
  if (legalText) contentCell.push(legalText);
  contentCell.push(...ctaLinks);
  cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-dark', cells });
  element.replaceWith(block);
}
