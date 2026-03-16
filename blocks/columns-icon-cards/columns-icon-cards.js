export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-icon-cards-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      col.classList.add('columns-icon-cards-col');
    });
  });
}
