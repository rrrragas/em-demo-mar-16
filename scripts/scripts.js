import {
  buildBlock,
  loadHeader,
  loadFooter,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
} from './aem.js';

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    // Check if h1 or picture is already inside a hero block
    if (h1.closest('.hero') || picture.closest('.hero')) {
      return; // Don't create a duplicate hero block
    }
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    // auto load `*/fragments/*` references
    const fragments = [...main.querySelectorAll('a[href*="/fragments/"]')].filter((f) => !f.closest('.fragment'));
    if (fragments.length > 0) {
      // eslint-disable-next-line import/no-cycle
      import('../blocks/fragment/fragment.js').then(({ loadFragment }) => {
        fragments.forEach(async (fragment) => {
          try {
            const { pathname } = new URL(fragment.href);
            const frag = await loadFragment(pathname);
            fragment.parentElement.replaceWith(...frag.children);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Fragment loading failed', error);
          }
        });
      });
    }

    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates formatted links to style them as buttons.
 * @param {HTMLElement} main The main container element
 */
function decorateButtons(main) {
  main.querySelectorAll('p a[href]').forEach((a) => {
    a.title = a.title || a.textContent;
    const p = a.closest('p');
    const text = a.textContent.trim();

    // quick structural checks
    if (a.querySelector('img') || p.textContent.trim() !== text) return;

    // skip URL display links
    try {
      if (new URL(a.href).href === new URL(text, window.location).href) return;
    } catch { /* continue */ }

    // require authored formatting for buttonization
    const strong = a.closest('strong');
    const em = a.closest('em');
    if (!strong && !em) return;

    p.className = 'button-wrapper';
    a.className = 'button';
    if (strong && em) { // high-impact call-to-action
      a.classList.add('accent');
      const outer = strong.contains(em) ? strong : em;
      outer.replaceWith(a);
    } else if (strong) {
      a.classList.add('primary');
      strong.replaceWith(a);
    } else {
      a.classList.add('secondary');
      em.replaceWith(a);
    }
  });
}

/**
 * Adds identifying classes to sections based on content.
 * @param {Element} main The main element
 */
function classifySections(main) {
  main.querySelectorAll('.section').forEach((section) => {
    const h2 = section.querySelector('h2');
    if (!h2) return;
    const text = h2.textContent.trim().toLowerCase();
    if (text.includes('guarantee') && !section.classList.contains('columns-icon-cards-container')) {
      section.classList.add('guarantee');
    } else if (text.includes('driving industry')) {
      section.classList.add('testimonials');
    } else if (text.includes('make the switch')) {
      section.classList.add('switch');
    } else if (text.includes('#1') && text.includes('customer')) {
      section.classList.add('satisfaction');
    }
  });
}

/**
 * Restructures testimonial default content into a card grid.
 * @param {Element} main The main element
 */
function buildTestimonialCards(main) {
  const section = main.querySelector('.section.testimonials');
  if (!section) return;
  const wrapper = section.querySelector('.default-content-wrapper');
  if (!wrapper) return;

  const h2 = wrapper.querySelector('h2');
  const introP = h2 && h2.nextElementSibling;
  if (!h2 || !introP) return;

  const elements = [...wrapper.children];
  const startIdx = elements.indexOf(introP) + 1;
  const remaining = elements.slice(startIdx);

  const cards = [];
  let currentCard = null;
  const trailing = [];
  let doneWithCards = false;

  remaining.forEach((el) => {
    if (doneWithCards) {
      trailing.push(el);
      return;
    }
    const pic = el.querySelector('picture') || el.querySelector('img');
    const isImageOnly = pic && el.tagName === 'P'
      && el.textContent.trim() === '';
    if (isImageOnly) {
      if (currentCard && currentCard.length > 0) cards.push(currentCard);
      currentCard = [el];
    } else if (currentCard) {
      const isLinkP = el.querySelector('a') && el.tagName === 'P'
        && el.querySelectorAll('a').length === 1
        && el.textContent.trim() === el.querySelector('a').textContent.trim();
      currentCard.push(el);
      if (isLinkP) {
        cards.push(currentCard);
        currentCard = null;
        doneWithCards = cards.length >= 4;
      }
    } else {
      trailing.push(el);
    }
  });
  if (currentCard && currentCard.length > 0) cards.push(currentCard);

  if (cards.length < 2) return;

  const grid = document.createElement('div');
  grid.className = 'testimonial-grid';

  cards.forEach((cardEls) => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    cardEls.forEach((el) => card.append(el));
    grid.append(card);
  });

  introP.after(grid);
}

/**
 * Makes the guarantee section image a background.
 * @param {Element} main The main element
 */
function buildGuaranteeBackground(main) {
  const section = main.querySelector('.section.guarantee');
  if (!section) return;
  const wrapper = section.querySelector('.default-content-wrapper');
  if (!wrapper) return;

  const firstP = wrapper.querySelector('p:first-child');
  const img = firstP && firstP.querySelector('img');
  if (!img) return;

  section.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${img.currentSrc || img.src})`;
  section.style.backgroundSize = 'cover';
  section.style.backgroundPosition = 'center';
  firstP.remove();

  const lastP = wrapper.querySelector('p:last-child');
  const lastImg = lastP && lastP.querySelector('img');
  if (lastImg && lastP.textContent.trim() === '') lastP.remove();
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
  decorateButtons(main);
  classifySections(main);
  buildTestimonialCards(main);
  buildGuaranteeBackground(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  loadHeader(doc.querySelector('header'));

  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
