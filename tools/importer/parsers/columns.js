/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns. Base: columns.
 * Source: https://www.business.att.com/
 * Selectors: div.offer.aem-GridColumn:nth-of-type(1), div.offer.aem-GridColumn:nth-of-type(2)
 * Generated: 2026-03-16
 */
export default function parse(element, { document }) {
  // Columns block library: 2 columns per row
  // Col 1: Text (heading, body, legal, CTA) | Col 2: Image

  // Text column content
  const eyebrow = element.querySelector('[class*="eyebrow-xxl"], [class*="eyebrow-lg"]');
  const heading = element.querySelector('h2[class*="heading-xxl"], h2[class*="heading"]');
  const bodyText = element.querySelector('.type-base.wysiwyg-editor, .type-base');
  const legal = element.querySelector('.type-legal-wysiwyg-editor, .type-legal');
  const ctaLinks = Array.from(element.querySelectorAll('.cta-container a.btn-primary, .cta-container a.btn-secondary'));

  // Image column
  const img = element.querySelector('.imgOffer, .gvpImgTarget, .order-img-top img, .video-content-offer img');

  // Build text cell
  const textCell = [];
  if (eyebrow && eyebrow.textContent.trim()) {
    const em = document.createElement('em');
    em.textContent = eyebrow.textContent.trim();
    textCell.push(em);
  }
  if (heading) textCell.push(heading);
  if (bodyText) textCell.push(bodyText);
  if (legal) textCell.push(legal);
  textCell.push(...ctaLinks);

  // Build image cell
  const imgCell = img ? [img] : [''];

  const cells = [[textCell, imgCell]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns', cells });
  element.replaceWith(block);
}
