const content = document.querySelector('.container');

function generateRandomValues() {
  const animationDuration = Math.random() * 5;
  const size = Math.random() * 3;
  const x = Math.random() * (innerWidth - size);
  const y = Math.random() * (innerHeight - size);
  
  return { animationDuration, size, x, y };
}

function createStar() {
  const star = document.createElement('span');
  const { animationDuration, size, x, y } = generateRandomValues();
  
  star.setAttribute('class', 'star');
  star.style.top = `${y}px`;
  star.style.left = `${x}px`;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.animationDuration = `${animationDuration}s`;
  
  return star;
}

function insertStarsInToContent() {
  let star;
  
  const count = 200;
  let i = 0;
  
  while(i < count) {
    star = createStar();
    content.appendChild(star);
    i++
  }
}

insertStarsInToContent();
