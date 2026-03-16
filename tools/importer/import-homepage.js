/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroParser from './parsers/hero.js';
import heroDarkParser from './parsers/hero-dark.js';
import cardsProductParser from './parsers/cards-product.js';
import cardsPromoParser from './parsers/cards-promo.js';
import cardsIndustryParser from './parsers/cards-industry.js';
import cardsTestimonialParser from './parsers/cards-testimonial.js';
import columnsIconCardsParser from './parsers/columns-icon-cards.js';
import columnsParser from './parsers/columns.js';
import columnsLinkListParser from './parsers/columns-link-list.js';
import formParser from './parsers/form.js';

// TRANSFORMER IMPORTS
import attCleanupTransformer from './transformers/att-cleanup.js';
import attSectionsTransformer from './transformers/att-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero': heroParser,
  'hero-dark': heroDarkParser,
  'cards-product': cardsProductParser,
  'cards-promo': cardsPromoParser,
  'cards-industry': cardsIndustryParser,
  'cards-testimonial': cardsTestimonialParser,
  'columns-icon-cards': columnsIconCardsParser,
  'columns': columnsParser,
  'columns-link-list': columnsLinkListParser,
  'form': formParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'AT&T Business homepage - main landing page with promotional content, product categories, and business solutions',
  urls: [
    'https://www.business.att.com/'
  ],
  blocks: [
    {
      name: 'hero',
      instances: ['div.hero.aem-GridColumn:nth-of-type(1)']
    },
    {
      name: 'hero-dark',
      instances: ['div.hero.aem-GridColumn:nth-of-type(2)', 'div.hero.aem-GridColumn:nth-of-type(3)']
    },
    {
      name: 'cards-product',
      instances: ['div.multi-tile-cards.aem-GridColumn:nth-of-type(1)']
    },
    {
      name: 'cards-promo',
      instances: ['div.flex-cards.aem-GridColumn']
    },
    {
      name: 'cards-industry',
      instances: ['div.story-stack.aem-GridColumn']
    },
    {
      name: 'cards-testimonial',
      instances: ['div.multi-tile-cards.aem-GridColumn:nth-of-type(2)']
    },
    {
      name: 'columns-icon-cards',
      instances: ['div.generic-list-value-prop.aem-GridColumn']
    },
    {
      name: 'columns',
      instances: ['div.offer.aem-GridColumn:nth-of-type(1)', 'div.offer.aem-GridColumn:nth-of-type(2)']
    },
    {
      name: 'columns-link-list',
      instances: ['div.link-farm.aem-GridColumn']
    },
    {
      name: 'form',
      instances: ['div.rai-form.aem-GridColumn']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Section',
      selector: 'div.hero.aem-GridColumn:nth-of-type(1)',
      style: null,
      blocks: ['hero'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Product Categories Cards',
      selector: 'div.multi-tile-cards.aem-GridColumn:nth-of-type(1)',
      style: null,
      blocks: ['cards-product'],
      defaultContent: ['h2', 'p']
    },
    {
      id: 'section-3',
      name: 'Promotional Flex Cards',
      selector: 'div.flex-cards.aem-GridColumn',
      style: null,
      blocks: ['cards-promo'],
      defaultContent: ['h1']
    },
    {
      id: 'section-4',
      name: 'Value Propositions',
      selector: 'div.generic-list-value-prop.aem-GridColumn',
      style: null,
      blocks: ['columns-icon-cards'],
      defaultContent: ['h2', 'p']
    },
    {
      id: 'section-5',
      name: 'Customer Satisfaction Offer',
      selector: 'div.offer.aem-GridColumn:nth-of-type(1)',
      style: 'grey',
      blocks: ['columns'],
      defaultContent: []
    },
    {
      id: 'section-6',
      name: 'Dynamic Defense Hero',
      selector: 'div.hero.aem-GridColumn:nth-of-type(2)',
      style: 'dark',
      blocks: ['hero-dark'],
      defaultContent: []
    },
    {
      id: 'section-7',
      name: '30-Day Trial Micro Banner',
      selector: 'div.micro-banner.aem-GridColumn',
      style: 'accent',
      blocks: [],
      defaultContent: ['p.bold-heading', 'p.body-text', 'p.legal-text']
    },
    {
      id: 'section-8',
      name: 'Switch to AT&T Offer',
      selector: 'div.offer.aem-GridColumn:nth-of-type(2)',
      style: null,
      blocks: ['columns'],
      defaultContent: []
    },
    {
      id: 'section-9',
      name: 'Solutions by Industry',
      selector: 'div.story-stack.aem-GridColumn',
      style: null,
      blocks: ['cards-industry'],
      defaultContent: ['h2', 'p']
    },
    {
      id: 'section-10',
      name: 'AT&T Guarantee Hero',
      selector: 'div.hero.aem-GridColumn:nth-of-type(3)',
      style: null,
      blocks: ['hero-dark'],
      defaultContent: []
    },
    {
      id: 'section-11',
      name: 'Customer Stories Cards',
      selector: 'div.multi-tile-cards.aem-GridColumn:nth-of-type(2)',
      style: null,
      blocks: ['cards-testimonial'],
      defaultContent: ['h2', 'p']
    },
    {
      id: 'section-12',
      name: 'Sales Contact Form',
      selector: 'div.rai-form.aem-GridColumn',
      style: 'grey',
      blocks: ['form'],
      defaultContent: ['h2', 'p', 'p.legal-text']
    },
    {
      id: 'section-13',
      name: 'Link Farm',
      selector: 'div.link-farm.aem-GridColumn',
      style: 'grey',
      blocks: ['columns-link-list'],
      defaultContent: ['h2']
    }
  ]
};

// TRANSFORMER REGISTRY
const transformers = [
  attCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [attSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
