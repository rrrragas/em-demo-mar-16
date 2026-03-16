/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-product. Base: cards.
 * Source: https://www.business.att.com/
 * Selector: div.multi-tile-cards.aem-GridColumn:nth-of-type(1)
 * Generated: 2026-03-16
 */
export default function parse(element, { document }) {
  // Cards block library structure: 2 columns per row
  // Col 1: Image/Icon | Col 2: Title + Description + CTA
  const cards = Array.from(element.querySelectorAll('.tile-card'));
  const cells = [];

  cards.forEach((card) => {
    // Col 1: card icon/image
    const img = card.querySelector('.card-img img, .card-content img');

    // Col 2: text content
    const heading = card.querySelector('h3[class*="heading"], .js-heading-section');
    const eyebrow = card.querySelector('.eyebrow-text, [class*="type-eyebrow"]');
    const description = card.querySelector('.tileSubheading, .tileSubheading p');
    const cta = card.querySelector('.cta-container a, a.tile-anchor');

    const textCell = [];
    if (eyebrow && eyebrow.textContent.trim()) {
      const em = document.createElement('em');
      em.textContent = eyebrow.textContent.trim();
      textCell.push(em);
    }
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);
    if (cta) textCell.push(cta);

    cells.push([img || '', textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-product', cells });
  element.replaceWith(block);
}
