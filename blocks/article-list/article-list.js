export default async function decorate(block) {
  const jsonLink = block.querySelector('a[href$=".json"]');
  const response = await fetch(jsonLink.href);
  const data = await response.json();
  const fragment = document.createDocumentFragment();

  data.data.forEach(({
    image,
    title,
    description,
    link,
  }) => {
    const articleBody = document.createElement('div');
    articleBody.classList.add('article-body');

    const img = document.createElement('img');
    img.src = image;

    const titleElement = document.createElement('h6');
    titleElement.textContent = title;

    const paragraph = document.createElement('p');
    paragraph.textContent = description;

    const linkElement = document.createElement('a');
    linkElement.href = link;

    linkElement.append(img, titleElement);
    articleBody.append(linkElement, paragraph);

    fragment.appendChild(articleBody);
  });

  block.appendChild(fragment);
}
