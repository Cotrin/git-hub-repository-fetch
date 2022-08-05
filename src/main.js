import './styles.scss'
// import * as bootstrap from 'bootstrap'

async function onGithubUserSearchClick(event) {
  // previne a funcao default de formulario html
  event.preventDefault()

  // pega o input
  const input = document.querySelector('#gitHubUser')

  // busca os repositorios
  const gitHubUserRepositories = await fetchGitHubUserRepositories(input.value)

  // carrega os repositorios na tela
  renderItems(gitHubUserRepositories)
}

// API do GitHub
// URL = https://api.github.com/users/${user}/repos
async function fetchGitHubUserRepositories(githubUser) {
  const repositories = await fetch(
    `https://api.github.com/users/${githubUser}/repos`
  ).then(res => res.json())

  return repositories
}

function renderItems(gitHubUserRepositories) {
  // seleciona elemento <ul>
  const ul = document.querySelector('#gitHubUserList')

  //forEach
  //   for (let i = 0; i < gitHubUserRepositories.length; i++) {
  //     const repo = gitHubUserRepositories[i];
  //   }

  gitHubUserRepositories.forEach(repo => {
    // cria elemento <li>
    const li = document.createElement('li')
    li.classList.add(['list-group-item'])

    // adiciona conteudo ao <li>
    li.innerHTML = repo.name

    // adiciona <li> ao <ul>
    ul.appendChild(li)
  })
}

const button = document.querySelector('#repoSearch')

button.addEventListener('click', onGithubUserSearchClick)
