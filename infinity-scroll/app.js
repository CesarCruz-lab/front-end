// http://jsonplaceholder.typicode.com/posts?_limit=5&_page=1

const postsContainer = document.querySelector('.posts');
const loader = document.querySelector('.loader');

let page = 1;

// Realizando a requisição
let getPosts = async () => {
  const response = await
  fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`).catch(/* pass */);
  return response;
}

// rebeber o objeto de resposta como JSON
const redeemResponseData = async (obj) => {
  const response = await obj;
  const status = response.status == 200;
  
  if (status) { return response.json(); }
  
  return false;
}

const generateTemplateForPost = posts =>
  posts.map(({ id, title, body }) => { return `
    <div class="post">
      <span class="number">${id}</span>
      <div class="post-info">
        <h2 class="post-title">${title}</h2>
        <p class="post-body">${body}</p>
      </div>
    </div>
  ` }).join('');

const addPostsInToDOM = async () => {
  const posts = await redeemResponseData(getPosts());

  if (posts) {
    const template = generateTemplateForPost(posts);
    postsContainer.innerHTML += template;
  }
}

addPostsInToDOM();

// scroll da página

const removeLoader = () => {
  setTimeout(() => {
    loader.classList.remove('show');
  }, 600);
}

const showLoader = () => {
  loader.classList.add('show');
}

const addNewPostsInEndPage = async () => {
  // loader enquanto a operação não é concluida
  showLoader();
  page++;
  
  // Requisitar os dados e dispor em formato legível
  const newPosts = await redeemResponseData(getPosts());
  
  // gerar template com os posts formatados
  const templateForNewPosts = generateTemplateForPost(newPosts);
  
  // loader fora da tela
  removeLoader();
  
  // setTimeout server para sincronizar a adição de posts com o fim da animação de loader
  setTimeout(() => {
    if (newPosts) {
      postsContainer.innerHTML += templateForNewPosts;
    }
  }, 900);
}

const handleScrollToPageBottom = () => {
  // Um pouco sobre scroll neste link https://www.w3schools.com/jsref/event_onscroll.asp
  const { scrollTop, scrollHeight, clientHeight } =
    document.documentElement;
  
  const endPage = scrollTop + clientHeight >=
    scrollHeight - 5;
  
  // Chamada da função quando o scroll estiver no fim
  if (endPage) {
    addNewPostsInEndPage();
  }
}

// Chamada da função quando a tela for deslisada
window.addEventListener('scroll', handleScrollToPageBottom);
