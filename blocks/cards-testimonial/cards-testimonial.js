import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      const img = div.querySelector('picture, img');
      const hasText = div.querySelectorAll('h1, h2, h3, h4, h5, h6').length > 0;
      if (img && !hasText && div.children.length <= 1) {
        div.className = 'cards-testimonial-card-image';
      } else if (div.children.length > 0) {
        div.className = 'cards-testimonial-card-body';
      }
    });
    // Classify card body paragraphs
    const body = li.querySelector('.cards-testimonial-card-body');
    if (body) {
      const paragraphs = body.querySelectorAll('p');
      if (paragraphs.length > 1) {
        const lastP = paragraphs[paragraphs.length - 1];
        if (lastP.querySelector('a')) {
          lastP.classList.add('cards-testimonial-cta');
        }
        for (let i = 1; i < paragraphs.length - 1; i += 1) {
          const text = paragraphs[i].textContent.trim();
          if (text === 'Solutions start at') {
            paragraphs[i].classList.add('cards-testimonial-price-label');
          } else if (paragraphs[i].querySelector('strong') && text.match(/^\$\d/)) {
            paragraphs[i].classList.add('cards-testimonial-price');
          } else if (text.startsWith('per line')) {
            paragraphs[i].classList.add('cards-testimonial-price-disclosure');
          } else if (!paragraphs[i].querySelector('strong')) {
            paragraphs[i].classList.add('cards-testimonial-fine-print');
          }
        }
      }
    }
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture')
      .replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });
  block.replaceChildren(ul);
}
