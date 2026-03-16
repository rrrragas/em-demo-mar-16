/* eslint-disable */
/* global WebImporter */
/**
 * Parser for form. Base: form.
 * Source: https://www.business.att.com/
 * Selector: div.rai-form.aem-GridColumn
 * Generated: 2026-03-16
 */
export default function parse(element, { document }) {
  // Form block: single column, each row = field label + input description
  // Row 1: block name
  // Subsequent rows: field definitions

  const fields = Array.from(element.querySelectorAll('.field-div'));
  const cells = [];

  fields.forEach((field) => {
    const label = field.querySelector('label');
    const input = field.querySelector('input, textarea, select');

    if (label && input) {
      const fieldType = input.tagName.toLowerCase() === 'textarea' ? 'textarea'
        : input.tagName.toLowerCase() === 'select' ? 'select'
          : input.type || 'text';
      const fieldName = input.id || input.name || '';

      const p = document.createElement('p');
      p.textContent = `${label.textContent.trim()} (${fieldType}: ${fieldName})`;
      cells.push([p]);
    }
  });

  // Add submit button row
  const submitBtn = element.querySelector('.submit-button-container input, .submit-button-container button');
  if (submitBtn) {
    const p = document.createElement('p');
    p.textContent = 'Submit';
    cells.push([p]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'form', cells });
  element.replaceWith(block);
}
