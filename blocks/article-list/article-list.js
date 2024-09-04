import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  const jsonLink = block.querySelector('a[href$=".json"]');
  const response = await fetch(jsonLink.href);
  const data = await response.json();
  const fragment = document.createDocumentFragment();
  const filteredData = data.data.filter((col) => col.template === 'Magazine');

  filteredData.forEach((col) => {
    const {
      image,
      title,
      description,
      path,
    } = col;
    const articleBody = document.createElement('div');
    articleBody.classList.add('article-body');

    const optimizedPicture = createOptimizedPicture(image, title, false, [{ width: '750' }]);

    const titleElement = document.createElement('h6');
    titleElement.textContent = title;

    const paragraph = document.createElement('p');
    paragraph.textContent = description;

    const linkElement = document.createElement('a');
    linkElement.href = path;

    linkElement.append(optimizedPicture, titleElement);
    articleBody.append(linkElement, paragraph);

    fragment.appendChild(articleBody);
  });

  block.appendChild(fragment);
}
