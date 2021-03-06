const postsList = document.querySelector('.post-list');
const addPostForm = document.querySelector('.add-post-form');
const nameValue = document.getElementById('name-value');
const shortValue = document.getElementById('short-value');
const imgValue = document.getElementById('image-value');
const descValue = document.getElementById('body-value');
const btnSubmit = document.querySelector('.btn');

let outPut = '';

const renderPosts = (posts) => {
  posts.forEach((post) => {
    //console.log(post)
    outPut += `
    
                    <div class="card-id card-frame" >
                        <img class ="image-card" src="data:image/png;base64,${post.image}" data-img=${post.image}>
                        <div class="card-infos">
                            <h5 class="card-name">${post.name}</h5>
                            <p class="card-short">${post.shortDescription}</p>
                        </div>
                        <div class="btns" data-id=${post.id}>    
                            <button class="btn" id="moreBtn"></button>
                            <button class="btn" id="editBtn"></button>
                            <button class="btn" id="deleteBtn"></button>
                        </div>
                    </div>
                
      
        
        `;
  });
  postsList.innerHTML = outPut;
};
const url = 'https://character-database.becode.xyz/characters';

// Get read the posts
// Method:Get
fetch(url)
  .then((response) => response.json())
  .then((data) => renderPosts(data));

postsList.addEventListener('click', (event) => {
  // event.preventDefault();
  //console.log(event.target.id)
  let delBtnPressed = event.target.id == 'deleteBtn';
  let editBtnPressed = event.target.id == 'editBtn';
  let moteBtnPressed = event.target.id == 'moreBtn';

  let idData = event.target.parentElement.dataset.id;
  //Delete - remove existing post
  // method: DELETE
  if (delBtnPressed) {
    console.log('idData');
    fetch(`${url}/${idData}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => location.reload()); //refresh the window
  }

  //Edit - change existing post
  // method: GET
  if (editBtnPressed) {
    //console.log('edit post')
    const cardData = event.target.parentElement;
    let nameContent = cardData.querySelector('.card-name').textContent;
    let shortContent = cardData.querySelector('.card-short').textContent;
    //let imageContent = cardData.querySelector(".image-card").textContent;
    //console.log(nameContent)
    //console.log(shortContent)
    //console.log(imageContent)
    nameValue.value = nameContent;
    shortValue.value = shortContent;
    //imgValue.value = shortContent

    // update - update the existing post
    //method: PATCH
    btnSubmit.addEventListener('click', () => {
      // console.log('post update!')
      //event.preventDefault(); //to not repeat the submit
      fetch(`${url}/${idData}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameValue.value,
          shortDescription: shortValue.value,
          //image:imgValue.value,
        }),
      })
        .then((response) => response.json())
        .then(() => location.reload());
    });
  }

  //Details - Show existing post
  // method: GET

  if (moteBtnPressed) {
    //console.log('more post')
    const cardData = event.target.parentElement;
    let nameContent = cardData.querySelector('.card-name').textContent;
    let shortContent = cardData.querySelector('.card-short').textContent;
    let imageContent = cardData.querySelector('.image-card').textContent;
    console.log(nameContent);
    console.log(shortContent);
    console.log(imageContent);
    nameValue.value = nameContent;
    shortValue.value = shortContent;
    imgValue.value = imageContent;
  }
});

// create - insert new post
// method: POST
addPostForm.addEventListener('submit', () => {
  e.preventDefault();
  //console.log(nameValue.value);
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameValue.value,
      shortDescription: shortValue.value,
      image: imgValue.value,
      description: descValue.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderPosts(dataArr);
    });

  // reset input field to empty after submit

  nameValue.value = '';
  shortValue.value = '';
  //image:imgValue.value= "";
  descValue.value = '';
});
