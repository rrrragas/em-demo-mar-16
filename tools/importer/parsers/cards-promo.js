/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-promo. Base: cards.
 * Source: https://www.business.att.com/
 * Selector: div.flex-cards.aem-GridColumn
 * Generated: 2026-03-16
 */
export default function parse(element, { document }) {
  // Cards block library: Col 1 = Image | Col 2 = Title + Description + CTA
  const cards = Array.from(element.querySelectorAll('.card-wrapper'));
  const cells = [];

  cards.forEach((card) => {
    // Col 1: card background image
    const img = card.querySelector('.flex-card > img, .card img:first-of-type');

    // Col 2: text content
    const eyebrow = card.querySelector('[class*="eyebrow"]');
    const heading = card.querySelector('h3[class*="heading"], h2[class*="heading"]');
    const description = card.querySelector('.type-base p, .type-base');
    const legal = card.querySelector('.type-legal p, .type-legal');
    const cta = card.querySelector('.flexCardItemCta a, .cta-container a');

    const textCell = [];
    if (eyebrow && eyebrow.textContent.trim()) {
      const em = document.createElement('em');
      em.textContent = eyebrow.textContent.trim();
      textCell.push(em);
    }
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);
    if (legal) textCell.push(legal);
    if (cta) textCell.push(cta);

    cells.push([img || '', textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-promo', cells });
  element.replaceWith(block);
}
