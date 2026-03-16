/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-testimonial. Base: cards.
 * Source: https://www.business.att.com/
 * Selector: div.multi-tile-cards.aem-GridColumn:nth-of-type(2)
 * Generated: 2026-03-16
 */
export default function parse(element, { document }) {
  // Cards block library: Col 1 = Image | Col 2 = Eyebrow + Title + Description + CTA
  const cards = Array.from(element.querySelectorAll('.tile-card'));
  const cells = [];

  cards.forEach((card) => {
    // Col 1: card image
    const img = card.querySelector('.card-img img');

    // Col 2: text content
    const eyebrow = card.querySelector('.eyebrow-text, [class*="type-eyebrow"]');
    const heading = card.querySelector('h3[class*="heading"], .js-heading-section');
    const description = card.querySelector('.tileSubheading p, .tileSubheading');
    const legal = card.querySelector('.cardlegal, .type-legal-wysiwyg-editor');
    const cta = card.querySelector('.cta-container a, a.tile-anchor');

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

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-testimonial', cells });
  element.replaceWith(block);
}
