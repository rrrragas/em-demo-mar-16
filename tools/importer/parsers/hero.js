/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero. Base: hero.
 * Source: https://www.business.att.com/
 * Selector: div.hero.aem-GridColumn:nth-of-type(1)
 * Generated: 2026-03-16
 */
export default function parse(element, { document }) {
  // Extract background/hero image from bg-art or hero-panel-image
  const bgImg = element.querySelector('.bg-hero-panel img, .hero-panel-image img, .bg-art img');

  // Extract heading (h1 or h2 with heading-xxl class)
  const heading = element.querySelector('h2[class*="heading-xxl"], h1[class*="heading"], .content-panel-text h2, .content-panel-text h1');

  // Extract eyebrow text
  const eyebrowEl = element.querySelector('[class*="eyebrow-lg"], [class*="eyebrow-xxl"], [class*="eyebrow-xxxl"]');

  // Extract body text
  const bodyText = element.querySelector('.content-panel-text .type-base.wysiwyg-editor, .content-panel-text .type-base');

  // Extract legal text
  const legalText = element.querySelector('.content-panel-text .type-legal-wysiwyg-editor, .content-panel-text .type-legal');

  // Extract CTA links
  const ctaLinks = Array.from(element.querySelectorAll('.cta-container a.btn-primary, .cta-container a.btn-secondary'));

  // Build cells matching hero block library structure:
  // Row 1: Background image (optional)
  // Row 2: Heading + subheading + CTA
  const cells = [];

  // Row 1: image
  if (bgImg) {
    cells.push([bgImg]);
  }

  // Row 2: text content
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero', cells });
  element.replaceWith(block);
}
