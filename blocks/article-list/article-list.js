import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  const jsonLink = block.querySelector('a[href$=".json"]');
  const response = await fetch(jsonLink.href);
  const data = await response.json();

  const filteredData = data.data.filter((col) => col.template === 'Magazine');
  let articleBodyHTML = '';

  filteredData.forEach((col) => {
    const {
      image,
      title,
      description,
      path,
    } = col;
    const optimizedPicture = createOptimizedPicture(image, title, false, [{ width: '750' }]);

    articleBodyHTML += `
      <div class="article-body">
        <a href="${path}">
          ${optimizedPicture.outerHTML}
          <h6>${title}</h6>
        </a>
        <p>${description}</p>
      </div>
    `;
  });

  block.innerHTML = articleBodyHTML;
}
