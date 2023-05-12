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
  const updatedCard = document.createElement('div');

  const newUserNotFounded = newUser.login; // undefined ||
  console.log(newUser.login);
  if (!newUserNotFounded) {
    NotAnUserError.show();
    return;
  }
  NotAnUserError.hide();

  updatedCard.id = 'card';

  updatedCard.innerHTML = `
      <div class="container">
        <img
          src="./public/logo.svg"
          alt="Rocketseat Logo"
          class="rocketseat-logo"
        />
        <label>
          <input
            class="username"
            oninput="updateUser()"
            id="usernameInput"
            placeholder="Digite aqui o usuário"
          />
        </label>
      </div>
      <img
        src="https://github.com/birobirobiro.png"
        alt="Photo of birobirobiro"
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
      </div>

      <div class="extended-logo">
        <img src="./public/extended-logo.svg" alt="Rocketseat Logo" />
      </div>

      <div class="error-message">
        <img src="./public/alert.svg" alt="Alert Icon" class="alert" />
        User not founded
  `;

  updatedCard.querySelector('.username').setAttribute('value', newUser.login);

  updatedCard
    .querySelector('.user-image')
    .setAttribute('src', `https://github.com/${newUser.login}.png`);
  updatedCard
    .querySelector('.user-image')
    .setAttribute('alt', `Photo of ${newUser.login}`);
  updatedCard.querySelector('.followers span').textContent = newUser.following;
  updatedCard.querySelector('.following span').textContent = newUser.followers;
  updatedCard.querySelector('.repositories span').textContent =
    newUser.public_repos;
  updatedCard.querySelector('.company span').textContent =
    newUser.company || 'No found';
  updatedCard.querySelector('.location span').textContent =
    newUser.location || 'No found';

  clearCard(cardWrapper);

  cardWrapper.append(updatedCard);
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
