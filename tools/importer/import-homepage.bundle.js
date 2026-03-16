var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero.js
  function parse(element, { document }) {
    const bgImg = element.querySelector(".bg-hero-panel img, .hero-panel-image img, .bg-art img");
    const heading = element.querySelector('h2[class*="heading-xxl"], h1[class*="heading"], .content-panel-text h2, .content-panel-text h1');
    const eyebrowEl = element.querySelector('[class*="eyebrow-lg"], [class*="eyebrow-xxl"], [class*="eyebrow-xxxl"]');
    const bodyText = element.querySelector(".content-panel-text .type-base.wysiwyg-editor, .content-panel-text .type-base");
    const legalText = element.querySelector(".content-panel-text .type-legal-wysiwyg-editor, .content-panel-text .type-legal");
    const ctaLinks = Array.from(element.querySelectorAll(".cta-container a.btn-primary, .cta-container a.btn-secondary"));
    const cells = [];
    if (bgImg) {
      cells.push([bgImg]);
    }
    const contentCell = [];
    if (eyebrowEl) {
      const eyebrowText = eyebrowEl.textContent.trim();
      if (eyebrowText) {
        const em = document.createElement("em");
        em.textContent = eyebrowText;
        contentCell.push(em);
      }
    }
    if (heading) contentCell.push(heading);
    if (bodyText) contentCell.push(bodyText);
    if (legalText) contentCell.push(legalText);
    contentCell.push(...ctaLinks);
    cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-dark.js
  function parse2(element, { document }) {
    const bgImg = element.querySelector(".bg-hero-panel img, .hero-panel-image img, .bg-art img");
    const heading = element.querySelector('h2[class*="heading-xxl"], h1[class*="heading"], .content-panel-text h2');
    const eyebrowEl = element.querySelector('[class*="eyebrow-xxxl"], [class*="eyebrow-xxl"], [class*="eyebrow-lg"]');
    const bodyText = element.querySelector(".content-panel-text .type-base.wysiwyg-editor, .content-panel-text .type-base");
    const legalText = element.querySelector(".content-panel-text .type-legal-wysiwyg-editor");
    const ctaLinks = Array.from(element.querySelectorAll(".cta-container a.btn-primary, .cta-container a.btn-secondary"));
    const cells = [];
    if (bgImg) {
      cells.push([bgImg]);
    }
    const contentCell = [];
    if (eyebrowEl) {
      const eyebrowText = eyebrowEl.textContent.trim();
      if (eyebrowText) {
        const em = document.createElement("em");
        em.textContent = eyebrowText;
        contentCell.push(em);
      }
    }
    if (heading) contentCell.push(heading);
    if (bodyText) contentCell.push(bodyText);
    if (legalText) contentCell.push(legalText);
    contentCell.push(...ctaLinks);
    cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-dark", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-product.js
  function parse3(element, { document }) {
    const cards = Array.from(element.querySelectorAll(".tile-card"));
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".card-img img, .card-content img");
      const heading = card.querySelector('h3[class*="heading"], .js-heading-section');
      const eyebrow = card.querySelector('.eyebrow-text, [class*="type-eyebrow"]');
      const description = card.querySelector(".tileSubheading, .tileSubheading p");
      const cta = card.querySelector(".cta-container a, a.tile-anchor");
      const textCell = [];
      if (eyebrow && eyebrow.textContent.trim()) {
        const em = document.createElement("em");
        em.textContent = eyebrow.textContent.trim();
        textCell.push(em);
      }
      if (heading) textCell.push(heading);
      if (description) textCell.push(description);
      if (cta) textCell.push(cta);
      cells.push([img || "", textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-promo.js
  function parse4(element, { document }) {
    const cards = Array.from(element.querySelectorAll(".card-wrapper"));
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".flex-card > img, .card img:first-of-type");
      const eyebrow = card.querySelector('[class*="eyebrow"]');
      const heading = card.querySelector('h3[class*="heading"], h2[class*="heading"]');
      const description = card.querySelector(".type-base p, .type-base");
      const legal = card.querySelector(".type-legal p, .type-legal");
      const cta = card.querySelector(".flexCardItemCta a, .cta-container a");
      const textCell = [];
      if (eyebrow && eyebrow.textContent.trim()) {
        const em = document.createElement("em");
        em.textContent = eyebrow.textContent.trim();
        textCell.push(em);
      }
      if (heading) textCell.push(heading);
      if (description) textCell.push(description);
      if (legal) textCell.push(legal);
      if (cta) textCell.push(cta);
      cells.push([img || "", textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-industry.js
  function parse5(element, { document }) {
    const slides = Array.from(element.querySelectorAll(".swiper-slide"));
    const cells = [];
    slides.forEach((slide) => {
      const img = slide.querySelector("img.swiper-image, .story-img-container img:not(.is-icon)");
      const icon = slide.querySelector("img.story-icon-img, img.is-icon");
      const heading = slide.querySelector('.heading-sm-storyStack, .heading-sm, .ss-desktop-container [class*="heading"]');
      const description = slide.querySelector(".story-description, .story-description p");
      const textCell = [];
      if (icon) textCell.push(icon);
      if (heading) textCell.push(heading);
      if (description) textCell.push(description);
      cells.push([img || "", textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-industry", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-testimonial.js
  function parse6(element, { document }) {
    const cards = Array.from(element.querySelectorAll(".tile-card"));
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".card-img img");
      const eyebrow = card.querySelector('.eyebrow-text, [class*="type-eyebrow"]');
      const heading = card.querySelector('h3[class*="heading"], .js-heading-section');
      const description = card.querySelector(".tileSubheading p, .tileSubheading");
      const legal = card.querySelector(".cardlegal, .type-legal-wysiwyg-editor");
      const cta = card.querySelector(".cta-container a, a.tile-anchor");
      const textCell = [];
      if (eyebrow && eyebrow.textContent.trim()) {
        const em = document.createElement("em");
        em.textContent = eyebrow.textContent.trim();
        textCell.push(em);
      }
      if (heading) textCell.push(heading);
      if (description) textCell.push(description);
      if (legal) textCell.push(legal);
      if (cta) textCell.push(cta);
      cells.push([img || "", textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-icon-cards.js
  function parse7(element, { document }) {
    const items = Array.from(element.querySelectorAll(".generic-list-icon-vp"));
    const row = [];
    items.forEach((item) => {
      const icon = item.querySelector("span img, .height-xl-all img, img");
      const heading = item.querySelector('h4[class*="heading"], h3[class*="heading"], [class*="heading-md"]');
      const description = item.querySelector(".description p, .description, .type-sm p");
      const legal = item.querySelector(".type-legal p, .type-legal");
      const cta = item.querySelector("a.primary-cta, .cta-container a");
      const cellContent = [];
      if (icon) cellContent.push(icon);
      if (heading) cellContent.push(heading);
      if (description) cellContent.push(description);
      if (legal) cellContent.push(legal);
      if (cta) cellContent.push(cta);
      row.push(cellContent);
    });
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-icon-cards", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns.js
  function parse8(element, { document }) {
    const eyebrow = element.querySelector('[class*="eyebrow-xxl"], [class*="eyebrow-lg"]');
    const heading = element.querySelector('h2[class*="heading-xxl"], h2[class*="heading"]');
    const bodyText = element.querySelector(".type-base.wysiwyg-editor, .type-base");
    const legal = element.querySelector(".type-legal-wysiwyg-editor, .type-legal");
    const ctaLinks = Array.from(element.querySelectorAll(".cta-container a.btn-primary, .cta-container a.btn-secondary"));
    const img = element.querySelector(".imgOffer, .gvpImgTarget, .order-img-top img, .video-content-offer img");
    const textCell = [];
    if (eyebrow && eyebrow.textContent.trim()) {
      const em = document.createElement("em");
      em.textContent = eyebrow.textContent.trim();
      textCell.push(em);
    }
    if (heading) textCell.push(heading);
    if (bodyText) textCell.push(bodyText);
    if (legal) textCell.push(legal);
    textCell.push(...ctaLinks);
    const imgCell = img ? [img] : [""];
    const cells = [[textCell, imgCell]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-link-list.js
  function parse9(element, { document }) {
    const columnEls = Array.from(element.querySelectorAll(".desktop-view-and-tablet .accordion-item, .desktop-view-and-tablet .grid-col-3"));
    const row = [];
    columnEls.forEach((col) => {
      const links = Array.from(col.querySelectorAll("a"));
      if (links.length > 0) {
        const ul = document.createElement("ul");
        links.forEach((link) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = link.href;
          a.textContent = link.textContent.trim();
          li.append(a);
          ul.append(li);
        });
        row.push([ul]);
      }
    });
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-link-list", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/form.js
  function parse10(element, { document }) {
    const fields = Array.from(element.querySelectorAll(".field-div"));
    const cells = [];
    fields.forEach((field) => {
      const label = field.querySelector("label");
      const input = field.querySelector("input, textarea, select");
      if (label && input) {
        const fieldType = input.tagName.toLowerCase() === "textarea" ? "textarea" : input.tagName.toLowerCase() === "select" ? "select" : input.type || "text";
        const fieldName = input.id || input.name || "";
        const p = document.createElement("p");
        p.textContent = `${label.textContent.trim()} (${fieldType}: ${fieldName})`;
        cells.push([p]);
      }
    });
    const submitBtn = element.querySelector(".submit-button-container input, .submit-button-container button");
    if (submitBtn) {
      const p = document.createElement("p");
      p.textContent = "Submit";
      cells.push([p]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "form", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/att-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".cookie-disclaimer-component",
        ".att-modal-container",
        ".modal-popup-container",
        ".video-modal-target"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".global-navigation",
        ".modal-global-navigation",
        ".footer-page-css-includes",
        ".footer.aem-GridColumn",
        "#nuanMessagingFrame",
        "#gpc-banner-container",
        ".cloudservice",
        "#batBeacon225294028050",
        "#db_lr_pixel_ad",
        "#db-sync",
        "#inqTestDiv",
        "#inqDivResizeCorner",
        "#inqResizeBox",
        "#inqTitleBar",
        "#injectTargetScreenReader",
        "iframe",
        "link",
        "noscript"
      ]);
      element.querySelectorAll("[data-track]").forEach((el) => el.removeAttribute("data-track"));
      element.querySelectorAll("[onclick]").forEach((el) => el.removeAttribute("onclick"));
    }
  }

  // tools/importer/transformers/att-sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      const { document } = payload;
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      reversedSections.forEach((section) => {
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) return;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (section.id !== sections[0].id) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero": parse,
    "hero-dark": parse2,
    "cards-product": parse3,
    "cards-promo": parse4,
    "cards-industry": parse5,
    "cards-testimonial": parse6,
    "columns-icon-cards": parse7,
    "columns": parse8,
    "columns-link-list": parse9,
    "form": parse10
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "AT&T Business homepage - main landing page with promotional content, product categories, and business solutions",
    urls: [
      "https://www.business.att.com/"
    ],
    blocks: [
      {
        name: "hero",
        instances: ["div.hero.aem-GridColumn:nth-of-type(1)"]
      },
      {
        name: "hero-dark",
        instances: ["div.hero.aem-GridColumn:nth-of-type(2)", "div.hero.aem-GridColumn:nth-of-type(3)"]
      },
      {
        name: "cards-product",
        instances: ["div.multi-tile-cards.aem-GridColumn:nth-of-type(1)"]
      },
      {
        name: "cards-promo",
        instances: ["div.flex-cards.aem-GridColumn"]
      },
      {
        name: "cards-industry",
        instances: ["div.story-stack.aem-GridColumn"]
      },
      {
        name: "cards-testimonial",
        instances: ["div.multi-tile-cards.aem-GridColumn:nth-of-type(2)"]
      },
      {
        name: "columns-icon-cards",
        instances: ["div.generic-list-value-prop.aem-GridColumn"]
      },
      {
        name: "columns",
        instances: ["div.offer.aem-GridColumn:nth-of-type(1)", "div.offer.aem-GridColumn:nth-of-type(2)"]
      },
      {
        name: "columns-link-list",
        instances: ["div.link-farm.aem-GridColumn"]
      },
      {
        name: "form",
        instances: ["div.rai-form.aem-GridColumn"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Section",
        selector: "div.hero.aem-GridColumn:nth-of-type(1)",
        style: null,
        blocks: ["hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Product Categories Cards",
        selector: "div.multi-tile-cards.aem-GridColumn:nth-of-type(1)",
        style: null,
        blocks: ["cards-product"],
        defaultContent: ["h2", "p"]
      },
      {
        id: "section-3",
        name: "Promotional Flex Cards",
        selector: "div.flex-cards.aem-GridColumn",
        style: null,
        blocks: ["cards-promo"],
        defaultContent: ["h1"]
      },
      {
        id: "section-4",
        name: "Value Propositions",
        selector: "div.generic-list-value-prop.aem-GridColumn",
        style: null,
        blocks: ["columns-icon-cards"],
        defaultContent: ["h2", "p"]
      },
      {
        id: "section-5",
        name: "Customer Satisfaction Offer",
        selector: "div.offer.aem-GridColumn:nth-of-type(1)",
        style: "grey",
        blocks: ["columns"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Dynamic Defense Hero",
        selector: "div.hero.aem-GridColumn:nth-of-type(2)",
        style: "dark",
        blocks: ["hero-dark"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "30-Day Trial Micro Banner",
        selector: "div.micro-banner.aem-GridColumn",
        style: "accent",
        blocks: [],
        defaultContent: ["p.bold-heading", "p.body-text", "p.legal-text"]
      },
      {
        id: "section-8",
        name: "Switch to AT&T Offer",
        selector: "div.offer.aem-GridColumn:nth-of-type(2)",
        style: null,
        blocks: ["columns"],
        defaultContent: []
      },
      {
        id: "section-9",
        name: "Solutions by Industry",
        selector: "div.story-stack.aem-GridColumn",
        style: null,
        blocks: ["cards-industry"],
        defaultContent: ["h2", "p"]
      },
      {
        id: "section-10",
        name: "AT&T Guarantee Hero",
        selector: "div.hero.aem-GridColumn:nth-of-type(3)",
        style: null,
        blocks: ["hero-dark"],
        defaultContent: []
      },
      {
        id: "section-11",
        name: "Customer Stories Cards",
        selector: "div.multi-tile-cards.aem-GridColumn:nth-of-type(2)",
        style: null,
        blocks: ["cards-testimonial"],
        defaultContent: ["h2", "p"]
      },
      {
        id: "section-12",
        name: "Sales Contact Form",
        selector: "div.rai-form.aem-GridColumn",
        style: "grey",
        blocks: ["form"],
        defaultContent: ["h2", "p", "p.legal-text"]
      },
      {
        id: "section-13",
        name: "Link Farm",
        selector: "div.link-farm.aem-GridColumn",
        style: "grey",
        blocks: ["columns-link-list"],
        defaultContent: ["h2"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
