const postsList = document.querySelector('.charList');
const addNewChar = document.querySelector('.newCharForm');
const nameValue = document.querySelector('#charName');
const shortDescValue = document.querySelector('#charShortDesc');
const descrValue = document.querySelector('#descr');
let output = '';

const getChar = (chars) => {
  chars.forEach((char) => {
    output += `
  <div class="card col-md-6">
    <div class="card-body">
      <h5 class="card-title charName">${char.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted shortDescr">${char.shortDescription}</h6>
      <p class="card-text descr">
        ${char.description}
      </p>
      <a href="#" class="card-link" id="moreBtn">More</a>
      <a href="#" class="card-link" id="editBtn" >Edit</a>
      <a href="#" class="card-link" id="delBtn">Delete</a>
    </div>
  </div>
  
  
  `;
  });
  postsList.innerHTML = output;
};

const url = 'https://character-database.becode.xyz/characters';

// Get post - method: get

fetch(url)
  .then((res) => res.json())
  .then((data) => getChar(data));

postsList.addEventListener('click', (a) => {
  a.preventDefault();

  let delBtnIsPress = a.target.id == 'delBtn';
  let editBtnIsPress = a.target.id == 'editBtn';
  let moreBtnIsPress = a.target.id == 'moreBtn';

  console.log(a.target.parentElement.parentElement);
  // Delete char  - method: delete
  if (delBtnIsPress) {
    fetch(`${url}`);
  }
});

// Add new char  - method: post

addNewChar.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log(nameValue.value);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameValue.value,
      shortDescription: shortDescValue.value,
      description: descrValue.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      getChar(dataArr);
    });
});
