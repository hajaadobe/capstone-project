import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cardContent = document.createDocumentFragment();

  [...block.children].forEach((row) => {
    const card = document.createElement('div');
    card.className = 'writer-card';

    while (row.firstChild) card.append(row.firstChild);

    [...card.children].forEach((child) => {
      if (child.querySelector('picture')) {
        child.className = 'writer-card-image';
      } else {
        child.className = 'writer-card-body';

        const socialBlock = child.querySelector('p');
        if (socialBlock) {
          socialBlock.classList.add('social-links');

          socialBlock.querySelectorAll('a').forEach((link) => {
            const socialIcons = document.createElement('img');
            const linkTitle = link.getAttribute('title');
            socialIcons.src = `/icons/${linkTitle.toLowerCase().replace(/\s+/g, '-')}.svg`;
            socialIcons.alt = linkTitle;
            link.appendChild(socialIcons);
          });
        }
      }
    });

    card.querySelectorAll('picture > img').forEach((img) => {
      const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      img.closest('picture').replaceWith(optimizedPicture);
    });

    cardContent.append(card);
  });

  block.textContent = '';
  block.append(cardContent);
}
