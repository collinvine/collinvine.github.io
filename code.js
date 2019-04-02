// /-------------Switch hero image ----------/

const getDiv = document.querySelector('.landing__image');

const allSpans = document.querySelectorAll('.landing__intro > p > span')

const switchImg = function(ele) {
  const getImg = ele.target.id;
  getDiv.style.backgroundImage = `url(img/${getImg}.jpg)`;
};

allSpans.forEach(el => el.addEventListener('click', switchImg));
