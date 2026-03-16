import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      const img = div.querySelector('picture, img');
      const hasText = div.querySelectorAll('h1, h2, h3, h4, h5, h6, p').length > 1;
      if (img && !hasText && div.children.length <= 1) {
        div.className = 'cards-industry-card-image';
      } else if (div.children.length > 0) {
        div.className = 'cards-industry-card-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture')
      .replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });
  block.replaceChildren(ul);
}
