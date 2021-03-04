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
    //console.log(id);

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
    const butMore = document.createElement('button');
    const butEdit = document.createElement('button');
    const butDel = document.createElement('button');
    // const textMore = '';
    // const textEdit = '';
    // const textDel = '';

    // let z = document.createTextNode(textMore);
    // let a = document.createTextNode(textEdit);
    // let b = document.createTextNode(textDel);

    //document.setAttribute('src', './src/assets/menu.svg');

    // butMore.appendChild(z);
    // butEdit.appendChild(a);
    // butDel.appendChild(b);
    elt
      .querySelector('.actions')
      .appendChild(butMore)
      .setAttribute('class', 'moreBtn btn');

    elt
      .querySelector('.actions')
      .appendChild(butEdit)
      .setAttribute('class', 'editBtn btn');

    elt
      .querySelector('.actions')
      .appendChild(butDel)
      .setAttribute('class', 'delBtn btn', 'method', 'Delete');

    target.appendChild(elt);
    const modalBg = document.querySelector('.modal-bg');
    const modalClose = document.querySelector('.modal-close');
    (function modal() {
      // for the botton more
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
      //for edit botton edit JSON infon in card
      const modalNewBg = document.querySelector('.modalNew-bg');
      Array.from(document.querySelectorAll('.editBtn')).forEach(
        (btn, index) => {
          const inputs = Array.from(document.querySelectorAll('input'));
          btn.addEventListener('click', async () => {
            modalNewBg.classList.add('modal-active');
            const values = inputs.map(({ value }) => value.trim());
            document
              .querySelector('.nameEditInput')
              .setAttribute('placeholder', 'newname');
            document.querySelector('#run').setAttribute('class', 'editRun');
            const [name, shortDescription] = values;

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
                  //description,
                }),
              }
            );

            const freshHero = await response.json();
          });

          modalClose.addEventListener('click', () => {
            modalBg.classList.remove('modal-active');
          });
        }
      );

      // for delete botton & delete JSON INFO from the card
      Array.from(document.querySelectorAll('.delBtn')).forEach((btn) => {
        btn.addEventListener('click', async () => {
          modalBg.classList.add('modal-active');
          console.log({ id });

          try {
            const response = await fetch(
              `https://character-database.becode.xyz/characters/${id}`,
              {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );

            const deleteditem = await response.json();

            console.log(deleteditem);
          } catch (err) {
            console.error(`Unknown item with id: ${id}!`);
          }
        });
        modalClose.addEventListener('click', () => {
          modalBg.classList.remove('modal-active');
        });
      });
    })();
  });
})();

// new button&modal//

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

// to open load the image

function encodeImageFileAsURL() {
  let filesSelected = document.getElementById('inputFileToLoad').files;
  if (filesSelected.length > 0) {
    let fileToLoad = filesSelected[0];

    let fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
      // let srcData = fileLoadedEvent.target.result; // <--- data: base64
      //let newSrc = fileLoadedEvent.target.result.replace('data:', '').replace(/^.+,/, '')
      let newSrc = fileLoadedEvent.target.result.replace(
        /^data:image\/\w+;base64,/,
        ''
      );
      let newImage = document.createElement('img');
      newImage.src = newSrc;
      console.log(newSrc);
      //console.log(srcData)
      document.getElementById('imgTest').innerHTML = newImage.innerHTML;
      alert('Converted Base64 version is '); //+ document.getElementById("imgTest").innerHTML);
      console.log(
        'Converted Base64 version is' +
          document.getElementById('imgTest').innerHTML
      );

      // submit the data to JSON
      const inputs = Array.from(document.querySelectorAll('input'));
      document.querySelector('#run').addEventListener('click', async () => {
        const values = inputs.map(({ value }) => value.trim());
        console.log(values);
        if (values.some((value) => value === '')) {
          console.error("There's an empty input!");
          return;
        }

        //const [ description, shortDescription, name, image ] = values;
        const [name, shortDescription, image, description] = values;

        console.log(image);
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
              image: newSrc,
              description,
            }),
          }
        );
        // console.log(values)
        const freshHero = await response.json();
        console.log(freshHero);
      });
    };
    fileReader.readAsDataURL(fileToLoad);
  }
}
// to refresh the window
document.getElementById('run').addEventListener('click', () => {
  //alert("page refresh")
  setTimeout(function () {
    location.reload();
  }, 500);
});

// EDIT to refresh func //
Array.from(document.querySelectorAll('.editRun')).forEach((btn, index) => {
  const inputs = Array.from(document.querySelectorAll('input'));
  btn.addEventListener('click', () => {
    //alert("page refresh")
    let question = prompt('Are you sure?').trim().toLowerCase();
    if (question == 'yes') {
      confirm(`$Yes`);
    } else {
      alert('Try again');
      setTimeout(function () {
        location.reload();
      }, 500);
    }
  });
});
//   Array.from(document.querySelectorAll('.delBtn')).forEach(
//     (btn, index) => {
//       const inputs = Array.from(document.querySelectorAll('input'));
//       btn.addEventListener('click', () => {
//     //alert("page refresh")
//     let question= prompt("Are you sure?").trim().toLowerCase();
//     if( question == "yes") {
//         confirm (`$Yes`);
//     }
//     else{
//         alert("Try again");
//         setTimeout(function () {
//           location.reload()
//       }, 500);
//     }
//   });
//     });
