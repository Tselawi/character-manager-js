(async function getData() {
  const tpl = document.querySelector('#charCard');
  const target = document.querySelector('#target');

  const response = await fetch(
    'https://character-database.becode.xyz/characters'
  );
  const heroes = await response.json();

  heroes.forEach(({ name, shortDescription, image }) => {
    const elt = tpl.cloneNode(true).content;

    elt.querySelector('.charName').innerText = name;
    elt.querySelector('.charShortDesc').innerText = shortDescription;
    elt
      .querySelector('.charImg')
      .setAttribute('src', 'data:image/png;base64,' + image);

    target.appendChild(elt);
  });
})();
