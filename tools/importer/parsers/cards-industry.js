/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-industry. Base: cards.
 * Source: https://www.business.att.com/
 * Selector: div.story-stack.aem-GridColumn
 * Generated: 2026-03-16
 */
export default function parse(element, { document }) {
  // Cards block library: Col 1 = Image | Col 2 = Title + Description
  // Story stack carousel slides become card rows
  const slides = Array.from(element.querySelectorAll('.swiper-slide'));
  const cells = [];

  slides.forEach((slide) => {
    // Col 1: slide image (swiper-image or icon)
    const img = slide.querySelector('img.swiper-image, .story-img-container img:not(.is-icon)');
    const icon = slide.querySelector('img.story-icon-img, img.is-icon');

    // Col 2: text content
    const heading = slide.querySelector('.heading-sm-storyStack, .heading-sm, .ss-desktop-container [class*="heading"]');
    const description = slide.querySelector('.story-description, .story-description p');

    const textCell = [];
    if (icon) textCell.push(icon);
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);

    cells.push([img || '', textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-industry', cells });
  element.replaceWith(block);
}
