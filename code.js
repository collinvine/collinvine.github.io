// /-------------Switch hero image ----------/

const imageEl = document.querySelector('.landing__image');

const allSpans = document.querySelectorAll('.landing__intro > p > span')

const switchImg = function(ele) {
  const getImgId = ele.target.id;
  imageEl.src = `img/${getImgId}.jpg`;
  console.log(getImgId, getImgEl.src);
};

allSpans.forEach(el => el.addEventListener('click', switchImg));
