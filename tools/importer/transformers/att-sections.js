/* eslint-disable */
/* global WebImporter */

/**
 * Section transformer for AT&T Business pages.
 * Adds section breaks (<hr>) and section-metadata blocks from template sections.
 * Runs in afterTransform only, uses payload.template.sections.
 * Selectors extracted from captured DOM of https://www.business.att.com/
 */

export default function transform(hookName, element, payload) {
  if (hookName === 'afterTransform') {
    const { document } = payload;
    const sections = payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to avoid shifting DOM positions
    // Process in reverse to preserve DOM positions
    const reversedSections = [...sections].reverse();

    reversedSections.forEach((section) => {
      // Find the first element matching the section selector
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      let sectionEl = null;
      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }

      if (!sectionEl) return;

      // Add section-metadata block if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(metaBlock);
      }

      // Add <hr> before section (except the first section)
      if (section.id !== sections[0].id) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
