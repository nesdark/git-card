export function GitHubUser(user) {
  const endpoint = `https://api.github.com/users/${user}`;

  return fetch(endpoint)
    .then((response) => response.json())
    .then(
      ({ login, followers, following, public_repos, company, location }) => ({
        login,
        followers,
        following,
        public_repos,
        company,
        location,
      })
    );
}
