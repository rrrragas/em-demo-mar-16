import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Decorates footer category links in section 2 with accordion chevrons.
 * On desktop, each category link gets a down-pointing chevron arrow.
 * @param {Element} footer The footer element
 */
function decorateCategoryAccordions(footer) {
  const sections = footer.querySelectorAll(':scope > .section');
  const categorySection = sections[1]; // Section 2: Category links
  if (!categorySection) return;

  const lists = categorySection.querySelectorAll('.default-content-wrapper > ul');
  lists.forEach((list) => {
    list.querySelectorAll(':scope > li').forEach((li) => {
      li.classList.add('footer-category');
      li.setAttribute('aria-expanded', 'false');
      li.addEventListener('click', (e) => {
        e.preventDefault();
        const expanded = li.getAttribute('aria-expanded') === 'true';
        li.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      });
    });
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  decorateCategoryAccordions(footer);

  block.append(footer);
}
