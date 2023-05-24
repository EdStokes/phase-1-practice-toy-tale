let addToy = false;

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

const toysAPI = 'http://localhost:3000/toys';
const toyCollectionElement = document.getElementById('toy-collection');
const addToyForm = document.getElementById('add-toy-form');

addToyForm.addEventListener('submit', addNewToy);

fetch(toysAPI)
  .then(res => res.json())
  .then(renderToys);

function renderToys(toys) {
  toys.forEach(renderToy)
}

function renderToy(toy) {
  const toyCard = document.createElement('div');
  toyCard.classList.add('card');

  toyCard.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} Likes</p>
  `

  const likeButton = document.createElement('button')
  likeButton.id = toy.id;
  likeButton.textContent = `Like ❤️`;
  likeButton.addEventListener('click', () => {
    fetch(`${toysAPI}/${toy.id}`, {
      method: 'PATCH',
      headers,
      body
    })
  })
  toyCard.append(likeButton);

  toyCollectionElement.append(toyCard);
}

function addNewToy(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const image = event.target.image.value;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  const body =  JSON.stringify({
   name, image, likes: 0,
  });

  fetch(toysAPI, {
    method: "POST",
    headers,
    body,
  }).then(res => res.json())
    .then(renderToy)


}

