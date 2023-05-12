import { GitHubUser } from './GitHubUser.js';

let delay;
const cardWrapper = document.querySelector('#card-wrapper');

window.updateUser = () => {
  const usernameInput = document.querySelector('#usernameInput');
  const username = usernameInput.value;

  clearTimeout(delay);

  delay = setTimeout(async () => {
    const newUser = await GitHubUser(username);

    updateCard(newUser);
  }, 1500);
};

function updateCard(newUser) {
  const newCard = document.createElement('div');

  if (!newCard.login) {
    NotAnUserError.show();
    return;
  }
  NotAnUserError.hide();

  newCard.id = 'card';

  newCard.innerHTML = `
    <div class="container">
      <img src="./public/logo.svg" alt="Rocketseat Logo" />
      <label>
      <input class="username" placeholder="Digite aqui o usuário" oninput="updateUser()" id="usernameInput" />
      </label>
    </div>
    <img
      src=""
      alt=""
      class="user-image"
    />
    <div class="info">
      <ul>
        <li class="following">
          <img src="./public/followers.svg" alt="Followers Icon" />
          <span>X</span>
          Followers
        </li>
        <li class="followers">
          <img src="./public/followers.svg" alt="Followers Icon" />
          <span>X</span>
          Following
        </li>
        <li class="repositories">
          <img src="./public/repository.svg" alt="Repository Icon" />
          <span>X</span>
          Repositories
        </li>
        <li class="company">
          <img src="./public/company.svg" alt="Repository Icon" />
          <span>X</span>
        </li>
        <li class="location">
          <img src="./public/location.svg" alt="Repository Icon" />
          <span>X</span>
        </li>
      </ul>
  `;

  newCard.querySelector('.username').setAttribute('value', newUser.login);

  newCard
    .querySelector('.user-image')
    .setAttribute('src', `https://github.com/${newUser.login}.png`);
  newCard
    .querySelector('.user-image')
    .setAttribute('alt', `Photo of ${newUser.login}`);
  newCard.querySelector('.followers span').textContent = newUser.following;
  newCard.querySelector('.following span').textContent = newUser.followers;
  newCard.querySelector('.repositories span').textContent =
    newUser.public_repos;
  newCard.querySelector('.company span').textContent =
    newUser.company || 'No found';
  newCard.querySelector('.location span').textContent =
    newUser.location || 'No found';

  clearCard(cardWrapper);

  cardWrapper.append(newCard);
}

const NotAnUserError = {
  show() {
    cardWrapper.classList.add('error');
  },
  hide() {
    cardWrapper.classList.remove('error');
  },
};

function clearCard() {
  cardWrapper.innerHTML = '';
}
