/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-icon-cards. Base: columns.
 * Source: https://www.business.att.com/
 * Selector: div.generic-list-value-prop.aem-GridColumn
 * Generated: 2026-03-16
 */
export default function parse(element, { document }) {
  // Columns block library: multiple columns per row, each cell = content
  // 4 icon+text value propositions arranged as columns
  const items = Array.from(element.querySelectorAll('.generic-list-icon-vp'));
  const row = [];

  items.forEach((item) => {
    const icon = item.querySelector('span img, .height-xl-all img, img');
    const heading = item.querySelector('h4[class*="heading"], h3[class*="heading"], [class*="heading-md"]');
    const description = item.querySelector('.description p, .description, .type-sm p');
    const legal = item.querySelector('.type-legal p, .type-legal');
    const cta = item.querySelector('a.primary-cta, .cta-container a');

    const cellContent = [];
    if (icon) cellContent.push(icon);
    if (heading) cellContent.push(heading);
    if (description) cellContent.push(description);
    if (legal) cellContent.push(legal);
    if (cta) cellContent.push(cta);

    row.push(cellContent);
  });

  const cells = [row];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-icon-cards', cells });
  element.replaceWith(block);
}
