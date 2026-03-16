/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-link-list. Base: columns.
 * Source: https://www.business.att.com/
 * Selector: div.link-farm.aem-GridColumn
 * Generated: 2026-03-16
 */
export default function parse(element, { document }) {
  // Columns block library: multiple columns per row
  // Each column = list of links (unordered list)
  const columnEls = Array.from(element.querySelectorAll('.desktop-view-and-tablet .accordion-item, .desktop-view-and-tablet .grid-col-3'));
  const row = [];

  columnEls.forEach((col) => {
    const links = Array.from(col.querySelectorAll('a'));
    if (links.length > 0) {
      const ul = document.createElement('ul');
      links.forEach((link) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent.trim();
        li.append(a);
        ul.append(li);
      });
      row.push([ul]);
    }
  });

  const cells = [row];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-link-list', cells });
  element.replaceWith(block);
}
