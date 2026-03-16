export default function decorate(block) {
  const rows = [...block.children];
  const imageRow = rows[0];
  const contentRow = rows[1];

  // Extract image for background positioning
  const img = imageRow?.querySelector('img');
  if (img) {
    block.prepend(img);
  }
  imageRow?.remove();

  // Mark content area
  if (contentRow) {
    contentRow.classList.add('hero-content');
  }
}
