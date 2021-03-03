// Create list from JSON and make grid //
(async function getData() {
  const tpl = document.querySelector('#charCard');
  const target = document.querySelector('#target');

  const response = await fetch(
    'https://character-database.becode.xyz/characters'
  );
  const heroes = await response.json();

  heroes.forEach(({ name, shortDescription, image, id }) => {
    const elt = tpl.cloneNode(true).content;
    console.log(id);

    elt.querySelector('.charName').innerText = name;

    elt.querySelector('.charShortDesc').innerText = shortDescription;

    if (image === undefined) {
      elt
        .querySelector('.charImg')
        .setAttribute('src', '/src/assets/1024px-No_image_available.svg.png');
    } else {
      elt
        .querySelector('.charImg')
        .setAttribute('src', 'data:image/png;base64,' + image);
    }
    const but = document.createElement('button');
    const text = 'more';
    z = document.createTextNode(text);
    but.appendChild(z);

    elt
      .querySelector('.actions')
      .appendChild(but)
      .setAttribute('class', 'moreBtn btn');

    // elt
    //   .querySelector('.actions')
    //   .appendChild(but)
    //   .setAttribute('class', 'editBtn btn');

    // elt
    //   .querySelector('.actions')
    //   .appendChild(but)
    //   .setAttribute('class', 'delBtn btn');

    target.appendChild(elt);
    (function modal() {
      const modalBg = document.querySelector('.modal-bg');
      const modalClose = document.querySelector('.modal-close');

      Array.from(document.querySelectorAll('.moreBtn')).forEach(
        (btn, index) => {
          btn.addEventListener('click', function () {
            modalBg.classList.add('modal-active');
          });
          modalClose.addEventListener('click', function () {
            modalBg.classList.remove('modal-active');
          });
        }
      );
    })();
  });
})();

(function modalNew() {
  const modalNewBg = document.querySelector('.modalNew-bg');
  const modalNewClose = document.querySelector('.modalNew-close');

  document.querySelector('.newBtn').addEventListener('click', function () {
    modalNewBg.classList.add('modal-active');
  });
  modalNewClose.addEventListener('click', () => {
    modalNewBg.classList.remove('modal-active');
  });
})();

// // to open load the image

// const fileSelector = document.getElementById('file-selector');
// fileSelector.addEventListener('change', (event) => {
//   const fileList = event.target.files;
//   console.log(fileList);
// });

// submit the data to JSON
const inputs = Array.from(document.querySelectorAll('input'));
document.querySelector('#run').addEventListener('click', async () => {
  const values = inputs.map(({ value }) => value.trim());
  // console.log(values)
  // if (values.some((value) => value === '')) {
  //   console.error("There's an empty input!");
  //   return;
  // }

  //const [ description, shortDescription, name, image ] = values;
  const [name, shortDescription, image, description] = values;
  console.log(values);
  const response = await fetch(
    `https://character-database.becode.xyz/characters`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        shortDescription,
        //  image,
        description,
      }),
    }
  );
  // console.log(values)
  const freshHero = await response.json();
  console.log(freshHero);
});
