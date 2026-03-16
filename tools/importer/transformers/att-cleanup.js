/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: AT&T Business cleanup.
 * Selectors extracted from captured DOM of https://www.business.att.com/
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie consent banner (captured DOM: div.cookie-disclaimer-component)
    // Modal containers (captured DOM: div.att-modal-container, div.modal-popup-container)
    // Video modals (captured DOM: div.video-modal-target)
    WebImporter.DOMUtils.remove(element, [
      '.cookie-disclaimer-component',
      '.att-modal-container',
      '.modal-popup-container',
      '.video-modal-target',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Global navigation header (captured DOM: div.global-navigation)
    // Mobile nav modal (captured DOM: div.modal-global-navigation)
    // Footer experience fragment (captured DOM: div.footer-page-css-includes, div.footer.aem-GridColumn)
    // Chat widget (captured DOM: #nuanMessagingFrame and related divs)
    // Privacy banner (captured DOM: #gpc-banner-container)
    // Tracking/analytics (captured DOM: .cloudservice, #batBeacon225294028050, #db_lr_pixel_ad, #db-sync)
    // Chat-related elements (captured DOM: #inqTestDiv, #inqDivResizeCorner, #inqResizeBox, #inqTitleBar, #injectTargetScreenReader)
    WebImporter.DOMUtils.remove(element, [
      '.global-navigation',
      '.modal-global-navigation',
      '.footer-page-css-includes',
      '.footer.aem-GridColumn',
      '#nuanMessagingFrame',
      '#gpc-banner-container',
      '.cloudservice',
      '#batBeacon225294028050',
      '#db_lr_pixel_ad',
      '#db-sync',
      '#inqTestDiv',
      '#inqDivResizeCorner',
      '#inqResizeBox',
      '#inqTitleBar',
      '#injectTargetScreenReader',
      'iframe',
      'link',
      'noscript',
    ]);

    // Remove tracking attributes from all elements
    element.querySelectorAll('[data-track]').forEach((el) => el.removeAttribute('data-track'));
    element.querySelectorAll('[onclick]').forEach((el) => el.removeAttribute('onclick'));
  }
}
